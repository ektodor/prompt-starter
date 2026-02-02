import { supabase } from "../supabaseClient.js";
import {
  successResponse,
  handleSupabaseError,
  ErrorTypes,
  AppError,
} from "../apiResponseHelper.js";

/**
 * Get all projects with optional filters
 * @param {Object} filters - Filter options
 * @param {string} filters.search - Search term for title/tagline
 * @param {Array<string>} filters.tags - Array of tag IDs for filtering
 * @param {string} filters.status - Project status
 * @param {number} filters.limit - Number of results
 * @param {number} filters.offset - Pagination offset
 * @returns {Promise<Array>} List of projects
 */
export const getProjects = async (filters = {}) => {
  let query = supabase
    .from("projects")
    .select(
      `
      *,
      creator:profiles!creator_id(id, display_name, avatar_url),
      project_tags(tags(id, tag_name, slug)),
      reward_tiers(count)
    `,
    )
    .is("deleted_at", null);

  // Apply filters
  if (filters.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,tagline.ilike.%${filters.search}%`,
    );
  }

  // Support for tags filter (multi-tag OR logic)
  if (filters.tags && filters.tags.length > 0) {
    // Use inner join to filter by tags
    query = supabase
      .from("projects")
      .select(
        `
        *,
        creator:profiles!creator_id(id, display_name, avatar_url),
        project_tags!inner(tags(id, tag_name, slug)),
        reward_tiers(count)
      `,
      )
      .in("project_tags.tag_id", filters.tags)
      .is("deleted_at", null);
  }

  if (filters.status) {
    query = query.eq("status", filters.status);
  } else {
    // Default to active projects for public view
    query = query.eq("status", "active");
  }

  // Pagination
  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  if (filters.offset) {
    query = query.range(
      filters.offset,
      filters.offset + (filters.limit || 10) - 1,
    );
  }

  // Order by
  query = query.order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data);
};

/**
 * Get single project by ID
 * @param {string} id - Project ID
 * @returns {Promise<{data: Object, error: Object}>} Project details
 */
export const getProjectById = async (id) => {
  // Input validation
  if (!id) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("專案 ID").error);
  }

  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      *,
      creator:profiles!creator_id(id, display_name, avatar_url, bio),
      project_tags(tags(id, tag_name, slug)),
      reward_tiers(*),
      interactions(count),
      favorites(count),
      detail_sections:project_detail_sections(
        id,
        title,
        display_order,
        images:project_detail_images(id, image_url, alt_text, display_order),
        paragraphs:project_detail_paragraphs(id, content, display_order),
        content_groups:project_content_groups(
          id,
          group_name,
          group_icon_url,
          display_order,
          items:project_content_items(id, parent_id, content, display_order)
        ),
        highlights:project_highlights(id, icon_url, emoji, content, display_order)
      )
    `,
    )
    .eq("id", id)
    .is("deleted_at", null)
    .single();

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data);
};

/**
 * Get project by slug
 * @param {string} slug - Project slug
 * @returns {Promise<{data: Object, error: Object}>} Project details
 */
export const getProjectBySlug = async (slug) => {
  // Input validation
  if (!slug) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("專案 slug"));
  }

  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      *,
      creator:profiles!creator_id(id, display_name, avatar_url, bio),
      project_tags(tags(id, tag_name, slug)),
      reward_tiers(*),
      interactions(count),
      favorites(count)
    `,
    )
    .eq("slug", slug)
    .is("deleted_at", null)
    .single();

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data);
};

/**
 * Create new project
 * @param {Object} projectData - Project data
 * @param {string} userId - Creator user ID
 * @param {string} ownerName - Creator name (for performance optimization)
 * @returns {Promise<{data: Object, error: Object}>} Created project
 */
export const createProject = async (projectData, userId, ownerName) => {
  // Input validation
  if (!userId) {
    throw new AppError(ErrorTypes.UNAUTHORIZED());
  }

  if (!projectData.title) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("專案標題"));
  }

  if (!projectData.goal_amount || projectData.goal_amount <= 0) {
    throw new AppError(ErrorTypes.INVALID_AMOUNT());
  }

  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        ...projectData,
        creator_id: userId,
        owner_name: ownerName,
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
 * Update project
 * @param {string} id - Project ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<{data: Object, error: Object}>} Updated project
 */
export const updateProject = async (id, updates) => {
  // Input validation
  if (!id) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("專案 ID"));
  }

  if (updates.goal_amount !== undefined && updates.goal_amount <= 0) {
    throw new AppError(ErrorTypes.INVALID_AMOUNT());
  }

  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  // Handle not found
  if (error?.code === "PGRST116") {
    throw new AppError(ErrorTypes.NOT_FOUND("專案"));
  }

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data);
};

/**
 * Update project social media links
 * @param {string} id - Project ID
 * @param {Array} socialMedia - Array of social media objects
 * @returns {Promise<{data: Object, error: Object}>} Updated project
 */
export const updateProjectSocialMedia = async (id, socialMedia) => {
  // Input validation
  if (!id) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("專案 ID"));
  }

  const { data, error } = await supabase
    .from("projects")
    .update({ social_media: socialMedia })
    .eq("id", id)
    .select()
    .single();

  // Handle not found
  if (error?.code === "PGRST116") {
    throw new AppError(ErrorTypes.NOT_FOUND("專案"));
  }

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data);
};

/**
 * Soft delete project
 * @param {string} id - Project ID
 * @returns {Promise<{data: Object, error: Object}>} Deleted project
 */
export const deleteProject = async (id) => {
  // Input validation
  if (!id) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("專案 ID"));
  }

  const { data, error } = await supabase
    .from("projects")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  // Handle not found
  if (error?.code === "PGRST116") {
    throw new AppError(ErrorTypes.NOT_FOUND("專案"));
  }

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data);
};

/**
 * Get project statistics
 * @param {string} id - Project ID
 * @returns {Promise<{data: Object, error: Object}>} Project stats
 */
export const getProjectStats = async (id) => {
  // Input validation
  if (!id) {
    throw new AppError(ErrorTypes.REQUIRED_FIELD("專案 ID"));
  }

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("goal_amount, current_amount, backers_count, end_date")
    .eq("id", id)
    .single();

  if (projectError?.code === "PGRST116") {
    throw new AppError(ErrorTypes.NOT_FOUND("專案"));
  }

  if (projectError) {
    const formatted = handleSupabaseError(projectError);
    throw new AppError(formatted.error);
  }

  const { count: totalBackers, error: backersError } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("project_id", id)
    .eq("status", "paid");

  if (backersError) {
    const formatted = handleSupabaseError(backersError);
    throw new AppError(formatted.error);
  }

  const fundingPercentage =
    (project.current_amount / project.goal_amount) * 100;
  const daysLeft = project.end_date
    ? Math.ceil(
        (new Date(project.end_date) - new Date()) / (1000 * 60 * 60 * 24),
      )
    : null;

  const stats = {
    goalAmount: project.goal_amount,
    currentAmount: project.current_amount,
    backersCount: totalBackers || project.backers_count,
    fundingPercentage: Math.round(fundingPercentage),
    daysLeft: daysLeft > 0 ? daysLeft : 0,
  };

  return successResponse(stats);
};

/**
 * Get featured/hot projects
 * @param {number} limit - Number of projects to return
 * @returns {Promise<{data: Array, error: Object}>} Featured projects
 */
export const getFeaturedProjects = async (limit = 6) => {
  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      *,
      creator:profiles!creator_id(id, display_name, avatar_url),
      project_tags(tags(id, tag_name, slug))
    `,
    )
    .eq("status", "active")
    .eq("is_featured", true)
    .is("deleted_at", null)
    .order("featured_order", { ascending: true })
    .limit(limit);

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data);
};

/**
 * Get hot projects (sorted by backers count)
 * @param {number} limit - Number of projects to return
 * @returns {Promise<{data: Array, error: Object}>} Hot projects
 */
export const getHotProjects = async (limit = 5) => {
  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      *,
      creator:profiles!creator_id(id, display_name, avatar_url),
      project_tags(tags(id, tag_name, slug))
    `,
    )
    .eq("status", "active")
    .is("deleted_at", null)
    .order("backers_count", { ascending: false })
    .limit(limit);

  if (error) {
    const formatted = handleSupabaseError(error);
    throw new AppError(formatted.error);
  }

  return successResponse(data);
};
