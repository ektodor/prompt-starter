const sortByOrder = (a, b) => (a.display_order || 0) - (b.display_order || 0);

const transformProjectDetail = (sections = []) =>
  sections
    .slice()
    .sort(sortByOrder)
    .map((cur) => ({
      id: cur.id,
      title: cur.title,

      detailsImg: (cur.images || [])
        .slice()
        .sort(sortByOrder)
        .map((i) => ({ id: i.id, img: i.image_url, alt: i.alt_text })),

      productIntroduction: (cur.paragraphs || [])
        .slice()
        .sort(sortByOrder)
        .map((i) => ({ id: i.id, introduction: i.content })),

      productContents: (cur.content_groups || []).map((group) => ({
        id: group.id,
        group: group.group_name,
        groupIcon: group.group_icon_url,
        tree: (group.items || [])
          .slice()
          .sort(sortByOrder)
          .map((item) => ({ id: item.id, content: item.content, details: [] })),
      })),

      emphasizeContent: (cur.highlights || [])
        .slice()
        .sort(sortByOrder)
        .map((i) => ({
          id: i.id,
          icon: i.icon_url,
          iconAlt: i.icon_url,
          emoji: i.emoji,
          content: i.content,
        })),
    }));

export const mapProject = (apiResponse) => {
  const data = apiResponse?.data;
  console.log("data", data);

  if (!data) return null;

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    ownerName: data.owner_name,
    risksAndChallenges: data.risks_and_challenges,

    detailSections: transformProjectDetail(data.detail_sections),

    rewardTiers: (data.reward_tiers || []).slice().sort(sortByOrder),
  };
};
