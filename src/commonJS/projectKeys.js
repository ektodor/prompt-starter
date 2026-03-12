export const projectKeys = {
  all: ["ProjectById"],
  detail: (id) => [...projectKeys.all, id],
};
