import { supabase } from "../supabaseClient.js";
import {
  successResponse,
  handleSupabaseError,
  ErrorTypes,
} from "../apiResponseHelper.js";

/**
 * Get all users (admin only)
 * @param {Object} filters - Filter options
 * @returns {Promise<{data: Array, error: Object}>} List of users
 */
export const getAllUsers = async (filters = {}) => {
  let query = supabase.from("profiles").select("*");

  if (filters.role) {
    query = query.eq("role", filters.role);
  }

  if (filters.search) {
    query = query.or(
      `display_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`,
    );
  }

  query = query.order("created_at", { ascending: false });

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) return handleSupabaseError(error);
  return successResponse(data);
};

/**
 * Get all projects (admin only)
 * @param {Object} filters - Filter options
 * @returns {Promise<{data: Array, error: Object}>} List of projects
 */
export const getAllProjects = async (filters = {}) => {
  let query = supabase
    .from("projects")
    .select(
      `
      *,
      creator:profiles!creator_id(id, display_name, email),
      category:categories(id, name, slug)
    `,
    )
    .is("deleted_at", null);

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  if (filters.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,tagline.ilike.%${filters.search}%`,
    );
  }

  query = query.order("created_at", { ascending: false });

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) return handleSupabaseError(error);
  return successResponse(data);
};

/**
 * Update project status (admin only)
 * @param {string} id - Project ID
 * @param {string} status - New status
 * @returns {Promise<{data: Object, error: Object}>} Updated project
 */
export const updateProjectStatus = async (id, status) => {
  if (!id) {
    return ErrorTypes.REQUIRED_FIELD("專案 ID");
  }
  if (!status) {
    return ErrorTypes.REQUIRED_FIELD("狀態");
  }

  const { data, error } = await supabase
    .from("projects")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) return handleSupabaseError(error);
  return successResponse(data);
};

/**
 * Get platform analytics
 * @param {Object} dateRange - Date range filter
 * @returns {Promise<{data: Array, error: Object}>} Analytics data
 */
export const getAnalytics = async (dateRange = {}) => {
  let query = supabase.from("analytics").select("*");

  if (dateRange.startDate) {
    query = query.gte("date", dateRange.startDate);
  }

  if (dateRange.endDate) {
    query = query.lte("date", dateRange.endDate);
  }

  query = query.order("date", { ascending: false });

  const { data, error } = await query;

  if (error) return handleSupabaseError(error);
  return successResponse(data);
};

/**
 * Get platform statistics summary
 * @returns {Promise<{data: Object, error: Object}>} Platform stats
 */
export const getPlatformStats = async () => {
  // Total users
  const { count: totalUsers, error: usersError } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  if (usersError) return handleSupabaseError(usersError);

  // Total projects by status
  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("status")
    .is("deleted_at", null);

  if (projectsError) return handleSupabaseError(projectsError);

  const projectsByStatus = {
    draft: 0,
    reviewing: 0,
    active: 0,
    funded: 0,
    failed: 0,
    cancelled: 0,
  };

  projects.forEach((p) => {
    projectsByStatus[p.status] = (projectsByStatus[p.status] || 0) + 1;
  });

  // Total revenue
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("amount")
    .eq("status", "paid");

  if (ordersError) return handleSupabaseError(ordersError);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + parseFloat(order.amount),
    0,
  );

  // Platform fee (assume 5%)
  const platformFee = totalRevenue * 0.05;

  return successResponse({
    totalUsers: totalUsers || 0,
    totalProjects: projects.length,
    activeProjects: projectsByStatus.active,
    successfulProjects: projectsByStatus.funded,
    failedProjects: projectsByStatus.failed,
    totalRevenue: totalRevenue,
    platformFee: platformFee,
    projectsByStatus,
  });
};

/**
 * Get all orders (admin only)
 * @param {Object} filters - Filter options
 * @returns {Promise<{data: Array, error: Object}>} List of orders
 */
export const getAllOrders = async (filters = {}) => {
  let query = supabase.from("orders").select(`
      *,
      user:profiles!user_id(id, display_name, email),
      project:projects(id, title, slug)
    `);

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  if (filters.startDate) {
    query = query.gte("created_at", filters.startDate);
  }

  if (filters.endDate) {
    query = query.lte("created_at", filters.endDate);
  }

  query = query.order("created_at", { ascending: false });

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) return handleSupabaseError(error);
  return successResponse(data);
};

/**
 * Update user role (admin only)
 * @param {string} userId - User ID
 * @param {string} role - New role (user, creator, admin)
 * @returns {Promise<{data: Object, error: Object}>} Updated user
 */
export const updateUserRole = async (userId, role) => {
  if (!userId) {
    return ErrorTypes.REQUIRED_FIELD("使用者 ID");
  }
  if (!role) {
    return ErrorTypes.REQUIRED_FIELD("角色");
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", userId)
    .select()
    .single();

  if (error) return handleSupabaseError(error);
  return successResponse(data);
};
