import { supabase } from "../supabaseClient.js";
import {
  successResponse,
  handleSupabaseError,
  ErrorTypes,
} from "../apiResponseHelper.js";

/**
 * Get all reward tiers for a project
 * @param {string} projectId - Project ID
 * @returns {Promise<{data: Array, error: Object}>} List of reward tiers
 */
export const getRewardsByProject = async (projectId) => {
  // Input validation
  if (!projectId) {
    return ErrorTypes.REQUIRED_FIELD("專案 ID");
  }

  const { data, error } = await supabase
    .from("reward_tiers")
    .select(
      `
      *,
      package_groups:reward_package_groups(
        id,
        group_name,
        display_order,
        items:reward_package_items(id, parent_id, content, display_order)
      ),
      highlights:reward_highlights(id, emoji, content, display_order)
    `,
    )
    .eq("project_id", projectId)
    .eq("is_available", true)
    .order("display_order", { ascending: true });

  if (error) return handleSupabaseError(error);
  return successResponse(data);
};

/**
 * Get single reward tier by ID
 * @param {string} id - Reward tier ID
 * @returns {Promise<{data: Object, error: Object}>} Reward tier details
 */
export const getRewardById = async (id) => {
  // Input validation
  if (!id) {
    return ErrorTypes.REQUIRED_FIELD("回饋方案 ID");
  }

  const { data, error } = await supabase
    .from("reward_tiers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return handleSupabaseError(error);
  return successResponse(data);
};

/**
 * Create a new reward tier
 * @param {Object} rewardData - Reward tier data
 * @returns {Promise<{data: Object, error: Object}>} Created reward tier
 */
export const createReward = async (rewardData) => {
  // Input validation
  if (!rewardData.project_id) {
    return ErrorTypes.REQUIRED_FIELD("專案 ID");
  }
  if (!rewardData.title) {
    return ErrorTypes.REQUIRED_FIELD("方案標題");
  }
  if (!rewardData.amount || rewardData.amount <= 0) {
    return ErrorTypes.INVALID_AMOUNT();
  }

  const { data, error } = await supabase
    .from("reward_tiers")
    .insert(rewardData)
    .select()
    .single();

  if (error) return handleSupabaseError(error);
  return successResponse(data);
};

/**
 * Update a reward tier
 * @param {string} id - Reward tier ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<{data: Object, error: Object}>} Updated reward tier
 */
export const updateReward = async (id, updates) => {
  // Input validation
  if (!id) {
    return ErrorTypes.REQUIRED_FIELD("回饋方案 ID");
  }

  const { data, error } = await supabase
    .from("reward_tiers")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return handleSupabaseError(error);
  return successResponse(data);
};

/**
 * Delete a reward tier (soft delete)
 * @param {string} id - Reward tier ID
 * @returns {Promise<{data: Object, error: Object}>} Deleted reward tier
 */
export const deleteReward = async (id) => {
  // Input validation
  if (!id) {
    return ErrorTypes.REQUIRED_FIELD("回饋方案 ID");
  }

  const { data, error } = await supabase
    .from("reward_tiers")
    .update({ is_available: false })
    .eq("id", id)
    .select()
    .single();

  if (error) return handleSupabaseError(error);
  return successResponse(data);
};

/**
 * Check if a reward tier is available for purchase
 * @param {string} id - Reward tier ID
 * @returns {Promise<{data: boolean, error: Object}>} Availability status
 */
export const isRewardAvailable = async (id) => {
  // Input validation
  if (!id) {
    return ErrorTypes.REQUIRED_FIELD("回饋方案 ID");
  }

  const { data, error } = await supabase
    .from("reward_tiers")
    .select("is_available, total_quantity, claimed_quantity")
    .eq("id", id)
    .single();

  if (error) return handleSupabaseError(error);

  if (!data.is_available) return successResponse(false);
  if (data.total_quantity === null) return successResponse(true); // Unlimited

  return successResponse(data.claimed_quantity < data.total_quantity);
};

/**
 * Claim a reward (increment claimed_quantity)
 * @param {string} id - Reward tier ID
 * @returns {Promise<{data: Object, error: Object}>} Updated reward tier
 */
export const claimReward = async (id) => {
  // Input validation
  if (!id) {
    return ErrorTypes.REQUIRED_FIELD("回饋方案 ID");
  }

  // Check availability first
  const { data: isAvailable } = await isRewardAvailable(id);
  if (!isAvailable) {
    return ErrorTypes.INSUFFICIENT_STOCK("回饋方案");
  }

  const { data, error } = await supabase.rpc("claim_reward", { reward_id: id });

  if (error) return handleSupabaseError(error);
  return successResponse(data);
};

/**
 * Calculate discount percentage
 * @param {Object} reward - Reward tier object with amount and list_price
 * @returns {number} Discount percentage
 */
export const calculateDiscount = (reward) => {
  if (!reward.list_price || !reward.amount) return 0;
  if (reward.list_price <= reward.amount) return 0;

  return Math.round(
    ((reward.list_price - reward.amount) / reward.list_price) * 100,
  );
};

/**
 * Get reward with discount information
 * @param {string} id - Reward tier ID
 * @returns {Promise<{data: Object, error: Object}>} Reward with discount info
 */
export const getRewardWithDiscount = async (id) => {
  const { data, error } = await getRewardById(id);

  if (error) return { data: null, error };

  const discount = calculateDiscount(data);

  return successResponse({
    ...data,
    discount_percentage: discount,
    has_discount: discount > 0,
  });
};
