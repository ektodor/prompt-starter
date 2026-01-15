/**
 * API 統一入口
 * API 層的職責：環境判斷、API 來源選擇、統一介面
 * 透過環境變數 VITE_USE_MOCK_API 控制使用真實 API 或 mock API
 *
 * 使用方式：
 * import * as api from './utils/api';
 * const projects = await api.getProjects();
 */

// 檢查是否使用 mock API
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === "true";
// api 匯入設定
let productsApi,
  tagsApi,
  rewardsApi,
  ordersApi,
  favoritesApi,
  interactionsApi,
  usersApi,
  adminApi;

if (USE_MOCK_API) {
  productsApi = await import("./mock/products.js");
  tagsApi = await import("./mock/tags.js");
  rewardsApi = await import("./mock/rewards.js");
  ordersApi = await import("./mock/orders.js");
  favoritesApi = await import("./mock/favorites.js");
  interactionsApi = await import("./mock/interactions.js");
  usersApi = await import("./mock/users.js");
  adminApi = await import("./mock/admin.js");
} else {
  productsApi = await import("./supabase/products.js");
  tagsApi = await import("./supabase/tags.js");
  rewardsApi = await import("./supabase/rewards.js");
  ordersApi = await import("./supabase/orders.js");
  favoritesApi = await import("./supabase/favorites.js");
  interactionsApi = await import("./supabase/interactions.js");
  usersApi = await import("./supabase/users.js");
  adminApi = await import("./supabase/admin.js");
}

// ============================================
// Products / Projects API
// ============================================

export const getProjects = productsApi.getProjects;
export const getProjectById = productsApi.getProjectById;
export const getProjectBySlug = productsApi.getProjectBySlug;
export const createProject = productsApi.createProject;
export const updateProject = productsApi.updateProject;
export const updateProjectSocialMedia = productsApi.updateProjectSocialMedia;
export const deleteProject = productsApi.deleteProject;
export const getProjectStats = productsApi.getProjectStats;
export const getFeaturedProjects = productsApi.getFeaturedProjects;

// ============================================
// Tags API
// ============================================

export const getAllTags = tagsApi.getAllTags;
export const getTagById = tagsApi.getTagById;
export const getTagBySlug = tagsApi.getTagBySlug;
export const getProjectsByTag = tagsApi.getProjectsByTag;
export const getProjectsByTags = tagsApi.getProjectsByTags;
export const getProjectTags = tagsApi.getProjectTags;
export const addProjectTags = tagsApi.addProjectTags;
export const removeProjectTags = tagsApi.removeProjectTags;
export const replaceProjectTags = tagsApi.replaceProjectTags;

// ============================================
// Rewards API
// ============================================

export const getRewardsByProject = rewardsApi.getRewardsByProject;
export const getRewardById = rewardsApi.getRewardById;
export const createReward = rewardsApi.createReward;
export const updateReward = rewardsApi.updateReward;
export const deleteReward = rewardsApi.deleteReward;
export const isRewardAvailable = rewardsApi.isRewardAvailable;
export const calculateDiscount = rewardsApi.calculateDiscount;
export const getRewardWithDiscount = rewardsApi.getRewardWithDiscount;

// ============================================
// Orders API
// ============================================

export const createOrder = ordersApi.createOrder;
export const getOrdersByUser = ordersApi.getOrdersByUser;
export const getOrdersByProject = ordersApi.getOrdersByProject;
export const getOrderById = ordersApi.getOrderById;
export const updateOrderStatus = ordersApi.updateOrderStatus;
export const updateOrderShipping = ordersApi.updateOrderShipping;
export const updateOrderNote = ordersApi.updateOrderNote;
export const updateInvoiceCarrier = ordersApi.updateInvoiceCarrier;
export const updateOrderDetails = ordersApi.updateOrderDetails;
export const cancelOrder = ordersApi.cancelOrder;
export const getOrderStats = ordersApi.getOrderStats;

// ============================================
// Favorites API
// ============================================

export const addFavorite = favoritesApi.addFavorite;
export const removeFavorite = favoritesApi.removeFavorite;
export const getFavoritesByUser = favoritesApi.getFavoritesByUser;
export const isFavorited = favoritesApi.isFavorited;
export const toggleFavorite = favoritesApi.toggleFavorite;

// ============================================
// Interactions API
// ============================================

export const createInteraction = interactionsApi.createInteraction;
export const getInteractionsByProject =
  interactionsApi.getInteractionsByProject;
export const getComments = interactionsApi.getComments;
export const getQA = interactionsApi.getQA;
export const getInteractionById = interactionsApi.getInteractionById;
export const updateInteraction = interactionsApi.updateInteraction;
export const deleteInteraction = interactionsApi.deleteInteraction;
export const replyToInteraction = interactionsApi.replyToInteraction;

// ============================================
// Users API
// ============================================

export const getUserProfile = usersApi.getUserProfile;
export const updateUserProfile = usersApi.updateUserProfile;
export const getUserProjects = usersApi.getUserProjects;
export const getUserBackedProjects = usersApi.getUserBackedProjects;
export const getUserStats = usersApi.getUserStats;
export const getCategories = usersApi.getCategories;

// ============================================
// Admin API
// ============================================

export const getAllUsers = adminApi.getAllUsers;
export const getAllProjects = adminApi.getAllProjects;
export const getAllOrders = adminApi.getAllOrders;
export const updateProjectStatus = adminApi.updateProjectStatus;
export const updateUserRole = adminApi.updateUserRole;
export const getPlatformStats = adminApi.getPlatformStats;
export const getAnalytics = adminApi.getAnalytics;

// ============================================
// 工具函式
// ============================================

/**
 * 檢查當前是否使用 mock API
 */
export const isMockMode = () => USE_MOCK_API;

/**
 * 取得當前 API 模式
 */
export const getApiMode = () => (USE_MOCK_API ? "mock" : "real");

console.log(`🚀 FundFlow API 模式: ${getApiMode()}`);
