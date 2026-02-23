import { supabase } from "../supabaseClient.js";
import {
  successResponse,
  handleSupabaseError,
  ErrorTypes,
  AppError,
} from "../apiResponseHelper.js";

/**
 * Get user profile
 * @returns {Promise<{data: Object, error: Object}>} User profile
 */
export const getUserProfile = async () => {
  const { data: session } = await supabase.auth.getSession();

  if (!session?.session?.user) {
    throw new AppError(ErrorTypes.UNAUTHORIZED());
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.session.user.id)
    .single();

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data);
};

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<{data: Object, error: Object}>} Updated profile
 */
export const updateUserProfile = async (userId, updates) => {
  if (!userId) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("使用者 ID"));
  }

  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data);
};

/**
 * Get projects created by user
 * @param {string} userId - User ID
 * @param {Object} filters - Filter options
 * @returns {Promise<{data: Array, error: Object}>} List of projects
 */
export const getUserProjects = async (userId, filters = {}) => {
  if (!userId) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("使用者 ID"));
  }

  let query = supabase
    .from("projects")
    .select(
      `
      *,
      category:categories(id, name, slug),
      reward_tiers(count)
    `,
    )
    .eq("creator_id", userId)
    .is("deleted_at", null);

  if (filters.status) {
    query = query.eq("status", filters.status);
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
 * Get projects backed by user
 * @param {string} userId - User ID
 * @returns {Promise<{data: Array, error: Object}>} List of backed projects
 */
export const getUserBackedProjects = async (userId) => {
  if (!userId) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("使用者 ID"));
  }

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
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
    `,
    )
    .eq("user_id", userId)
    .eq("status", "paid")
    .order("created_at", { ascending: false });

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data);
};

/**
 * Get user statistics
 * @param {string} userId - User ID
 * @returns {Promise<{data: Object, error: Object}>} User stats
 */
export const getUserStats = async (userId) => {
  if (!userId) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("使用者 ID"));
  }

  // Count projects created
  const { count: projectsCreated, error: projectsError } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("creator_id", userId)
    .is("deleted_at", null);

  if (projectsError) {
    const formatted = handleSupabaseError(projectsError);
    throw new AppError(formatted.error);
  }

  // Count projects backed
  const { count: projectsBacked, error: backedError } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("status", "paid");

  if (backedError) {
    const formatted = handleSupabaseError(backedError);
    throw new AppError(formatted.error);
  }

  // Count favorites
  const { count: favoriteCount, error: favError } = await supabase
    .from("favorites")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (favError) {
    const formatted = handleSupabaseError(favError);
    throw new AppError(formatted.error);
  }

  // Total amount backed
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("amount")
    .eq("user_id", userId)
    .eq("status", "paid");

  if (ordersError) {
    const formatted = handleSupabaseError(ordersError);
    throw new AppError(formatted.error);
  }

  const totalBacked = orders.reduce(
    (sum, order) => sum + parseFloat(order.amount),
    0,
  );

    // Total projects backed
  const { data: creatorProjects, error: creatorProjectsError } = await supabase
    .from("projects")
    .select("current_amount")
    .eq("creator_id", userId)
    .is("deleted_at", null);

  if (creatorProjectsError) {
    const formatted = handleSupabaseError(creatorProjectsError);
    throw new AppError(formatted.error);
  }

  const totalFundingRaised = creatorProjects.reduce(
    (sum, project) => sum + parseFloat(project.current_amount || 0),
    0,
  );

  return successResponse({
    projectsCreated: projectsCreated || 0,
    projectsBacked: projectsBacked || 0,
    favoriteCount: favoriteCount || 0,
    totalBacked: totalBacked,
    totalFundingRaised: totalFundingRaised,
  });
};

/**
 * Create or update user profile (called after auth)
 * @param {Object} userData - User data from auth
 * @returns {Promise<{data: Object, error: Object}>} User profile
 */
export const upsertUserProfile = async (userData) => {
  if (!userData?.id) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("使用者資料"));
  }

  const { data, error } = await supabase
    .from("profiles")
    .upsert([
      {
        id: userData.id,
        email: userData.email,
        display_name:
          userData.user_metadata?.full_name || userData.email.split("@")[0],
        avatar_url: userData.user_metadata?.avatar_url || null,
      },
    ])
    .select()
    .single();

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data);
};

/**
 * Get all categories
 * @returns {Promise<{data: Array, error: Object}>} List of categories
 */
export const getCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data);
};
