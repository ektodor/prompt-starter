/**
 * Reward Tier Data Transformer
 * 將資料庫格式轉換為 PricingCard 頁面期望的格式
 */

import dayjs from "dayjs";

/**
 * 將資料庫的回饋方案轉換為 PricingCard 格式
 * @param {Object} reward - 資料庫查詢的回饋方案資料
 * @returns {Object} PricingCard 格式的資料
 */
export const transformToPricingCard = (reward) => {
  if (!reward) return null;

  return {
    id: reward.id,
    projectId: reward.project_id || "",
    cardImg: reward.cover_image_url || "",
    imgAlt: reward.cover_image_alt || reward.title || "",
    title: reward.title || "",
    subtitle: reward.subtitle || "",
    sellingPrice: reward.amount || 0,
    listPrice: reward.list_price || reward.amount || 0,
    sponsored: reward.claimed_quantity || 0,
    sponsorshipsAvailable: reward.total_quantity || 0,
    packageContents:
      reward.package_groups?.map((group) => ({
        id: group.id,
        group: group.group_name,
        tree: buildContentTree(group.items || []),
      })) || [],
    recommendedTo: reward.recommended_to || "",
    emphasizeContent:
      reward.highlights?.map((h) => ({
        id: h.id,
        emoji: h.emoji || "",
        content: h.content,
      })) || [],
    estimatedDelivery: formatDeliveryDate(reward.estimated_delivery_date),
  };
};

/**
 * 批量轉換回饋方案陣列
 * @param {Array} rewards - 回饋方案陣列
 * @returns {Array} PricingCard 格式的陣列
 */
export const transformToPricingCards = (rewards) => {
  if (!rewards || !Array.isArray(rewards)) return [];

  return rewards.map((reward) => transformToPricingCard(reward));
};

/**
 * 建立樹狀結構
 * @param {Array} items - 扁平化的項目陣列
 * @returns {Array} 樹狀結構陣列
 */
const buildContentTree = (items) => {
  if (!items || !Array.isArray(items)) return [];

  const itemMap = new Map();
  const roots = [];

  // 先建立所有項目的 map
  items.forEach((item) => {
    itemMap.set(item.id, {
      id: item.id,
      content: item.content,
      details: [],
    });
  });

  // 建立樹狀結構
  items
    .sort((a, b) => a.display_order - b.display_order)
    .forEach((item) => {
      const node = itemMap.get(item.id);
      if (item.parent_id) {
        const parent = itemMap.get(item.parent_id);
        if (parent) {
          parent.details.push(node);
        } else {
          // 如果找不到父項目，當作根項目
          roots.push(node);
        }
      } else {
        roots.push(node);
      }
    });

  return roots;
};

/**
 * 格式化交付日期
 * @param {string} dateString - 日期字串
 * @returns {string} 格式化後的日期字串
 */
const formatDeliveryDate = (dateString) => {
  if (!dateString) return "";

  const date = dayjs(dateString);
  const year = date.year();
  const month = date.month() + 1;

  return `${year} 年 ${month} 月初`;
};

/**
 * 計算折扣百分比
 * @param {number} amount - 售價
 * @param {number} listPrice - 原價
 * @returns {number} 折扣百分比
 */
export const calculateDiscountPercentage = (amount, listPrice) => {
  if (!listPrice || !amount || listPrice <= amount) return 0;

  const discount = ((listPrice - amount) / listPrice) * 100;
  return Math.round(discount);
};

/**
 * 檢查方案是否可購買
 * @param {Object} reward - 回饋方案物件
 * @returns {boolean} 是否可購買
 */
export const isRewardAvailable = (reward) => {
  if (!reward) return false;
  if (!reward.is_available) return false;
  if (reward.total_quantity === null) return true; // 無限量

  return reward.claimed_quantity < reward.total_quantity;
};

/**
 * 計算剩餘數量
 * @param {Object} reward - 回饋方案物件
 * @returns {number|null} 剩餘數量（null 表示無限量）
 */
export const calculateRemainingQuantity = (reward) => {
  if (!reward) return 0;
  if (reward.total_quantity === null) return null; // 無限量

  const remaining = reward.total_quantity - (reward.claimed_quantity || 0);
  return remaining > 0 ? remaining : 0;
};
