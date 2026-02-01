/**
 * Project Detail Data Transformer
 * 將資料庫格式轉換為 ProductDetail 頁面期望的格式
 */

import dayjs from 'dayjs';

/**
 * 將資料庫的專案資料轉換為 ProductDetailCard 格式
 * @param {Object} project - 資料庫查詢的專案資料
 * @returns {Object} ProductDetailCard 格式的資料
 */
export const transformToProductDetailCard = (project) => {
    if (!project) return null;

    return {
        img: project.cover_image_url || '',
        tag: project.project_tags?.map(pt => ({
            id: pt.tags?.id || '',
            tag: pt.tags?.tag_name || ''
        })) || [],
        title: project.title || '',
        owner: project.owner_name || project.creator?.display_name || '',
        targetCrowdfundingAmount: project.goal_amount || 0,
        currentCrowdfundingAmount: project.current_amount || 0,
        donors: project.backers_count || 0,
        introduction: project.tagline || '',
        crowdfundingStartDate: formatDateTime(project.start_date),
        crowdfundingEndDate: formatDateTime(project.end_date),
        socialMedia: transformSocialMedia(project.social_media)
    };
};

/**
 * 將資料庫的 detail_sections 轉換為 ProductDetailItem 格式
 * @param {Array} sections - 資料庫查詢的詳細區塊陣列
 * @returns {Array} ProductDetailItem 格式的陣列
 */
export const transformToProductDetails = (sections) => {
    if (!sections || !Array.isArray(sections)) return [];

    return sections.map(section => ({
        id: section.id,
        title: section.title || '',
        detailsImg: section.images?.map(img => ({
            id: img.id,
            img: img.image_url,
            alt: img.alt_text || ''
        })) || [],
        productIntroduction: section.paragraphs?.map(p => ({
            id: p.id,
            introduction: p.content
        })) || [],
        productContents: section.content_groups?.map(group => ({
            id: group.id,
            group: group.group_name,
            groupIcon: group.group_icon_url || '',
            tree: buildContentTree(group.items || [])
        })) || [],
        emphasizeContent: section.highlights?.map(h => ({
            id: h.id,
            icon: h.icon_url,
            iconAlt: h.icon_url ? 'icon' : '',
            emoji: h.emoji,
            content: h.content
        })) || []
    }));
};

/**
 * 將資料庫的風險與挑戰轉換為頁面格式
 * @param {string} risksText - 資料庫的風險與挑戰文字
 * @returns {Object} 風險與挑戰物件
 */
export const transformRisksAndChallenges = (risksText) => {
    if (!risksText) {
        return {
            id: 'risks-1',
            title: '風險與挑戰',
            content: '本專案目前沒有特別的風險與挑戰說明。'
        };
    }

    return {
        id: 'risks-1',
        title: '風險與挑戰',
        content: risksText
    };
};

/**
 * 建立樹狀結構
 * @param {Array} items - 扁平化的項目陣列
 * @returns {Array} 樹狀結構陣列
 */
const buildContentTree = (items) => {
    if (!items || !Array.isArray(items)) return [];

    const itemMap = new Map();
    const roots = [];

    // 先建立所有項目的 map
    items.forEach(item => {
        itemMap.set(item.id, {
            id: item.id,
            content: item.content,
            details: []
        });
    });

    // 建立樹狀結構
    items
        .sort((a, b) => a.display_order - b.display_order)
        .forEach(item => {
            const node = itemMap.get(item.id);
            if (item.parent_id) {
                const parent = itemMap.get(item.parent_id);
                if (parent) {
                    parent.details.push(node);
                } else {
                    // 如果找不到父項目，當作根項目
                    roots.push(node);
                }
            } else {
                roots.push(node);
            }
        });

    return roots;
};

/**
 * 轉換社群媒體格式
 * @param {Array} socialMedia - 資料庫的社群媒體陣列
 * @returns {Array} 頁面期望的社群媒體格式
 */
const transformSocialMedia = (socialMedia) => {
    if (!socialMedia || !Array.isArray(socialMedia)) return [];

    const iconMap = {
        facebook: './icons/facebook.svg',
        instagram: './icons/instagram.svg',
        threads: './icons/threads.svg',
        twitter: './icons/twitter-x.svg',
        x: './icons/twitter-x.svg',
        email: './icons/mail.svg',
        mail: './icons/mail.svg'
    };

    return socialMedia
        .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
        .map((sm, index) => ({
            id: String(index + 1).padStart(2, '0'),
            name: sm.platform,
            img: iconMap[sm.platform.toLowerCase()] || './icons/link.svg',
            to: sm.url || ''
        }));
};

/**
 * 格式化日期時間
 * @param {string} dateString - ISO 日期字串
 * @returns {string} 格式化後的日期時間字串
 */
const formatDateTime = (dateString) => {
    if (!dateString) return '';

    return dayjs(dateString).format('YYYY/MM/DD HH:mm');
};

/**
 * 計算剩餘天數
 * @param {string} endDate - 結束日期
 * @returns {number} 剩餘天數
 */
export const calculateDaysLeft = (endDate) => {
    if (!endDate) return 0;

    const now = dayjs();
    const end = dayjs(endDate);
    const days = end.diff(now, 'day');

    return days > 0 ? days : 0;
};

/**
 * 計算達成百分比
 * @param {number} currentAmount - 當前金額
 * @param {number} goalAmount - 目標金額
 * @returns {number} 達成百分比
 */
export const calculateFundingPercentage = (currentAmount, goalAmount) => {
    if (!goalAmount || goalAmount === 0) return 0;

    return Math.round((currentAmount / goalAmount) * 100);
};

/**
 * 格式化千分位數字
 * @param {number} num - 數字
 * @returns {string} 格式化後的字串
 */
export const formatThousands = (num) => {
    if (!num && num !== 0) return '0';

    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
