/**
 * Supabase API 統一導出
 * 從各個模組匯出所有 API 函數
 */

// Products / Projects
export {
  getProjects,
  getProjectById,
  getProjectBySlug,
  createProject,
  updateProject,
  updateProjectSocialMedia,
  deleteProject,
  getProjectStats,
  getFeaturedProjects,
  getHotProjects,
} from "./products.js";

// Tags
export {
  getAllTags,
  getTagById,
  getTagBySlug,
  getProjectsByTag,
  getProjectsByTags,
  getProjectTags,
  addProjectTags,
  removeProjectTags,
  replaceProjectTags,
} from "./tags.js";

// Rewards
export {
  getRewardsByProject,
  getRewardById,
  createReward,
  updateReward,
  deleteReward,
  isRewardAvailable,
  claimReward,
  calculateDiscount,
  getRewardWithDiscount,
} from "./rewards.js";

// Orders
export {
  createOrder,
  getOrdersByUser,
  getOrdersByProject,
  getOrderById,
  updateOrderStatus,
  updateOrderShipping,
  updateOrderNote,
  updateInvoiceCarrier,
  updateOrderDetails,
  cancelOrder,
  getOrderStats,
} from "./orders.js";

// Favorites
export {
  addFavorite,
  removeFavorite,
  getFavoritesByUser,
  isFavorited,
  toggleFavorite,
} from "./favorites.js";

// Interactions
export {
  createInteraction,
  getInteractionsByProject,
  getComments,
  getQA,
  // getInteractionById,
  updateInteraction,
  deleteInteraction,
  replyToInteraction,
} from "./interactions.js";

// Users
export {
  getUserProfile,
  updateUserProfile,
  getUserProjects,
  getUserBackedProjects,
  getUserStats,
  getCategories,
} from "./users.js";

// Admin
export {
  getAllUsers,
  getAllProjects,
  getAllOrders,
  updateProjectStatus,
  updateUserRole,
  getPlatformStats,
  getAnalytics,
} from "./admin.js";
