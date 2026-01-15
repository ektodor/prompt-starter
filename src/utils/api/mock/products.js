import {
  mockProfiles,
  mockProjects,
  mockTags,
  mockProjectTags,
  mockRewardTiers,
  mockFavorites,
  mockInteractions,
  mockSupabaseResponse,
  mockDelay,
  findById,
} from "./mockData.js";

export const getProjects = async (filters = {}) => {
  await mockDelay();

  let projects = [...mockProjects];

  // 篩選狀態
  if (filters.status) {
    projects = projects.filter((p) => p.status === filters.status);
  }

  // 搜尋
  if (filters.search) {
    const search = filters.search.toLowerCase();
    projects = projects.filter(
      (p) =>
        p.title.toLowerCase().includes(search) ||
        p.tagline?.toLowerCase().includes(search)
    );
  }

  // 標籤篩選
  if (filters.tags && filters.tags.length > 0) {
    projects = projects.filter((p) => {
      const projectTagIds = mockProjectTags
        .filter((pt) => pt.project_id === p.id)
        .map((pt) => pt.tag_id);
      return filters.tags.some((tagId) => projectTagIds.includes(tagId));
    });
  }

  // 加入關聯資料
  projects = projects.map((p) => ({
    ...p,
    creator: findById(mockProfiles, p.creator_id),
    project_tags: mockProjectTags
      .filter((pt) => pt.project_id === p.id)
      .map((pt) => ({ tags: findById(mockTags, pt.tag_id) })),
    reward_tiers: mockRewardTiers.filter((r) => r.project_id === p.id),
  }));

  // 分頁
  if (filters.limit) {
    const offset = filters.offset || 0;
    projects = projects.slice(offset, offset + filters.limit);
  }

  return mockSupabaseResponse(projects);
};

export const getProjectById = async (id) => {
  await mockDelay();

  const project = findById(mockProjects, id);
  if (!project) {
    return mockSupabaseResponse(null, { message: "Project not found" });
  }

  const enrichedProject = {
    ...project,
    creator: findById(mockProfiles, project.creator_id),
    project_tags: mockProjectTags
      .filter((pt) => pt.project_id === id)
      .map((pt) => ({ tags: findById(mockTags, pt.tag_id) })),
    reward_tiers: mockRewardTiers.filter((r) => r.project_id === id),
    interactions: mockInteractions.filter((i) => i.project_id === id).length,
    favorites: mockFavorites.filter((f) => f.project_id === id).length,
  };

  return mockSupabaseResponse(enrichedProject);
};

export const getProjectBySlug = async (slug) => {
  await mockDelay();

  const project = mockProjects.find((p) => p.slug === slug);
  if (!project) {
    return mockSupabaseResponse(null, { message: "Project not found" });
  }

  return getProjectById(project.id);
};

export const createProject = async (projectData, userId, ownerName) => {
  await mockDelay();

  const newProject = {
    id: "mock-" + Date.now(),
    ...projectData,
    creator_id: userId,
    owner_name: ownerName,
    current_amount: 0,
    backers_count: 0,
    status: "draft",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
  };

  mockProjects.push(newProject);
  return mockSupabaseResponse(newProject);
};

export const updateProject = async (id, updates) => {
  await mockDelay();

  const index = mockProjects.findIndex((p) => p.id === id);
  if (index === -1) {
    return mockSupabaseResponse(null, { message: "Project not found" });
  }

  mockProjects[index] = {
    ...mockProjects[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };

  return mockSupabaseResponse(mockProjects[index]);
};

export const updateProjectSocialMedia = async (id, socialMedia) => {
  return updateProject(id, { social_media: socialMedia });
};

export const deleteProject = async (id) => {
  return updateProject(id, { deleted_at: new Date().toISOString() });
};

export const getProjectStats = async (id) => {
  await mockDelay();

  const project = findById(mockProjects, id);
  if (!project) {
    return mockSupabaseResponse(null, { message: "Project not found" });
  }

  const fundingPercentage = Math.round(
    (project.current_amount / project.goal_amount) * 100
  );
  const daysLeft = project.end_date
    ? Math.ceil(
        (new Date(project.end_date) - new Date()) / (1000 * 60 * 60 * 24)
      )
    : 0;

  return mockSupabaseResponse({
    goalAmount: project.goal_amount,
    currentAmount: project.current_amount,
    backersCount: project.backers_count,
    fundingPercentage,
    daysLeft: Math.max(0, daysLeft),
  });
};

export const getFeaturedProjects = async (limit = 6) => {
  await mockDelay();

  const featured = [...mockProjects]
    .filter((p) => p.status === "active")
    .sort((a, b) => b.backers_count - a.backers_count)
    .slice(0, limit)
    .map((p) => ({
      ...p,
      creator: findById(mockProfiles, p.creator_id),
      project_tags: mockProjectTags
        .filter((pt) => pt.project_id === p.id)
        .map((pt) => ({ tags: findById(mockTags, pt.tag_id) })),
    }));

  return mockSupabaseResponse(featured);
};
