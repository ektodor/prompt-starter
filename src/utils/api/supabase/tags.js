import { supabase } from "../supabaseClient.js";
import {
  successResponse,
  handleSupabaseError,
  ErrorTypes,
  AppError,
} from "../apiResponseHelper.js";

/**
 * Get all tags
 * @returns {Promise<{data: Array, error: Object}>} List of all tags
 */
export const getAllTags = async () => {
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .order("tag_name", { ascending: true });

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data);
};

/**
 * Get tag by ID
 * @param {string} id - Tag ID
 * @returns {Promise<{data: Object, error: Object}>} Tag details
 */
export const getTagById = async (id) => {
  if (!id) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("標籤 ID"));
  }

  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data);
};

/**
 * Get tag by slug
 * @param {string} slug - Tag slug
 * @returns {Promise<{data: Object, error: Object}>} Tag details
 */
export const getTagBySlug = async (slug) => {
  if (!slug) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("標籤 slug"));
  }

  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data);
};

/**
 * Get projects by tag
 * @param {string} tagId - Tag ID
 * @param {Object} filters - Additional filters
 * @returns {Promise<{data: Array, error: Object}>} List of projects with this tag
 */
export const getProjectsByTag = async (tagId, filters = {}) => {
  if (!tagId) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("標籤 ID"));
  }

  let query = supabase
    .from("projects")
    .select(
      `
      *,
      creator:profiles!creator_id(id, display_name, avatar_url),
      project_tags!inner(
        tags(id, tag_name, slug)
      )
    `,
    )
    .eq("project_tags.tag_id", tagId)
    .is("deleted_at", null);

  if (filters.status) {
    query = query.eq("status", filters.status);
  } else {
    query = query.eq("status", "active");
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  query = query.order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data);
};

/**
 * Get projects by multiple tags (OR logic)
 * @param {Array<string>} tagIds - Array of tag IDs
 * @param {Object} filters - Additional filters
 * @returns {Promise<{data: Array, error: Object}>} List of projects matching any tag
 */
export const getProjectsByTags = async (tagIds, filters = {}) => {
  if (!tagIds || tagIds.length === 0) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("標籤 IDs"));
  }

  let query = supabase
    .from("projects")
    .select(
      `
      *,
      creator:profiles!creator_id(id, display_name, avatar_url),
      project_tags!inner(
        tags(id, tag_name, slug)
      )
    `,
    )
    .in("project_tags.tag_id", tagIds)
    .is("deleted_at", null);

  if (filters.status) {
    query = query.eq("status", filters.status);
  } else {
    query = query.eq("status", "active");
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  query = query.order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data);
};

/**
 * Get tags for a project
 * @param {string} projectId - Project ID
 * @returns {Promise<{data: Array, error: Object}>} List of tags
 */
export const getProjectTags = async (projectId) => {
  if (!projectId) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("專案 ID"));
  }

  const { data, error } = await supabase
    .from("project_tags")
    .select(
      `
      tags(*)
    `,
    )
    .eq("project_id", projectId);

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data.map((item) => item.tags));
};

/**
 * Add tags to project
 * @param {string} projectId - Project ID
 * @param {Array<string>} tagIds - Array of tag IDs to add
 * @returns {Promise<{data: Object, error: Object}>} Result
 */
export const addProjectTags = async (projectId, tagIds) => {
  if (!projectId) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("專案 ID"));
  }
  if (!tagIds || tagIds.length === 0) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("標籤 IDs"));
  }

  const { error } = await supabase.rpc("add_project_tags", {
    p_project_id: projectId,
    p_tag_ids: tagIds,
  });

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse({ message: "標籤已新增", count: tagIds.length });
};

/**
 * Remove tags from project
 * @param {string} projectId - Project ID
 * @param {Array<string>} tagIds - Array of tag IDs to remove
 * @returns {Promise<{data: Object, error: Object}>} Result
 */
export const removeProjectTags = async (projectId, tagIds) => {
  if (!projectId) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("專案 ID"));
  }
  if (!tagIds || tagIds.length === 0) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("標籤 IDs"));
  }

  const { error } = await supabase.rpc("remove_project_tags", {
    p_project_id: projectId,
    p_tag_ids: tagIds,
  });

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse({ message: "標籤已移除", count: tagIds.length });
};

/**
 * Replace all tags for a project
 * @param {string} projectId - Project ID
 * @param {Array<string>} tagIds - New array of tag IDs
 * @returns {Promise<{data: Object, error: Object}>} Result
 */
export const replaceProjectTags = async (projectId, tagIds) => {
  if (!projectId) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("專案 ID"));
  }

  // Delete all existing tags
  const { error: deleteError } = await supabase
    .from("project_tags")
    .delete()
    .eq("project_id", projectId);

  if (deleteError) {
    const formatted = handleSupabaseError(deleteError);
    throw new AppError(formatted.error);
  }

  // Add new tags
  if (tagIds && tagIds.length > 0) {
    return await addProjectTags(projectId, tagIds);
  }

  return successResponse({ message: "標籤已更新", count: 0 });
};
