// Mock Data Generator
// 生成符合 Supabase 格式的假資料

const generateDate = (daysAgo = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

// ============================================
// 固定的 Mock ID（確保資料一致性）
// ============================================
const MOCK_IDS = {
  users: {
    admin: "11111111-1111-4111-a111-111111111111",
    creator1: "22222222-2222-4222-a222-222222222222",
    creator2: "33333333-3333-4333-a333-333333333333",
    user1: "44444444-4444-4444-a444-444444444444",
    user2: "55555555-5555-4555-a555-555555555555",
  },
  tags: {
    technology: "66666666-6666-4666-a666-666666666666",
    design: "77777777-7777-4777-a777-777777777777",
    sustainability: "88888888-8888-4888-a888-888888888888",
    education: "99999999-9999-4999-a999-999999999999",
    lifestyle: "aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa",
    art: "bbbbbbbb-bbbb-4bbb-abbb-bbbbbbbbbbbb",
    music: "cccccccc-cccc-4ccc-accc-cccccccccccc",
    film: "dddddddd-dddd-4ddd-addd-dddddddddddd",
  },
  projects: {
    aiSpeaker: "eeeeeeee-eeee-4eee-aeee-eeeeeeeeeeee",
    ecoTableware: "ffffffff-ffff-4fff-afff-ffffffffffff",
    plantMonitor: "00000000-0000-4000-a000-000000000000",
  },
  rewards: {
    aiSpeakerEarlyBird: "10101010-1010-4010-a010-101010101010",
    aiSpeakerNormal: "20202020-2020-4020-a020-202020202020",
    ecoSingle: "30303030-3030-4030-a030-303030303030",
    ecoFamily: "40404040-4040-4040-a040-404040404040",
  },
  orders: {
    order1: "50505050-5050-4050-a050-505050505050",
    order2: "60606060-6060-4060-a060-606060606060",
    order3: "70707070-7070-4070-a070-707070707070",
  },
  favorites: {
    fav1: "80808080-8080-4080-a080-808080808080",
    fav2: "90909090-9090-4090-a090-909090909090",
    fav3: "a0a0a0a0-a0a0-40a0-a0a0-a0a0a0a0a0a0",
  },
  interactions: {
    int1: "b0b0b0b0-b0b0-40b0-a0b0-b0b0b0b0b0b0",
    int2: "c0c0c0c0-c0c0-40c0-a0c0-c0c0c0c0c0c0",
    int3: "d0d0d0d0-d0d0-40d0-a0d0-d0d0d0d0d0d0",
    int4: "e0e0e0e0-e0e0-40e0-a0e0-e0e0e0e0e0e0",
  },
};

// ============================================
// Mock Users/Profiles
// ============================================
export const mockProfiles = [
  {
    id: MOCK_IDS.users.admin,
    email: "admin@admin.com",
    display_name: "系統管理員",
    avatar_url: "https://i.pravatar.cc/150?img=1",
    bio: "平台管理員，負責審核專案和管理使用者",
    role: "admin",
    created_at: generateDate(365),
    updated_at: generateDate(1),
  },
  {
    id: MOCK_IDS.users.creator1,
    email: "creator1@example.com",
    display_name: "王小明",
    avatar_url: "https://i.pravatar.cc/150?img=2",
    bio: "科技創業者，專注於 AI 和物聯網產品開發",
    role: "creator",
    created_at: generateDate(180),
    updated_at: generateDate(5),
  },
  {
    id: MOCK_IDS.users.creator2,
    email: "creator2@example.com",
    display_name: "李美華",
    avatar_url: "https://i.pravatar.cc/150?img=3",
    bio: "設計師，熱愛創作有溫度的產品",
    role: "creator",
    created_at: generateDate(150),
    updated_at: generateDate(3),
  },
  {
    id: MOCK_IDS.users.user1,
    email: "user1@example.com",
    display_name: "張大同",
    avatar_url: "https://i.pravatar.cc/150?img=4",
    bio: "熱愛支持創新專案的贊助者",
    role: "user",
    created_at: generateDate(90),
    updated_at: generateDate(2),
  },
  {
    id: MOCK_IDS.users.user2,
    email: "user2@example.com",
    display_name: "陳小芳",
    avatar_url: "https://i.pravatar.cc/150?img=5",
    bio: "喜歡收藏有趣的設計商品",
    role: "user",
    created_at: generateDate(60),
    updated_at: generateDate(1),
  },
];

// ============================================
// Mock Tags
// ============================================
export const mockTags = [
  {
    id: MOCK_IDS.tags.technology,
    tag_name: "科技創新",
    slug: "technology",
    description: "科技創新產品",
    icon_url: null,
    created_at: generateDate(365),
  },
  {
    id: MOCK_IDS.tags.design,
    tag_name: "設計",
    slug: "design",
    description: "設計與創意商品",
    icon_url: null,
    created_at: generateDate(365),
  },
  {
    id: MOCK_IDS.tags.sustainability,
    tag_name: "環保永續",
    slug: "sustainability",
    description: "環保與永續發展",
    icon_url: null,
    created_at: generateDate(365),
  },
  {
    id: MOCK_IDS.tags.education,
    tag_name: "教育學習",
    slug: "education",
    description: "教育與學習相關專案",
    icon_url: null,
    created_at: generateDate(365),
  },
  {
    id: MOCK_IDS.tags.lifestyle,
    tag_name: "生活風格",
    slug: "lifestyle",
    description: "生活風格與品味",
    icon_url: null,
    created_at: generateDate(365),
  },
  {
    id: MOCK_IDS.tags.art,
    tag_name: "藝術",
    slug: "art",
    description: "藝術與文化專案",
    icon_url: null,
    created_at: generateDate(365),
  },
  {
    id: MOCK_IDS.tags.music,
    tag_name: "音樂",
    slug: "music",
    description: "音樂創作與專輯",
    icon_url: null,
    created_at: generateDate(365),
  },
  {
    id: MOCK_IDS.tags.film,
    tag_name: "影視",
    slug: "film",
    description: "影視製作專案",
    icon_url: null,
    created_at: generateDate(365),
  },
];

// ============================================
// Mock Projects
// ============================================
export const mockProjects = [
  {
    id: MOCK_IDS.projects.aiSpeaker,
    creator_id: MOCK_IDS.users.creator1,
    category_id: MOCK_IDS.tags.technology,
    title: "AI 智慧音箱 - 你的生活助手",
    slug: "ai-smart-speaker",
    tagline: "讓生活更智慧，語音控制一切",
    description:
      "結合最新 AI 技術的智慧音箱，支援中文語音辨識、智慧家居控制、音樂播放等功能。",
    cover_image_url: "https://picsum.photos/800/600?random=1",
    video_url: null,
    goal_amount: 500000,
    current_amount: 385000,
    currency: "TWD",
    backers_count: 156,
    start_date: generateDate(30),
    end_date: generateDate(-30),
    status: "active",
    introduction: "這是一款專為台灣使用者設計的 AI 智慧音箱...",
    declaration: "本專案承諾按時交付產品...",
    creator_intro: "我們是一群熱愛科技的工程師...",
    refund_policy: "若專案未達標，全額退款",
    customer_service: "support@example.com",
    owner_name: "王小明",
    social_media: [
      {
        platform: "facebook",
        url: "https://facebook.com/aispeaker",
        display_order: 1,
      },
      {
        platform: "instagram",
        url: "https://instagram.com/aispeaker",
        display_order: 2,
      },
    ],
    created_at: generateDate(30),
    updated_at: generateDate(1),
    deleted_at: null,
  },
  {
    id: MOCK_IDS.projects.ecoTableware,
    creator_id: MOCK_IDS.users.creator2,
    category_id: MOCK_IDS.tags.design,
    title: "環保竹纖維餐具組",
    slug: "eco-bamboo-tableware",
    tagline: "愛地球，從每一餐開始",
    description: "100% 天然竹纖維製作，可分解、環保、耐用的餐具組合。",
    cover_image_url: "https://picsum.photos/800/600?random=2",
    video_url: null,
    goal_amount: 200000,
    current_amount: 245000,
    currency: "TWD",
    backers_count: 98,
    start_date: generateDate(45),
    end_date: generateDate(-15),
    status: "active",
    introduction: "減少塑膠使用，選擇環保餐具...",
    declaration: "所有產品通過 SGS 檢驗...",
    creator_intro: "我是一位環保設計師...",
    refund_policy: "7 天鑑賞期",
    customer_service: "eco@example.com",
    owner_name: "李美華",
    social_media: [
      {
        platform: "instagram",
        url: "https://instagram.com/ecotableware",
        display_order: 1,
      },
    ],
    created_at: generateDate(45),
    updated_at: generateDate(2),
    deleted_at: null,
  },
  {
    id: MOCK_IDS.projects.plantMonitor,
    creator_id: MOCK_IDS.users.creator1,
    category_id: MOCK_IDS.tags.technology,
    title: "智慧植栽監測器",
    slug: "smart-plant-monitor",
    tagline: "讓植物告訴你它需要什麼",
    description:
      "透過感測器即時監測土壤濕度、光照、溫度，手機 App 提醒澆水時機。",
    cover_image_url: "https://picsum.photos/800/600?random=3",
    video_url: null,
    goal_amount: 300000,
    current_amount: 125000,
    currency: "TWD",
    backers_count: 45,
    start_date: generateDate(15),
    end_date: generateDate(-45),
    status: "active",
    introduction: "照顧植物不再困難...",
    declaration: "預計 3 個月內出貨...",
    creator_intro: "結合科技與園藝的團隊...",
    refund_policy: "未達標全額退款",
    customer_service: "plant@example.com",
    owner_name: "王小明",
    social_media: [],
    created_at: generateDate(15),
    updated_at: generateDate(1),
    deleted_at: null,
  },
];

// ============================================
// Mock Reward Tiers
// ============================================
export const mockRewardTiers = [
  {
    id: MOCK_IDS.rewards.aiSpeakerEarlyBird,
    project_id: MOCK_IDS.projects.aiSpeaker,
    title: "超級早鳥優惠",
    subtitle: "限量 50 組",
    description: "包含 AI 智慧音箱 x 1",
    amount: 2980,
    list_price: 4980,
    total_quantity: 50,
    claimed_quantity: 48,
    estimated_delivery_date: "2026-06-01",
    shipping_info: "台灣本島免運",
    display_order: 1,
    is_available: true,
    cover_image_url: "https://picsum.photos/400/300?random=11",
    recommended_to: "想搶先體驗的早鳥支持者",
    created_at: generateDate(30),
    updated_at: generateDate(5),
  },
  {
    id: MOCK_IDS.rewards.aiSpeakerNormal,
    project_id: MOCK_IDS.projects.aiSpeaker,
    title: "一般方案",
    subtitle: null,
    description: "包含 AI 智慧音箱 x 1 + 專屬貼紙",
    amount: 3480,
    list_price: 4980,
    total_quantity: 200,
    claimed_quantity: 108,
    estimated_delivery_date: "2026-06-01",
    shipping_info: "台灣本島免運",
    display_order: 2,
    is_available: true,
    cover_image_url: "https://picsum.photos/400/300?random=12",
    recommended_to: "一般支持者",
    created_at: generateDate(30),
    updated_at: generateDate(3),
  },
  {
    id: MOCK_IDS.rewards.ecoSingle,
    project_id: MOCK_IDS.projects.ecoTableware,
    title: "單人餐具組",
    subtitle: "環保首選",
    description: "包含筷子、湯匙、叉子各 1",
    amount: 580,
    list_price: 880,
    total_quantity: null,
    claimed_quantity: 45,
    estimated_delivery_date: "2026-05-01",
    shipping_info: "台灣本島免運",
    display_order: 1,
    is_available: true,
    cover_image_url: "https://picsum.photos/400/300?random=13",
    recommended_to: "個人使用者",
    created_at: generateDate(45),
    updated_at: generateDate(2),
  },
  {
    id: MOCK_IDS.rewards.ecoFamily,
    project_id: MOCK_IDS.projects.ecoTableware,
    title: "家庭餐具組",
    subtitle: "超值組合",
    description: "包含 4 人份完整餐具 + 收納盒",
    amount: 1980,
    list_price: 2980,
    total_quantity: 100,
    claimed_quantity: 53,
    estimated_delivery_date: "2026-05-01",
    shipping_info: "台灣本島免運",
    display_order: 2,
    is_available: true,
    cover_image_url: "https://picsum.photos/400/300?random=14",
    recommended_to: "家庭使用者",
    created_at: generateDate(45),
    updated_at: generateDate(1),
  },
];

// ============================================
// Mock Orders
// ============================================
export const mockOrders = [
  {
    id: MOCK_IDS.orders.order1,
    user_id: MOCK_IDS.users.user1,
    project_id: MOCK_IDS.projects.aiSpeaker,
    reward_tier_id: MOCK_IDS.rewards.aiSpeakerEarlyBird,
    amount: 2980,
    currency: "TWD",
    status: "paid",
    shipping_name: "張大同",
    shipping_email: "user1@example.com",
    shipping_phone: "0912345678",
    shipping_address: "台北市信義區信義路五段 7 號",
    payment_method: "credit_card",
    payment_transaction_id: "TXN" + Date.now(),
    paid_at: generateDate(10),
    note: "請於下午配送",
    invoice_carrier: "/AB12345",
    created_at: generateDate(15),
    updated_at: generateDate(10),
  },
  {
    id: MOCK_IDS.orders.order2,
    user_id: MOCK_IDS.users.user2,
    project_id: MOCK_IDS.projects.ecoTableware,
    reward_tier_id: MOCK_IDS.rewards.ecoSingle,
    amount: 580,
    currency: "TWD",
    status: "paid",
    shipping_name: "陳小芳",
    shipping_email: "user2@example.com",
    shipping_phone: "0923456789",
    shipping_address: "新北市板橋區文化路一段 188 號",
    payment_method: "credit_card",
    payment_transaction_id: "TXN" + (Date.now() + 1000),
    paid_at: generateDate(5),
    note: null,
    invoice_carrier: null,
    created_at: generateDate(8),
    updated_at: generateDate(5),
  },
  {
    id: MOCK_IDS.orders.order3,
    user_id: MOCK_IDS.users.user1,
    project_id: MOCK_IDS.projects.ecoTableware,
    reward_tier_id: MOCK_IDS.rewards.ecoFamily,
    amount: 1980,
    currency: "TWD",
    status: "pending",
    shipping_name: "張大同",
    shipping_email: "user1@example.com",
    shipping_phone: "0912345678",
    shipping_address: "台北市信義區信義路五段 7 號",
    payment_method: null,
    payment_transaction_id: null,
    paid_at: null,
    note: "希望能盡快出貨",
    invoice_carrier: "/CD67890",
    created_at: generateDate(2),
    updated_at: generateDate(2),
  },
];

// ============================================
// Mock Favorites
// ============================================
export const mockFavorites = [
  {
    id: MOCK_IDS.favorites.fav1,
    user_id: MOCK_IDS.users.user1,
    project_id: MOCK_IDS.projects.aiSpeaker,
    created_at: generateDate(20),
  },
  {
    id: MOCK_IDS.favorites.fav2,
    user_id: MOCK_IDS.users.user1,
    project_id: MOCK_IDS.projects.plantMonitor,
    created_at: generateDate(10),
  },
  {
    id: MOCK_IDS.favorites.fav3,
    user_id: MOCK_IDS.users.user2,
    project_id: MOCK_IDS.projects.ecoTableware,
    created_at: generateDate(15),
  },
];

// ============================================
// Mock Interactions
// ============================================
export const mockInteractions = [
  {
    id: MOCK_IDS.interactions.int1,
    project_id: MOCK_IDS.projects.aiSpeaker,
    user_id: MOCK_IDS.users.user1,
    parent_id: null,
    type: "comment",
    content: "這個產品看起來很棒！期待上市！",
    is_creator_reply: false,
    created_at: generateDate(12),
    updated_at: generateDate(12),
    deleted_at: null,
  },
  {
    id: MOCK_IDS.interactions.int2,
    project_id: MOCK_IDS.projects.aiSpeaker,
    user_id: MOCK_IDS.users.creator1,
    parent_id: MOCK_IDS.interactions.int1,
    type: "comment",
    content: "謝謝支持！我們會努力的！",
    is_creator_reply: true,
    created_at: generateDate(11),
    updated_at: generateDate(11),
    deleted_at: null,
  },
  {
    id: MOCK_IDS.interactions.int3,
    project_id: MOCK_IDS.projects.aiSpeaker,
    user_id: MOCK_IDS.users.user2,
    parent_id: null,
    type: "question",
    content: "請問支援哪些智慧家居品牌？",
    is_creator_reply: false,
    created_at: generateDate(8),
    updated_at: generateDate(8),
    deleted_at: null,
  },
  {
    id: MOCK_IDS.interactions.int4,
    project_id: MOCK_IDS.projects.aiSpeaker,
    user_id: MOCK_IDS.users.creator1,
    parent_id: MOCK_IDS.interactions.int3,
    type: "answer",
    content: "目前支援小米、Philips Hue、TP-Link 等主流品牌",
    is_creator_reply: true,
    created_at: generateDate(7),
    updated_at: generateDate(7),
    deleted_at: null,
  },
];

// ============================================
// Mock Project Tags (關聯表)
// ============================================
export const mockProjectTags = [
  {
    project_id: MOCK_IDS.projects.aiSpeaker,
    tag_id: MOCK_IDS.tags.technology,
    created_at: generateDate(30),
  },
  {
    project_id: MOCK_IDS.projects.aiSpeaker,
    tag_id: MOCK_IDS.tags.lifestyle,
    created_at: generateDate(30),
  },
  {
    project_id: MOCK_IDS.projects.ecoTableware,
    tag_id: MOCK_IDS.tags.design,
    created_at: generateDate(45),
  },
  {
    project_id: MOCK_IDS.projects.ecoTableware,
    tag_id: MOCK_IDS.tags.sustainability,
    created_at: generateDate(45),
  },
  {
    project_id: MOCK_IDS.projects.ecoTableware,
    tag_id: MOCK_IDS.tags.lifestyle,
    created_at: generateDate(45),
  },
  {
    project_id: MOCK_IDS.projects.plantMonitor,
    tag_id: MOCK_IDS.tags.technology,
    created_at: generateDate(15),
  },
  {
    project_id: MOCK_IDS.projects.plantMonitor,
    tag_id: MOCK_IDS.tags.sustainability,
    created_at: generateDate(15),
  },
];

// ============================================
// Helper Functions
// ============================================

/**
 * 模擬 Supabase 回應格式
 */
export const mockSupabaseResponse = (data, error = null) => {
  return { data, error };
};

/**
 * 模擬延遲（讓 API 呼叫更真實）
 */
export const mockDelay = (ms = 300) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * 根據 ID 查找資料
 */
export const findById = (array, id) => {
  return array.find((item) => item.id === id) || null;
};

/**
 * 根據條件篩選資料
 */
export const filterBy = (array, filters) => {
  return array.filter((item) => {
    return Object.keys(filters).every((key) => {
      if (filters[key] === undefined || filters[key] === null) return true;
      return item[key] === filters[key];
    });
  });
};
