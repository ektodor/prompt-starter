import { supabase } from '../supabaseClient.js';
import { formatResponse, ErrorTypes } from '../apiResponseHelper.js';

/**
 * Add project to favorites
 * @param {string} userId - User ID
 * @param {string} projectId - Project ID
 * @returns {Promise<{data: Object, error: Object}>} Created favorite
 */
export const addFavorite = async (userId, projectId) => {
    // Input validation
    if (!userId) {
        return ErrorTypes.UNAUTHORIZED();
    }

    if (!projectId) {
        return ErrorTypes.REQUIRED_FIELD('專案 ID');
    }

    const { data, error } = await supabase
        .from('favorites')
        .insert([{
            user_id: userId,
            project_id: projectId
        }])
        .select()
        .single();

    if (error) {
        // Handle duplicate favorite (already exists)
        if (error.code === '23505') {
            return ErrorTypes.DUPLICATE('收藏');
        }
        return formatResponse(null, error);
    }

    return formatResponse(data, null);
};

/**
 * Remove project from favorites
 * @param {string} userId - User ID
 * @param {string} projectId - Project ID
 * @returns {Promise<{data: Object, error: Object}>} Deleted favorite
 */
export const removeFavorite = async (userId, projectId) => {
    // Input validation
    if (!userId) {
        return ErrorTypes.UNAUTHORIZED();
    }

    if (!projectId) {
        return ErrorTypes.REQUIRED_FIELD('專案 ID');
    }

    const { data, error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('project_id', projectId)
        .select()
        .single();

    if (error?.code === 'PGRST116') {
        return ErrorTypes.NOT_FOUND('收藏');
    }

    return formatResponse(data, error);
};

/**
 * Get all favorites for a user
 * @param {string} userId - User ID
 * @returns {Promise<{data: Array, error: Object}>} List of favorite projects
 */
export const getFavoritesByUser = async (userId) => {
    // Input validation
    if (!userId) {
        return ErrorTypes.UNAUTHORIZED();
    }

    const { data, error } = await supabase
        .from('favorites')
        .select(`
      id,
      created_at,
      project:projects(
        id,
        title,
        slug,
        tagline,
        cover_image_url,
        goal_amount,
        current_amount,
        backers_count,
        end_date,
        status,
        creator:profiles!creator_id(id, display_name, avatar_url),
        category:categories(id, name, slug)
      )
    `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    return formatResponse(data, error);
};

/**
 * Check if user has favorited a project
 * @param {string} userId - User ID
 * @param {string} projectId - Project ID
 * @returns {Promise<{data: boolean, error: Object}>} True if favorited
 */
export const isFavorited = async (userId, projectId) => {
    // Input validation
    if (!userId || !projectId) {
        return formatResponse(false, null);
    }

    const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', userId)
        .eq('project_id', projectId)
        .single();

    if (error) {
        if (error.code === 'PGRST116') return formatResponse(false, null); // Not found
        return formatResponse(null, error);
    }

    return formatResponse(!!data, null);
};

/**
 * Toggle favorite status
 * @param {string} userId - User ID
 * @param {string} projectId - Project ID
 * @returns {Promise<{data: Object, error: Object}>} Result with action taken
 */
export const toggleFavorite = async (userId, projectId) => {
    const favoritedResult = await isFavorited(userId, projectId);
    if (favoritedResult.error) {
        return favoritedResult;
    }

    if (favoritedResult.data) {
        const removeResult = await removeFavorite(userId, projectId);
        if (removeResult.error) {
            return removeResult;
        }
        return formatResponse({ action: 'removed', favorited: false }, null);
    } else {
        const addResult = await addFavorite(userId, projectId);
        if (addResult.error) {
            return addResult;
        }
        return formatResponse({ action: 'added', favorited: true }, null);
    }
};

/**
 * Get favorite count for a project
 * @param {string} projectId - Project ID
 * @returns {Promise<{data: number, error: Object}>} Number of favorites
 */
export const getFavoriteCount = async (projectId) => {
    // Input validation
    if (!projectId) {
        return ErrorTypes.REQUIRED_FIELD('專案 ID');
    }

    const { count, error } = await supabase
        .from('favorites')
        .select('*', { count: 'exact', head: true })
        .eq('project_id', projectId);

    if (error) {
        return formatResponse(null, error);
    }

    return formatResponse(count || 0, null);
};
