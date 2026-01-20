import { supabase } from '../supabaseClient.js';

/**
 * Get user profile
 * @param {string} userId - User ID
 * @returns {Promise<Object>} User profile
 */
export const getUserProfile = async (userId) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) throw error;
    return data;
};

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated profile
 */
export const updateUserProfile = async (userId, updates) => {
    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

    if (error) throw error;
    return data;
};

/**
 * Get projects created by user
 * @param {string} userId - User ID
 * @param {Object} filters - Filter options
 * @returns {Promise<Array>} List of projects
 */
export const getUserProjects = async (userId, filters = {}) => {
    let query = supabase
        .from('projects')
        .select(`
      *,
      category:categories(id, name, slug),
      reward_tiers(count)
    `)
        .eq('creator_id', userId)
        .is('deleted_at', null);

    if (filters.status) {
        query = query.eq('status', filters.status);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) throw error;
    return data;
};

/**
 * Get projects backed by user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} List of backed projects
 */
export const getUserBackedProjects = async (userId) => {
    const { data, error } = await supabase
        .from('orders')
        .select(`
      id,
      amount,
      status,
      created_at,
      project:projects(
        id,
        title,
        slug,
        cover_image_url,
        status,
        end_date,
        creator:profiles!creator_id(id, display_name, avatar_url)
      )
    `)
        .eq('user_id', userId)
        .eq('status', 'paid')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
};

/**
 * Get user statistics
 * @param {string} userId - User ID
 * @returns {Promise<Object>} User stats
 */
export const getUserStats = async (userId) => {
    // Count projects created
    const { count: projectsCreated, error: projectsError } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('creator_id', userId)
        .is('deleted_at', null);

    if (projectsError) throw projectsError;

    // Count projects backed
    const { count: projectsBacked, error: backedError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('status', 'paid');

    if (backedError) throw backedError;

    // Count favorites
    const { count: favoriteCount, error: favError } = await supabase
        .from('favorites')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

    if (favError) throw favError;

    // Total amount backed
    const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('amount')
        .eq('user_id', userId)
        .eq('status', 'paid');

    if (ordersError) throw ordersError;

    const totalBacked = orders.reduce((sum, order) => sum + parseFloat(order.amount), 0);

    return {
        projectsCreated: projectsCreated || 0,
        projectsBacked: projectsBacked || 0,
        favoriteCount: favoriteCount || 0,
        totalBacked: totalBacked
    };
};

/**
 * Create or update user profile (called after auth)
 * @param {Object} userData - User data from auth
 * @returns {Promise<Object>} User profile
 */
export const upsertUserProfile = async (userData) => {
    const { data, error } = await supabase
        .from('profiles')
        .upsert([{
            id: userData.id,
            email: userData.email,
            display_name: userData.user_metadata?.full_name || userData.email.split('@')[0],
            avatar_url: userData.user_metadata?.avatar_url || null
        }])
        .select()
        .single();

    if (error) throw error;
    return data;
};

/**
 * Get all categories
 * @returns {Promise<Array>} List of categories
 */
export const getCategories = async () => {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

    if (error) throw error;
    return data;
};
