import { supabase } from '../supabaseClient.js';

/**
 * Get all tags
 * @returns {Promise<Array>} List of all tags
 */
export const getAllTags = async () => {
    const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('tag_name', { ascending: true });

    if (error) throw error;
    return data;
};

/**
 * Get tag by ID
 * @param {string} id - Tag ID
 * @returns {Promise<Object>} Tag details
 */
export const getTagById = async (id) => {
    const { data, error } = await supabase
        .from('tags')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

/**
 * Get tag by slug
 * @param {string} slug - Tag slug
 * @returns {Promise<Object>} Tag details
 */
export const getTagBySlug = async (slug) => {
    const { data, error } = await supabase
        .from('tags')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) throw error;
    return data;
};

/**
 * Create new tag (admin only)
 * @param {Object} tagData - Tag data
 * @returns {Promise<Object>} Created tag
 */
export const createTag = async (tagData) => {
    const { data, error } = await supabase
        .from('tags')
        .insert([tagData])
        .select()
        .single();

    if (error) throw error;
    return data;
};

/**
 * Update tag (admin only)
 * @param {string} id - Tag ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated tag
 */
export const updateTag = async (id, updates) => {
    const { data, error } = await supabase
        .from('tags')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

/**
 * Delete tag (admin only)
 * @param {string} id - Tag ID
 * @returns {Promise<Object>} Deleted tag
 */
export const deleteTag = async (id) => {
    const { data, error } = await supabase
        .from('tags')
        .delete()
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

/**
 * Get projects by tag
 * @param {string} tagId - Tag ID
 * @param {Object} filters - Additional filters
 * @returns {Promise<Array>} List of projects with this tag
 */
export const getProjectsByTag = async (tagId, filters = {}) => {
    let query = supabase
        .from('projects')
        .select(`
      *,
      creator:profiles!creator_id(id, display_name, avatar_url),
      project_tags!inner(
        tags(id, tag_name, slug)
      )
    `)
        .eq('project_tags.tag_id', tagId)
        .is('deleted_at', null);

    if (filters.status) {
        query = query.eq('status', filters.status);
    } else {
        query = query.eq('status', 'active');
    }

    if (filters.limit) {
        query = query.limit(filters.limit);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) throw error;
    return data;
};

/**
 * Get projects by multiple tags (OR logic)
 * @param {Array<string>} tagIds - Array of tag IDs
 * @param {Object} filters - Additional filters
 * @returns {Promise<Array>} List of projects matching any tag
 */
export const getProjectsByTags = async (tagIds, filters = {}) => {
    let query = supabase
        .from('projects')
        .select(`
      *,
      creator:profiles!creator_id(id, display_name, avatar_url),
      project_tags!inner(
        tags(id, tag_name, slug)
      )
    `)
        .in('project_tags.tag_id', tagIds)
        .is('deleted_at', null);

    if (filters.status) {
        query = query.eq('status', filters.status);
    } else {
        query = query.eq('status', 'active');
    }

    if (filters.limit) {
        query = query.limit(filters.limit);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) throw error;
    return data;
};

/**
 * Get tags for a project
 * @param {string} projectId - Project ID
 * @returns {Promise<Array>} List of tags
 */
export const getProjectTags = async (projectId) => {
    const { data, error } = await supabase
        .from('project_tags')
        .select(`
      tags(*)
    `)
        .eq('project_id', projectId);

    if (error) throw error;
    return data.map(item => item.tags);
};

/**
 * Add tags to project
 * @param {string} projectId - Project ID
 * @param {Array<string>} tagIds - Array of tag IDs to add
 * @returns {Promise<void>}
 */
export const addProjectTags = async (projectId, tagIds) => {
    const { error } = await supabase.rpc('add_project_tags', {
        p_project_id: projectId,
        p_tag_ids: tagIds
    });

    if (error) throw error;
};

/**
 * Remove tags from project
 * @param {string} projectId - Project ID
 * @param {Array<string>} tagIds - Array of tag IDs to remove
 * @returns {Promise<void>}
 */
export const removeProjectTags = async (projectId, tagIds) => {
    const { error } = await supabase.rpc('remove_project_tags', {
        p_project_id: projectId,
        p_tag_ids: tagIds
    });

    if (error) throw error;
};

/**
 * Replace all tags for a project
 * @param {string} projectId - Project ID
 * @param {Array<string>} tagIds - New array of tag IDs
 * @returns {Promise<void>}
 */
export const replaceProjectTags = async (projectId, tagIds) => {
    // Delete all existing tags
    const { error: deleteError } = await supabase
        .from('project_tags')
        .delete()
        .eq('project_id', projectId);

    if (deleteError) throw deleteError;

    // Add new tags
    if (tagIds && tagIds.length > 0) {
        await addProjectTags(projectId, tagIds);
    }
};
