import {
  mockRewardTiers,
  mockSupabaseResponse,
  mockDelay,
  findById,
} from "./mockData.js";

export const getRewardsByProject = async (projectId) => {
  await mockDelay();

  const rewards = mockRewardTiers
    .filter((r) => r.project_id === projectId && r.is_available)
    .sort((a, b) => a.display_order - b.display_order);

  return mockSupabaseResponse(rewards);
};

export const getRewardById = async (id) => {
  await mockDelay();
  const reward = findById(mockRewardTiers, id);
  return mockSupabaseResponse(reward);
};

export const createReward = async (rewardData) => {
  await mockDelay();

  const newReward = {
    id: "mock-" + Date.now(),
    ...rewardData,
    claimed_quantity: 0,
    is_available: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  mockRewardTiers.push(newReward);
  return mockSupabaseResponse(newReward);
};

export const updateReward = async (id, updates) => {
  await mockDelay();

  const index = mockRewardTiers.findIndex((r) => r.id === id);
  if (index === -1) {
    return mockSupabaseResponse(null, { message: "Reward not found" });
  }

  mockRewardTiers[index] = {
    ...mockRewardTiers[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };

  return mockSupabaseResponse(mockRewardTiers[index]);
};

export const deleteReward = async (id) => {
  await mockDelay();

  const index = mockRewardTiers.findIndex((r) => r.id === id);
  if (index === -1) {
    return mockSupabaseResponse(null, { message: "Reward not found" });
  }

  mockRewardTiers.splice(index, 1);
  return mockSupabaseResponse({ id });
};

export const isRewardAvailable = async (id) => {
  await mockDelay();

  const reward = findById(mockRewardTiers, id);
  if (!reward || !reward.is_available) return mockSupabaseResponse(false);
  if (reward.total_quantity === null) return mockSupabaseResponse(true);

  return mockSupabaseResponse(reward.claimed_quantity < reward.total_quantity);
};

export const calculateDiscount = (reward) => {
  if (!reward.list_price || !reward.amount) return 0;
  if (reward.list_price <= reward.amount) return 0;

  const discount =
    ((reward.list_price - reward.amount) / reward.list_price) * 100;
  return Math.round(discount);
};

export const getRewardWithDiscount = async (id) => {
  const { data: reward, error } = await getRewardById(id);
  if (error) return mockSupabaseResponse(null, error);

  return mockSupabaseResponse({
    ...reward,
    discount_percentage: calculateDiscount(reward),
  });
};
