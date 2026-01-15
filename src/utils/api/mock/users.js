import {
  mockProfiles,
  mockProjects,
  mockOrders,
  mockFavorites,
  mockSupabaseResponse,
  mockDelay,
  findById,
} from "./mockData.js";
export const getUserProfile = async (userId) => {
  await mockDelay();

  const profile = findById(mockProfiles, userId);
  return mockSupabaseResponse(profile);
};

export const updateUserProfile = async (userId, updates) => {
  await mockDelay();

  const index = mockProfiles.findIndex((p) => p.id === userId);
  if (index === -1) {
    return mockSupabaseResponse(null, { message: "User not found" });
  }

  mockProfiles[index] = {
    ...mockProfiles[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };

  return mockSupabaseResponse(mockProfiles[index]);
};

export const getUserProjects = async (userId) => {
  await mockDelay();

  const projects = mockProjects.filter((p) => p.creator_id === userId);
  return mockSupabaseResponse(projects);
};

export const getUserBackedProjects = async (userId) => {
  await mockDelay();

  const orders = mockOrders.filter(
    (o) => o.user_id === userId && o.status === "paid"
  );
  const projectIds = [...new Set(orders.map((o) => o.project_id))];
  const projects = mockProjects.filter((p) => projectIds.includes(p.id));

  return mockSupabaseResponse(projects);
};

export const getUserStats = async (userId) => {
  await mockDelay();

  const projectsCreated = mockProjects.filter(
    (p) => p.creator_id === userId
  ).length;
  const backedOrders = mockOrders.filter(
    (o) => o.user_id === userId && o.status === "paid"
  );
  const projectsBacked = new Set(backedOrders.map((o) => o.project_id)).size;
  const favoriteCount = mockFavorites.filter(
    (f) => f.user_id === userId
  ).length;
  const totalBacked = backedOrders.reduce(
    (sum, o) => sum + parseFloat(o.amount),
    0
  );

  return mockSupabaseResponse({
    projectsCreated,
    projectsBacked,
    favoriteCount,
    totalBacked,
  });
};

export const getCategories = async () => {
  await mockDelay();
  // 為了向後兼容，返回 tags 作為 categories
  const { data: tags } = await getAllTags();
  return mockSupabaseResponse(
    tags.map((t) => ({
      id: t.id,
      name: t.tag_name,
      slug: t.slug,
    }))
  );
};
