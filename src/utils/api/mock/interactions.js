import {
  mockProfiles,
  mockInteractions,
  mockSupabaseResponse,
  mockDelay,
  findById,
} from "./mockData.js";
export const createInteraction = async (interactionData, userId) => {
  await mockDelay();

  const newInteraction = {
    id: "mock-" + Date.now(),
    ...interactionData,
    user_id: userId,
    is_creator_reply: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
  };

  mockInteractions.push(newInteraction);
  return mockSupabaseResponse(newInteraction);
};

export const getInteractionsByProject = async (projectId, type = null) => {
  await mockDelay();

  let interactions = mockInteractions.filter(
    (i) => i.project_id === projectId && !i.deleted_at
  );

  if (type) {
    interactions = interactions.filter((i) => i.type === type);
  }

  interactions = interactions.map((i) => ({
    ...i,
    user: findById(mockProfiles, i.user_id),
    replies: mockInteractions.filter((r) => r.parent_id === i.id),
  }));

  return mockSupabaseResponse(interactions);
};

export const getComments = async (projectId) => {
  return getInteractionsByProject(projectId, "comment");
};

export const getQA = async (projectId) => {
  return getInteractionsByProject(projectId, "question");
};

export const getInteractionById = async (id) => {
  await mockDelay();

  const interaction = findById(mockInteractions, id);
  if (!interaction) {
    return mockSupabaseResponse(null, { message: "Interaction not found" });
  }

  return mockSupabaseResponse({
    ...interaction,
    user: findById(mockProfiles, interaction.user_id),
  });
};

export const updateInteraction = async (id, updates) => {
  await mockDelay();

  const index = mockInteractions.findIndex((i) => i.id === id);
  if (index === -1) {
    return mockSupabaseResponse(null, { message: "Interaction not found" });
  }

  mockInteractions[index] = {
    ...mockInteractions[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };

  return mockSupabaseResponse(mockInteractions[index]);
};

export const deleteInteraction = async (id) => {
  return updateInteraction(id, { deleted_at: new Date().toISOString() });
};

export const replyToInteraction = async (replyData, userId) => {
  await mockDelay();

  const parent = findById(mockInteractions, replyData.parent_id);
  if (!parent) {
    return mockSupabaseResponse(null, {
      message: "Parent interaction not found",
    });
  }

  const newReply = {
    id: "mock-" + Date.now(),
    ...replyData,
    user_id: userId,
    type: parent.type === "question" ? "answer" : "comment",
    is_creator_reply: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
  };

  mockInteractions.push(newReply);
  return mockSupabaseResponse(newReply);
};
