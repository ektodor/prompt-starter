export const rewardKeys = {
  all: ["RewardById"],
  detail: (id) => [...rewardKeys.all, id],
};
