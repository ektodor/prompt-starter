import { sortListByOrder } from "@/commonJS/sort";
import { formatDateTime } from "@/commonJS/formatDate";
import { transformTree } from "@/commonJS/transformTree";

const defaultSocialMedia = [
  { id: "01", name: "facebook", img: "./icons/facebook.svg", to: "" },
  { id: "02", name: "instagram", img: "./icons/instagram.svg", to: "" },
  { id: "03", name: "threads", img: "./icons/threads.svg", to: "" },
  { id: "04", name: "x", img: "./icons/twitter-x.svg", to: "" },
  { id: "05", name: "mail", img: "./icons/mail.svg", to: "" },
];

const transformProjectTags = (projectTags = []) =>
  projectTags.map((item, index) => ({
    id: item?.tags?.id || `tag-${index}`,
    tag: item?.tags?.tag_name || "",
  }));

const transformDetailsImg = (images = []) =>
  sortListByOrder(images).map((item) => ({
    id: item.id,
    img: item.image_url,
    alt: item.alt_text,
  }));

const transformProductIntroduction = (paragraphs = []) =>
  sortListByOrder(paragraphs).map((item) => ({
    id: item.id,
    introduction: item.content,
  }));

const transformProductContents = (contentGroups = []) =>
  sortListByOrder(contentGroups).map((group) => ({
    id: group.id,
    group: group.group_name,
    groupIcon: group.group_icon_url,
    tree: transformTree(group.items),
  }));

const transformEmphasizeContent = (highlights = []) =>
  sortListByOrder(highlights).map((item) => ({
    id: item.id,
    icon: item.icon_url,
    iconAlt: item.content || "",
    emoji: item.emoji,
    content: item.content,
  }));

const transformProductDetailCardInfo = (data = {}) => ({
  img: data.cover_image_url,
  tag: transformProjectTags(data.project_tags),
  title: data.title,
  owner: data.owner_name,
  targetCrowdfundingAmount: data.goal_amount,
  currentCrowdfundingAmount: data.current_amount,
  donors: data.backers_count,
  introduction: data.introduction,
  crowdfundingStartDate: formatDateTime(data.start_date),
  crowdfundingEndDate: formatDateTime(data.end_date),
  socialMedia: defaultSocialMedia,
});

const transformDetailSection = (section = {}) => ({
  id: section.id,
  title: section.title,
  detailsImg: transformDetailsImg(section.images),
  productIntroduction: transformProductIntroduction(section.paragraphs),
  productContents: transformProductContents(section.content_groups),
  emphasizeContent: transformEmphasizeContent(section.highlights),
});

const transformProjectDetail = (sections = []) =>
  sortListByOrder(sections).map(transformDetailSection);

const transformRewardTiers = (rewardTiers = []) => sortListByOrder(rewardTiers);

const transformBaseProjectInfo = (data = {}) => ({
  id: data.id,
  title: data.title,
  description: data.description,
  ownerName: data.owner_name,
  risksAndChallenges: data.risks_and_challenges,
});

export const mapProject = (apiResponse) => {
  const data = apiResponse?.data;

  if (!data) return null;

  return {
    ...transformBaseProjectInfo(data),
    productDetailCardInfo: transformProductDetailCardInfo(data),
    detailSections: transformProjectDetail(data.detail_sections),
    rewardTiers: transformRewardTiers(data.reward_tiers),
  };
};
