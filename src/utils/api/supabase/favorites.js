import { supabase } from "../supabaseClient.js";
import {
  successResponse,
  handleSupabaseError,
  ErrorTypes,
  AppError,
} from "../apiResponseHelper.js";

/**
 * Add a project to favorites
 * @param {string} userId - User ID
 * @param {string} projectId - Project ID
 * @returns {Promise<{data: Object, error: Object}>} Created favorite
 */
export const addFavorite = async (userId, projectId) => {
  // Input validation
  if (!userId) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("使用者 ID"));
  }
  if (!projectId) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("專案 ID"));
  }

  const { data, error } = await supabase
    .from("favorites")
    .insert({
      user_id: userId,
      project_id: projectId,
    })
    .select()
    .single();

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data);
};

/**
 * Remove a project from favorites
 * @param {string} userId - User ID
 * @param {string} projectId - Project ID
 * @returns {Promise<{data: Object, error: Object}>} Deletion result
 */
export const removeFavorite = async (userId, projectId) => {
  // Input validation
  if (!userId) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("使用者 ID"));
  }
  if (!projectId) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("專案 ID"));
  }

  const { data, error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("project_id", projectId)
    .select();

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data);
};

/**
 * Get all favorites for a user
 * @param {string} userId - User ID
 * @returns {Promise<{data: Array, error: Object}>} List of favorited projects
 */
export const getFavoritesByUser = async (userId) => {
  // Input validation
  if (!userId) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("使用者 ID"));
  }

  const { data, error } = await supabase
    .from("favorites")
    .select(
      `
      *,
      project:projects(
        *,
        creator:profiles!creator_id(id, display_name, avatar_url),
        project_tags(tags(id, tag_name, slug))
      )
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data);
};

/**
 * Check if a project is favorited by a user
 * @param {string} userId - User ID
 * @param {string} projectId - Project ID
 * @returns {Promise<{data: boolean, error: Object}>} Favorited status
 */
export const isFavorited = async (userId, projectId) => {
  // Input validation
  if (!userId) {
    return successResponse(false);
  }
  if (!projectId) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("專案 ID"));
  }

  const { data, error } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("project_id", projectId)
    .single();

  if (error) {
    const errprValue = error.code === "PGRST116" ? false : error;

    const formatted = handleSupabaseError(errprValue);
    throw new AppError(formatted.error);
  }

  return successResponse(!!data);
};

/**
 * Toggle favorite status (add if not favorited, remove if favorited)
 * @param {string} userId - User ID
 * @param {string} projectId - Project ID
 * @returns {Promise<{data: Object, error: Object}>} Toggle result
 */
export const toggleFavorite = async (userId, projectId) => {
  const { data: isFav } = await isFavorited(userId, projectId);

  if (isFav) {
    await removeFavorite(userId, projectId);
    return successResponse({ action: "removed", favorited: false });
  } else {
    await addFavorite(userId, projectId);
    return successResponse({ action: "added", favorited: true });
  }
};

/**
 * Get favorite count for a project
 * @param {string} projectId - Project ID
 * @returns {Promise<{data: number, error: Object}>} Favorite count
 */
export const getFavoriteCount = async (projectId) => {
  // Input validation
  if (!projectId) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("專案 ID"));
  }

  const { count, error } = await supabase
    .from("favorites")
    .select("*", { count: "exact", head: true })
    .eq("project_id", projectId);

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(count || 0);
};
