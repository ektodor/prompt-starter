import { supabase } from '../supabaseClient.js';
import { successResponse, errorResponse, handleSupabaseError, ErrorTypes } from '../apiResponseHelper.js';

/**
 * Create new interaction (comment or question)
 * @param {Object} interactionData - Interaction data
 * @param {string} userId - User ID
 * @returns {Promise<{data: Object, error: Object}>} Created interaction
 */
export const createInteraction = async (interactionData, userId) => {
    if (!userId) {
        return ErrorTypes.UNAUTHORIZED();
    }
    if (!interactionData.project_id) {
        return ErrorTypes.REQUIRED_FIELD('專案 ID');
    }
    if (!interactionData.content) {
        return ErrorTypes.REQUIRED_FIELD('內容');
    }

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

    if (error) return handleSupabaseError(error);
    return successResponse(data);
};

/**
 * Get all interactions for a project
 * @param {string} projectId - Project ID
 * @param {Object} filters - Filter options
 * @returns {Promise<{data: Array, error: Object}>} List of interactions
 */
export const getInteractionsByProject = async (projectId, filters = {}) => {
    if (!projectId) {
        return ErrorTypes.REQUIRED_FIELD('專案 ID');
    }

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

    if (error) return handleSupabaseError(error);
    return successResponse(data);
};

/**
 * Get comments for a project
 * @param {string} projectId - Project ID
 * @returns {Promise<{data: Array, error: Object}>} List of comments
 */
export const getComments = async (projectId) => {
    return await getInteractionsByProject(projectId, { type: 'comment' });
};

/**
 * Get Q&A for a project
 * @param {string} projectId - Project ID
 * @returns {Promise<{data: Array, error: Object}>} List of questions and answers
 */
export const getQA = async (projectId) => {
    return await getInteractionsByProject(projectId, { type: 'question' });
};

/**
 * Reply to an interaction
 * @param {Object} replyData - Reply data
 * @param {string} userId - User ID
 * @returns {Promise<{data: Object, error: Object}>} Created reply
 */
export const replyToInteraction = async (replyData, userId) => {
    if (!userId) {
        return ErrorTypes.UNAUTHORIZED();
    }
    if (!replyData.parent_id) {
        return ErrorTypes.REQUIRED_FIELD('父留言 ID');
    }
    if (!replyData.content) {
        return ErrorTypes.REQUIRED_FIELD('內容');
    }

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

    if (error) return handleSupabaseError(error);
    return successResponse(data);
};

/**
 * Update interaction
 * @param {string} id - Interaction ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<{data: Object, error: Object}>} Updated interaction
 */
export const updateInteraction = async (id, updates) => {
    if (!id) {
        return ErrorTypes.REQUIRED_FIELD('互動 ID');
    }

    const { data, error } = await supabase
        .from('interactions')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) return handleSupabaseError(error);
    return successResponse(data);
};

/**
 * Soft delete interaction
 * @param {string} id - Interaction ID
 * @returns {Promise<{data: Object, error: Object}>} Deleted interaction
 */
export const deleteInteraction = async (id) => {
    if (!id) {
        return ErrorTypes.REQUIRED_FIELD('互動 ID');
    }

    const { data, error } = await supabase
        .from('interactions')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

    if (error) return handleSupabaseError(error);
    return successResponse(data);
};

/**
 * Get interaction count for a project
 * @param {string} projectId - Project ID
 * @param {string} type - Interaction type (optional)
 * @returns {Promise<{data: number, error: Object}>} Number of interactions
 */
export const getInteractionCount = async (projectId, type = null) => {
    if (!projectId) {
        return ErrorTypes.REQUIRED_FIELD('專案 ID');
    }

    let query = supabase
        .from('interactions')
        .select('*', { count: 'exact', head: true })
        .eq('project_id', projectId)
        .is('deleted_at', null);

    if (type) {
        query = query.eq('type', type);
    }

    const { count, error } = await query;

    if (error) return handleSupabaseError(error);
    return successResponse(count || 0);
};
