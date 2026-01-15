import {
  mockProfiles,
  mockProjects,
  mockOrders,
  mockSupabaseResponse,
  mockDelay,
  findById,
} from "./mockData.js";
export const getAllUsers = async (filters = {}) => {
  await mockDelay();

  let users = [...mockProfiles];

  if (filters.role) {
    users = users.filter((u) => u.role === filters.role);
  }

  if (filters.search) {
    const search = filters.search.toLowerCase();
    users = users.filter(
      (u) =>
        u.display_name?.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search)
    );
  }

  return mockSupabaseResponse(users);
};

export const getAllProjects = async (filters = {}) => {
  await mockDelay();

  let projects = [...mockProjects];

  if (filters.status) {
    projects = projects.filter((p) => p.status === filters.status);
  }

  if (filters.creator_id) {
    projects = projects.filter((p) => p.creator_id === filters.creator_id);
  }

  projects = projects.map((p) => ({
    ...p,
    creator: findById(mockProfiles, p.creator_id),
  }));

  return mockSupabaseResponse(projects);
};

export const getAllOrders = async (filters = {}) => {
  await mockDelay();

  let orders = [...mockOrders];

  if (filters.status) {
    orders = orders.filter((o) => o.status === filters.status);
  }

  if (filters.project_id) {
    orders = orders.filter((o) => o.project_id === filters.project_id);
  }

  orders = orders.map((o) => ({
    ...o,
    user: findById(mockProfiles, o.user_id),
    project: findById(mockProjects, o.project_id),
  }));

  return mockSupabaseResponse(orders);
};

export const updateProjectStatus = async (id, status) => {
  await mockDelay();

  const index = mockProjects.findIndex((p) => p.id === id);
  if (index === -1) {
    return mockSupabaseResponse(null, { message: "Project not found" });
  }

  mockProjects[index] = {
    ...mockProjects[index],
    status,
    updated_at: new Date().toISOString(),
  };

  return mockSupabaseResponse(mockProjects[index]);
};

export const updateUserRole = async (userId, role) => {
  await mockDelay();

  const index = mockProfiles.findIndex((p) => p.id === userId);
  if (index === -1) {
    return mockSupabaseResponse(null, { message: "User not found" });
  }

  mockProfiles[index] = {
    ...mockProfiles[index],
    role,
    updated_at: new Date().toISOString(),
  };

  return mockSupabaseResponse(mockProfiles[index]);
};

export const getPlatformStats = async () => {
  await mockDelay();

  const totalUsers = mockProfiles.length;
  const totalProjects = mockProjects.length;
  const activeProjects = mockProjects.filter(
    (p) => p.status === "active"
  ).length;
  const totalRevenue = mockOrders
    .filter((o) => o.status === "paid")
    .reduce((sum, o) => sum + parseFloat(o.amount), 0);
  const totalBackers = new Set(
    mockOrders.filter((o) => o.status === "paid").map((o) => o.user_id)
  ).size;

  return mockSupabaseResponse({
    totalUsers,
    totalProjects,
    activeProjects,
    totalRevenue,
    totalBackers,
    successRate:
      totalProjects > 0
        ? Math.round(
            (mockProjects.filter((p) => p.status === "funded").length /
              totalProjects) *
              100
          )
        : 0,
  });
};

export const getAnalytics = async (dateRange = {}) => {
  await mockDelay();

  // 簡化版分析數據
  return mockSupabaseResponse({
    projectsCreated: mockProjects.length,
    ordersPlaced: mockOrders.length,
    revenue: mockOrders
      .filter((o) => o.status === "paid")
      .reduce((sum, o) => sum + parseFloat(o.amount), 0),
    newUsers: mockProfiles.length,
  });
};
