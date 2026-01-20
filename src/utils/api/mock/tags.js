import {
  mockProfiles,
  mockProjects,
  mockTags,
  mockProjectTags,
  mockSupabaseResponse,
  mockDelay,
  findById,
} from "./mockData.js";

export const getAllTags = async () => {
  await mockDelay();
  return mockSupabaseResponse([...mockTags]);
};

export const getTagById = async (id) => {
  await mockDelay();
  const tag = findById(mockTags, id);
  return mockSupabaseResponse(tag);
};

export const getTagBySlug = async (slug) => {
  await mockDelay();
  const tag = mockTags.find((t) => t.slug === slug);
  return mockSupabaseResponse(tag);
};

export const getProjectsByTag = async (tagId, filters = {}) => {
  await mockDelay();

  const projectIds = mockProjectTags
    .filter((pt) => pt.tag_id === tagId)
    .map((pt) => pt.project_id);

  let projects = mockProjects.filter((p) => projectIds.includes(p.id));

  if (filters.status) {
    projects = projects.filter((p) => p.status === filters.status);
  }

  if (filters.limit) {
    projects = projects.slice(0, filters.limit);
  }

  projects = projects.map((p) => ({
    ...p,
    creator: findById(mockProfiles, p.creator_id),
    project_tags: mockProjectTags
      .filter((pt) => pt.project_id === p.id)
      .map((pt) => ({ tags: findById(mockTags, pt.tag_id) })),
  }));

  return mockSupabaseResponse(projects);
};

export const getProjectsByTags = async (tagIds, filters = {}) => {
  await mockDelay();

  const projectIds = mockProjectTags
    .filter((pt) => tagIds.includes(pt.tag_id))
    .map((pt) => pt.project_id);

  const uniqueProjectIds = [...new Set(projectIds)];
  let projects = mockProjects.filter((p) => uniqueProjectIds.includes(p.id));

  if (filters.status) {
    projects = projects.filter((p) => p.status === filters.status);
  }

  if (filters.limit) {
    projects = projects.slice(0, filters.limit);
  }

  projects = projects.map((p) => ({
    ...p,
    creator: findById(mockProfiles, p.creator_id),
    project_tags: mockProjectTags
      .filter((pt) => pt.project_id === p.id)
      .map((pt) => ({ tags: findById(mockTags, pt.tag_id) })),
  }));

  return mockSupabaseResponse(projects);
};

export const getProjectTags = async (projectId) => {
  await mockDelay();

  const tags = mockProjectTags
    .filter((pt) => pt.project_id === projectId)
    .map((pt) => findById(mockTags, pt.tag_id));

  return mockSupabaseResponse(tags);
};

export const addProjectTags = async (projectId, tagIds) => {
  await mockDelay();

  tagIds.forEach((tagId) => {
    const exists = mockProjectTags.some(
      (pt) => pt.project_id === projectId && pt.tag_id === tagId
    );
    if (!exists) {
      mockProjectTags.push({
        project_id: projectId,
        tag_id: tagId,
        created_at: new Date().toISOString(),
      });
    }
  });

  return mockSupabaseResponse(null);
};

export const removeProjectTags = async (projectId, tagIds) => {
  await mockDelay();

  const filtered = mockProjectTags.filter(
    (pt) => !(pt.project_id === projectId && tagIds.includes(pt.tag_id))
  );
  mockProjectTags.length = 0;
  mockProjectTags.push(...filtered);

  return mockSupabaseResponse(null);
};

export const replaceProjectTags = async (projectId, tagIds) => {
  await removeProjectTags(
    projectId,
    mockProjectTags
      .filter((pt) => pt.project_id === projectId)
      .map((pt) => pt.tag_id)
  );
  return addProjectTags(projectId, tagIds);
};
