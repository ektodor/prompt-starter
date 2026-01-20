import { supabase } from '../supabaseClient.js';

/**
 * Create new interaction (comment or question)
 * @param {Object} interactionData - Interaction data
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Created interaction
 */
export const createInteraction = async (interactionData, userId) => {
    const { data, error } = await supabase
        .from('interactions')
        .insert([{
            ...interactionData,
            user_id: userId
        }])
        .select(`
      *,
      user:profiles!user_id(id, display_name, avatar_url)
    `)
        .single();

    if (error) throw error;
    return data;
};

/**
 * Get all interactions for a project
 * @param {string} projectId - Project ID
 * @param {Object} filters - Filter options
 * @returns {Promise<Array>} List of interactions
 */
export const getInteractionsByProject = async (projectId, filters = {}) => {
    let query = supabase
        .from('interactions')
        .select(`
      *,
      user:profiles!user_id(id, display_name, avatar_url),
      replies:interactions!parent_id(
        *,
        user:profiles!user_id(id, display_name, avatar_url)
      )
    `)
        .eq('project_id', projectId)
        .is('deleted_at', null)
        .is('parent_id', null); // Only get top-level interactions

    if (filters.type) {
        query = query.eq('type', filters.type);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) throw error;
    return data;
};

/**
 * Get comments for a project
 * @param {string} projectId - Project ID
 * @returns {Promise<Array>} List of comments
 */
export const getComments = async (projectId) => {
    return await getInteractionsByProject(projectId, { type: 'comment' });
};

/**
 * Get Q&A for a project
 * @param {string} projectId - Project ID
 * @returns {Promise<Array>} List of questions and answers
 */
export const getQA = async (projectId) => {
    return await getInteractionsByProject(projectId, { type: 'question' });
};

/**
 * Reply to an interaction
 * @param {Object} replyData - Reply data
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Created reply
 */
export const replyToInteraction = async (replyData, userId) => {
    const { data, error } = await supabase
        .from('interactions')
        .insert([{
            ...replyData,
            user_id: userId,
            type: 'answer' // Replies are marked as answers
        }])
        .select(`
      *,
      user:profiles!user_id(id, display_name, avatar_url)
    `)
        .single();

    if (error) throw error;
    return data;
};

/**
 * Update interaction
 * @param {string} id - Interaction ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated interaction
 */
export const updateInteraction = async (id, updates) => {
    const { data, error } = await supabase
        .from('interactions')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

/**
 * Soft delete interaction
 * @param {string} id - Interaction ID
 * @returns {Promise<Object>} Deleted interaction
 */
export const deleteInteraction = async (id) => {
    const { data, error } = await supabase
        .from('interactions')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

/**
 * Get interaction count for a project
 * @param {string} projectId - Project ID
 * @param {string} type - Interaction type (optional)
 * @returns {Promise<number>} Number of interactions
 */
export const getInteractionCount = async (projectId, type = null) => {
    let query = supabase
        .from('interactions')
        .select('*', { count: 'exact', head: true })
        .eq('project_id', projectId)
        .is('deleted_at', null);

    if (type) {
        query = query.eq('type', type);
    }

    const { count, error } = await query;

    if (error) throw error;
    return count || 0;
};
