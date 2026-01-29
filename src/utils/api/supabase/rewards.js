import { supabase } from '../supabaseClient.js';
import { formatResponse, ErrorTypes } from '../apiResponseHelper.js';

/**
 * Get all reward tiers for a project
 * @param {string} projectId - Project ID
 * @returns {Promise<{data: Array, error: Object}>} List of reward tiers
 */
export const getRewardsByProject = async (projectId) => {
    // Input validation
    if (!projectId) {
        return ErrorTypes.REQUIRED_FIELD('專案 ID');
    }

    const { data, error } = await supabase
        .from('reward_tiers')
        .select(`
      *,
      package_groups:reward_package_groups(
        id,
        group_name,
        display_order,
        items:reward_package_items(id, parent_id, content, display_order)
      ),
      highlights:reward_highlights(id, emoji, content, display_order)
    `)
        .eq('project_id', projectId)
        .eq('is_available', true)
        .order('display_order', { ascending: true });

    return formatResponse(data, error);
};

/**
 * Get single reward tier by ID
 * @param {string} id - Reward tier ID
 * @returns {Promise<{data: Object, error: Object}>} Reward tier details
 */
export const getRewardById = async (id) => {
    // Input validation
    if (!id) {
        return ErrorTypes.REQUIRED_FIELD('方案 ID');
    }

    const { data, error } = await supabase
        .from('reward_tiers')
        .select('*')
        .eq('id', id)
        .single();

    if (error?.code === 'PGRST116') {
        return ErrorTypes.NOT_FOUND('方案');
    }

    return formatResponse(data, error);
};

/**
 * Create new reward tier
 * @param {Object} rewardData - Reward tier data
 * @returns {Promise<{data: Object, error: Object}>} Created reward tier
 */
export const createReward = async (rewardData) => {
    // Input validation
    if (!rewardData.project_id) {
        return ErrorTypes.REQUIRED_FIELD('專案 ID');
    }

    if (!rewardData.title) {
        return ErrorTypes.REQUIRED_FIELD('方案標題');
    }

    if (!rewardData.amount || rewardData.amount <= 0) {
        return ErrorTypes.INVALID_AMOUNT();
    }

    const { data, error } = await supabase
        .from('reward_tiers')
        .insert([rewardData])
        .select()
        .single();

    return formatResponse(data, error);
};

/**
 * Update reward tier
 * @param {string} id - Reward tier ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<{data: Object, error: Object}>} Updated reward tier
 */
export const updateReward = async (id, updates) => {
    // Input validation
    if (!id) {
        return ErrorTypes.REQUIRED_FIELD('方案 ID');
    }

    if (updates.amount !== undefined && updates.amount <= 0) {
        return ErrorTypes.INVALID_AMOUNT();
    }

    const { data, error } = await supabase
        .from('reward_tiers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error?.code === 'PGRST116') {
        return ErrorTypes.NOT_FOUND('方案');
    }

    return formatResponse(data, error);
};

/**
 * Delete reward tier
 * @param {string} id - Reward tier ID
 * @returns {Promise<{data: Object, error: Object}>} Deleted reward tier
 */
export const deleteReward = async (id) => {
    // Input validation
    if (!id) {
        return ErrorTypes.REQUIRED_FIELD('方案 ID');
    }

    const { data, error } = await supabase
        .from('reward_tiers')
        .delete()
        .eq('id', id)
        .select()
        .single();

    if (error?.code === 'PGRST116') {
        return ErrorTypes.NOT_FOUND('方案');
    }

    return formatResponse(data, error);
};

/**
 * Check if reward tier is available
 * @param {string} id - Reward tier ID
 * @returns {Promise<{data: boolean, error: Object}>} True if available
 */
export const isRewardAvailable = async (id) => {
    // Input validation
    if (!id) {
        return ErrorTypes.REQUIRED_FIELD('方案 ID');
    }

    const { data, error } = await supabase
        .from('reward_tiers')
        .select('total_quantity, claimed_quantity, is_available')
        .eq('id', id)
        .single();

    if (error?.code === 'PGRST116') {
        return ErrorTypes.NOT_FOUND('方案');
    }

    if (error) {
        return formatResponse(null, error);
    }

    if (!data.is_available) return formatResponse(false, null);
    if (data.total_quantity === null) return formatResponse(true, null); // Unlimited

    return formatResponse(data.claimed_quantity < data.total_quantity, null);
};

/**
 * Claim a reward tier (increment claimed_quantity)
 * @param {string} id - Reward tier ID
 * @returns {Promise<{data: Object, error: Object}>} Updated reward tier
 */
export const claimReward = async (id) => {
    // Input validation
    if (!id) {
        return ErrorTypes.REQUIRED_FIELD('方案 ID');
    }

    // First check availability
    const availabilityResult = await isRewardAvailable(id);
    if (availabilityResult.error) {
        return availabilityResult;
    }

    if (!availabilityResult.data) {
        return ErrorTypes.INSUFFICIENT_STOCK('方案');
    }

    const { data, error } = await supabase.rpc('increment_claimed_quantity', {
        reward_id: id
    });

    return formatResponse(data, error);
};

/**
 * Calculate discount percentage
 * @param {Object} reward - Reward tier object
 * @returns {number} Discount percentage (0-100)
 */
export const calculateDiscount = (reward) => {
    if (!reward.list_price || !reward.amount) return 0;
    if (reward.list_price <= reward.amount) return 0;

    const discount = ((reward.list_price - reward.amount) / reward.list_price) * 100;
    return Math.round(discount);
};

/**
 * Get reward tier with discount info
 * @param {string} id - Reward tier ID
 * @returns {Promise<Object>} Reward tier with discount percentage
 */
export const getRewardWithDiscount = async (id) => {
    const reward = await getRewardById(id);
    return {
        ...reward,
        discount_percentage: calculateDiscount(reward)
    };
};
