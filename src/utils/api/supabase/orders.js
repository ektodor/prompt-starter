import { supabase } from '../supabaseClient.js';
import { formatResponse, ErrorTypes } from '../apiResponseHelper.js';

/**
 * Create new order (back a project)
 * @param {Object} orderData - Order data
 * @param {string} userId - User ID
 * @returns {Promise<{data: Object, error: Object}>} Created order
 */
export const createOrder = async (orderData, userId) => {
    // Input validation
    if (!userId) {
        return ErrorTypes.UNAUTHORIZED();
    }

    if (!orderData.project_id) {
        return ErrorTypes.REQUIRED_FIELD('專案 ID');
    }

    if (!orderData.amount) {
        return ErrorTypes.REQUIRED_FIELD('訂單金額');
    }

    if (orderData.amount <= 0) {
        return ErrorTypes.INVALID_AMOUNT();
    }

    const { data, error } = await supabase
        .from('orders')
        .insert([{
            ...orderData,
            user_id: userId,
            status: 'pending'
        }])
        .select()
        .single();

    if (error) {
        return formatResponse(null, error);
    }

    // TODO: In production, integrate with payment gateway here

    return formatResponse(data, null);
};

/**
 * Get all orders for a user
 * @param {string} userId - User ID
 * @param {Object} filters - Filter options
 * @returns {Promise<{data: Array, error: Object}>} List of orders
 */
export const getOrdersByUser = async (userId, filters = {}) => {
    // Input validation
    if (!userId) {
        return ErrorTypes.REQUIRED_FIELD('使用者 ID');
    }

    let query = supabase
        .from('orders')
        .select(`
      *,
      project:projects(id, title, slug, cover_image_url, status, owner_name),
      reward_tier:reward_tiers(id, title, amount, list_price, subtitle)
    `)
        .eq('user_id', userId);

    if (filters.status) {
        query = query.eq('status', filters.status);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    return formatResponse(data, error);
};

/**
 * Get all orders for a project
 * @param {string} projectId - Project ID
 * @param {Object} filters - Filter options
 * @returns {Promise<{data: Array, error: Object}>} List of orders
 */
export const getOrdersByProject = async (projectId, filters = {}) => {
    // Input validation
    if (!projectId) {
        return ErrorTypes.REQUIRED_FIELD('專案 ID');
    }

    let query = supabase
        .from('orders')
        .select(`
      *,
      user:profiles!user_id(id, display_name, email, avatar_url),
      reward_tier:reward_tiers(id, title, amount, list_price)
    `)
        .eq('project_id', projectId);

    if (filters.status) {
        query = query.eq('status', filters.status);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    return formatResponse(data, error);
};

/**
 * Get single order by ID
 * @param {string} id - Order ID
 * @returns {Promise<{data: Object, error: Object}>} Order details
 */
export const getOrderById = async (id) => {
    // Input validation
    if (!id) {
        return ErrorTypes.REQUIRED_FIELD('訂單 ID');
    }

    const { data, error } = await supabase
        .from('orders')
        .select(`
      *,
      project:projects(id, title, slug, cover_image_url, owner_name),
      reward_tier:reward_tiers(id, title, amount, description, list_price),
      user:profiles!user_id(id, display_name, email)
    `)
        .eq('id', id)
        .single();

    // Handle not found
    if (error?.code === 'PGRST116') {
        return ErrorTypes.NOT_FOUND('訂單');
    }

    return formatResponse(data, error);
};

/**
 * Update order status
 * @param {string} id - Order ID
 * @param {string} status - New status (pending, paid, refunded, cancelled)
 * @returns {Promise<{data: Object, error: Object}>} Updated order
 */
export const updateOrderStatus = async (id, status) => {
    // Input validation
    if (!id) {
        return ErrorTypes.REQUIRED_FIELD('訂單 ID');
    }

    if (!status) {
        return ErrorTypes.REQUIRED_FIELD('訂單狀態');
    }

    const updates = { status };

    if (status === 'paid') {
        updates.paid_at = new Date().toISOString();
    }

    const { data, error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error?.code === 'PGRST116') {
        return ErrorTypes.NOT_FOUND('訂單');
    }

    if (error) {
        return formatResponse(null, error);
    }

    // If paid, update project current_amount and backers_count
    if (status === 'paid') {
        const updateResult = await updateProjectFunding(data.project_id, data.amount);
        if (updateResult.error) {
            return updateResult;
        }
    }

    return formatResponse(data, null);
};

/**
 * Update order shipping information
 * @param {string} id - Order ID
 * @param {Object} shippingInfo - Shipping details
 * @returns {Promise<{data: Object, error: Object}>} Updated order
 */
export const updateOrderShipping = async (id, shippingInfo) => {
    // Input validation
    if (!id) {
        return ErrorTypes.REQUIRED_FIELD('訂單 ID');
    }

    const { data, error } = await supabase
        .from('orders')
        .update({
            shipping_name: shippingInfo.name,
            shipping_email: shippingInfo.email,
            shipping_phone: shippingInfo.phone,
            shipping_address: shippingInfo.address
        })
        .eq('id', id)
        .select()
        .single();

    if (error?.code === 'PGRST116') {
        return ErrorTypes.NOT_FOUND('訂單');
    }

    return formatResponse(data, error);
};

/**
 * Update order note
 * @param {string} id - Order ID
 * @param {string} note - Order note/remark
 * @returns {Promise<{data: Object, error: Object}>} Updated order
 */
export const updateOrderNote = async (id, note) => {
    // Input validation
    if (!id) {
        return ErrorTypes.REQUIRED_FIELD('訂單 ID');
    }

    const { data, error } = await supabase
        .from('orders')
        .update({ note })
        .eq('id', id)
        .select()
        .single();

    if (error?.code === 'PGRST116') {
        return ErrorTypes.NOT_FOUND('訂單');
    }

    return formatResponse(data, error);
};

/**
 * Update invoice carrier
 * @param {string} id - Order ID
 * @param {string} invoiceCarrier - Invoice carrier code (e.g., /AB12345)
 * @returns {Promise<{data: Object, error: Object}>} Updated order
 */
export const updateInvoiceCarrier = async (id, invoiceCarrier) => {
    // Input validation
    if (!id) {
        return ErrorTypes.REQUIRED_FIELD('訂單 ID');
    }

    const { data, error } = await supabase
        .from('orders')
        .update({ invoice_carrier: invoiceCarrier })
        .eq('id', id)
        .select()
        .single();

    if (error?.code === 'PGRST116') {
        return ErrorTypes.NOT_FOUND('訂單');
    }

    return formatResponse(data, error);
};

/**
 * Update complete order details
 * @param {string} id - Order ID
 * @param {Object} updates - All fields to update
 * @returns {Promise<{data: Object, error: Object}>} Updated order
 */
export const updateOrderDetails = async (id, updates) => {
    // Input validation
    if (!id) {
        return ErrorTypes.REQUIRED_FIELD('訂單 ID');
    }

    const { data, error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error?.code === 'PGRST116') {
        return ErrorTypes.NOT_FOUND('訂單');
    }

    return formatResponse(data, error);
};

/**
 * Cancel order
 * @param {string} id - Order ID
 * @returns {Promise<Object>} Cancelled order
 */
export const cancelOrder = async (id) => {
    return await updateOrderStatus(id, 'cancelled');
};

/**
 * Helper: Update project funding when order is paid
 * @private
 */
const updateProjectFunding = async (projectId, amount) => {
    const { data: project, error: fetchError } = await supabase
        .from('projects')
        .select('current_amount, backers_count')
        .eq('id', projectId)
        .single();

    if (fetchError) {
        return formatResponse(null, fetchError);
    }

    const { error: updateError } = await supabase
        .from('projects')
        .update({
            current_amount: parseFloat(project.current_amount) + parseFloat(amount),
            backers_count: project.backers_count + 1
        })
        .eq('id', projectId);

    if (updateError) {
        return formatResponse(null, updateError);
    }

    return formatResponse(null, null);
};

/**
 * Get order statistics for a project
 * @param {string} projectId - Project ID
 * @returns {Promise<{data: Object, error: Object}>} Order statistics
 */
export const getOrderStats = async (projectId) => {
    // Input validation
    if (!projectId) {
        return ErrorTypes.REQUIRED_FIELD('專案 ID');
    }

    const { data, error } = await supabase
        .from('orders')
        .select('amount, status')
        .eq('project_id', projectId);

    if (error) {
        return formatResponse(null, error);
    }

    const stats = {
        totalOrders: data.length,
        paidOrders: data.filter(o => o.status === 'paid').length,
        pendingOrders: data.filter(o => o.status === 'pending').length,
        totalRevenue: data
            .filter(o => o.status === 'paid')
            .reduce((sum, o) => sum + parseFloat(o.amount), 0)
    };

    return formatResponse(stats, null);
};
