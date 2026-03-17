import { sortListByOrder } from "@/commonJS/sort";
import { transformTree } from "@/commonJS/transformTree";

const transformPackageContents = (contentGroups = []) =>
  sortListByOrder(contentGroups).map((group) => ({
    id: group.id,
    group: group.group_name,
    tree: transformTree(group.items),
  }));

const transformEmphasizeContent = (highlights = []) =>
  sortListByOrder(highlights).map((item) => ({
    id: item.id,
    emoji: item.emoji,
    content: item.content,
  }));

const transformReward = (section = {}) => ({
  id: section.id,
  cardImg: section.cover_image_url,
  imgAlt: section.cover_image_alt,
  title: section.title,
  subtitle: section.subtitle,
  sellingPrice: section.amount,
  listPrice: section.list_price,
  sponsored: section.claimed_quantity,
  sponsorshipsAvailable: section.total_quantity,
  packageContents: transformPackageContents(section.package_groups),
  recommendedTo: section.recommended_to,
  emphasizeContent: transformEmphasizeContent(section.highlights),
  estimatedDelivery: section.estimated_delivery_date,
});

const transformRewardData = (data = []) =>
  sortListByOrder(data).map(transformReward);

export const mapReward = (apiResponse) => {
  const data = apiResponse?.data;

  console.log("reward data", data);
  console.log("transform reward data", transformRewardData(data));

  if (!data) return null;

  return {
    rewardData: transformRewardData(data),
  };
};
