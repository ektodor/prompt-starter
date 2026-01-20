import {
  mockProjects,
  mockFavorites,
  mockSupabaseResponse,
  mockDelay,
  findById,
} from "./mockData.js";
export const addFavorite = async (userId, projectId) => {
  await mockDelay();

  const exists = mockFavorites.some(
    (f) => f.user_id === userId && f.project_id === projectId
  );

  if (exists) {
    return mockSupabaseResponse(null, { message: "Already favorited" });
  }

  const newFavorite = {
    id: "mock-" + Date.now(),
    user_id: userId,
    project_id: projectId,
    created_at: new Date().toISOString(),
  };

  mockFavorites.push(newFavorite);
  return mockSupabaseResponse(newFavorite);
};

export const removeFavorite = async (userId, projectId) => {
  await mockDelay();

  const index = mockFavorites.findIndex(
    (f) => f.user_id === userId && f.project_id === projectId
  );

  if (index === -1) {
    return mockSupabaseResponse(null, { message: "Favorite not found" });
  }

  const removed = mockFavorites.splice(index, 1)[0];
  return mockSupabaseResponse(removed);
};

export const getFavoritesByUser = async (userId) => {
  await mockDelay();

  const favorites = mockFavorites
    .filter((f) => f.user_id === userId)
    .map((f) => ({
      ...f,
      project: findById(mockProjects, f.project_id),
    }));

  return mockSupabaseResponse(favorites);
};

export const isFavorited = async (userId, projectId) => {
  await mockDelay();

  const exists = mockFavorites.some(
    (f) => f.user_id === userId && f.project_id === projectId
  );

  return mockSupabaseResponse(exists);
};

export const toggleFavorite = async (userId, projectId) => {
  const { data: isFav } = await isFavorited(userId, projectId);

  if (isFav) {
    await removeFavorite(userId, projectId);
    return mockSupabaseResponse({ action: "removed", favorited: false });
  } else {
    await addFavorite(userId, projectId);
    return mockSupabaseResponse({ action: "added", favorited: true });
  }
};
