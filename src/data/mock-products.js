// PRODUCT_DETAILS （產品詳細說明）
export const mockProductDetails = [
  // AdPrompt Lab 產品詳情
  {
    id: "pd_001_001",
    project_id: "proj_001",
    title: "爆款 FB 廣告提示詞",
    display_order: 1,
    created_at: "2025-09-01 10:00:00",
    updated_at: "2025-11-07 15:30:00",
  },
  {
    id: "pd_001_002",
    project_id: "proj_001",
    title: "高轉換 EDM 文案模組",
    display_order: 2,
    created_at: "2025-09-01 10:00:00",
    updated_at: "2025-11-07 15:30:00",
  },
  {
    id: "pd_001_003",
    project_id: "proj_001",
    title: "高互動 IG Caption 提示包",
    display_order: 3,
    created_at: "2025-09-01 10:00:00",
    updated_at: "2025-11-07 15:30:00",
  },

  // ChefMate 產品詳情
  {
    id: "pd_002_001",
    project_id: "proj_002",
    title: "AI 食材辨識技術",
    display_order: 1,
    created_at: "2025-09-15 14:20:00",
    updated_at: "2025-11-07 10:15:00",
  },
  {
    id: "pd_002_002",
    project_id: "proj_002",
    title: "智能食譜推薦系統",
    display_order: 2,
    created_at: "2025-09-15 14:20:00",
    updated_at: "2025-11-07 10:15:00",
  },
  {
    id: "pd_002_003",
    project_id: "proj_002",
    title: "營養分析儀表板",
    display_order: 3,
    created_at: "2025-09-15 14:20:00",
    updated_at: "2025-11-07 10:15:00",
  },

  // EcoWear 產品詳情
  {
    id: "pd_003_001",
    project_id: "proj_003",
    title: "海洋再生纖維技術",
    display_order: 1,
    created_at: "2025-08-01 09:00:00",
    updated_at: "2025-11-07 16:45:00",
  },
  {
    id: "pd_003_002",
    project_id: "proj_003",
    title: "永續製程與碳足跡",
    display_order: 2,
    created_at: "2025-08-01 09:00:00",
    updated_at: "2025-11-07 16:45:00",
  },
  {
    id: "pd_003_003",
    project_id: "proj_003",
    title: "時尚設計理念",
    display_order: 3,
    created_at: "2025-08-01 09:00:00",
    updated_at: "2025-11-07 16:45:00",
  },

  // UrbanGarden 產品詳情
  {
    id: "pd_004_001",
    project_id: "proj_004",
    title: "智能種植系統",
    display_order: 1,
    created_at: "2025-10-01 11:00:00",
    updated_at: "2025-11-07 09:20:00",
  },
  {
    id: "pd_004_002",
    project_id: "proj_004",
    title: "自動化管理功能",
    display_order: 2,
    created_at: "2025-10-01 11:00:00",
    updated_at: "2025-11-07 09:20:00",
  },
  {
    id: "pd_004_003",
    project_id: "proj_004",
    title: "環境監控技術",
    display_order: 3,
    created_at: "2025-10-01 11:00:00",
    updated_at: "2025-11-07 09:20:00",
  },

  // SleepWell 產品詳情
  {
    id: "pd_005_001",
    project_id: "proj_005",
    title: "睡眠追蹤技術",
    display_order: 1,
    created_at: "2025-08-20 10:00:00",
    updated_at: "2025-11-07 14:10:00",
  },
  {
    id: "pd_005_002",
    project_id: "proj_005",
    title: "AI 睡眠分析",
    display_order: 2,
    created_at: "2025-08-20 10:00:00",
    updated_at: "2025-11-07 14:10:00",
  },
  {
    id: "pd_005_003",
    project_id: "proj_005",
    title: "個人化改善方案",
    display_order: 3,
    created_at: "2025-08-20 10:00:00",
    updated_at: "2025-11-07 14:10:00",
  },
];

// PRODUCT_DETAIL_IMAGES（產品圖片）
export const mockProductDetailImages = [
  // pd_001_001 圖片
  {
    id: 1,
    detail_id: "pd_001_001",
    image_path: "./images/productDetail/fb-ad.webp",
    alt_text: "fb-ad",
    display_order: 1,
  },
  {
    id: 2,
    detail_id: "pd_001_001",
    image_path: "./images/productDetail/fb-ad-example.webp",
    alt_text: "fb-ad-example",
    display_order: 2,
  },

  // pd_001_002 圖片
  {
    id: 3,
    detail_id: "pd_001_002",
    image_path: "./images/productDetail/enewsletter.webp",
    alt_text: "enewsletter",
    display_order: 1,
  },

  // pd_001_003 圖片
  {
    id: 4,
    detail_id: "pd_001_003",
    image_path: "./images/productDetail/ig-post.webp",
    alt_text: "ig-post",
    display_order: 1,
  },
  {
    id: 5,
    detail_id: "pd_001_003",
    image_path: "./images/productDetail/social-media.webp",
    alt_text: "social-media",
    display_order: 2,
  },

  // pd_002_001 圖片
  {
    id: 6,
    detail_id: "pd_002_001",
    image_path: "./images/chefmate/ai-recognition.webp",
    alt_text: "ai-recognition",
    display_order: 1,
  },
  {
    id: 7,
    detail_id: "pd_002_001",
    image_path: "./images/chefmate/camera-module.webp",
    alt_text: "camera-module",
    display_order: 2,
  },

  // pd_002_002 圖片
  {
    id: 8,
    detail_id: "pd_002_002",
    image_path: "./images/chefmate/recipe-interface.webp",
    alt_text: "recipe-interface",
    display_order: 1,
  },
  {
    id: 9,
    detail_id: "pd_002_002",
    image_path: "./images/chefmate/recipe-list.webp",
    alt_text: "recipe-list",
    display_order: 2,
  },

  // pd_002_003 圖片
  {
    id: 10,
    detail_id: "pd_002_003",
    image_path: "./images/chefmate/nutrition-dashboard.webp",
    alt_text: "nutrition-dashboard",
    display_order: 1,
  },

  // pd_003_001 圖片
  {
    id: 11,
    detail_id: "pd_003_001",
    image_path: "./images/ecowear/ocean-plastic.webp",
    alt_text: "ocean-plastic",
    display_order: 1,
  },
  {
    id: 12,
    detail_id: "pd_003_001",
    image_path: "./images/ecowear/fiber-process.webp",
    alt_text: "fiber-process",
    display_order: 2,
  },
  {
    id: 13,
    detail_id: "pd_003_001",
    image_path: "./images/ecowear/fabric-texture.webp",
    alt_text: "fabric-texture",
    display_order: 3,
  },

  // pd_003_002 圖片
  {
    id: 14,
    detail_id: "pd_003_002",
    image_path: "./images/ecowear/sustainable-factory.webp",
    alt_text: "sustainable-factory",
    display_order: 1,
  },
  {
    id: 15,
    detail_id: "pd_003_002",
    image_path: "./images/ecowear/carbon-footprint.webp",
    alt_text: "carbon-footprint",
    display_order: 2,
  },

  // pd_003_003 圖片
  {
    id: 16,
    detail_id: "pd_003_003",
    image_path: "./images/ecowear/design-sketch.webp",
    alt_text: "design-sketch",
    display_order: 1,
  },
  {
    id: 17,
    detail_id: "pd_003_003",
    image_path: "./images/ecowear/fashion-show.webp",
    alt_text: "fashion-show",
    display_order: 2,
  },

  // pd_004_001 圖片
  {
    id: 18,
    detail_id: "pd_004_001",
    image_path: "./images/urbangarden/system-overview.webp",
    alt_text: "system-overview",
    display_order: 1,
  },
  {
    id: 19,
    detail_id: "pd_004_001",
    image_path: "./images/urbangarden/planting-box.webp",
    alt_text: "planting-box",
    display_order: 2,
  },

  // pd_004_002 圖片
  {
    id: 20,
    detail_id: "pd_004_002",
    image_path: "./images/urbangarden/auto-watering.webp",
    alt_text: "auto-watering",
    display_order: 1,
  },
  {
    id: 21,
    detail_id: "pd_004_002",
    image_path: "./images/urbangarden/app-control.webp",
    alt_text: "app-control",
    display_order: 2,
  },

  // pd_004_003 圖片
  {
    id: 22,
    detail_id: "pd_004_003",
    image_path: "./images/urbangarden/sensors.webp",
    alt_text: "sensors",
    display_order: 1,
  },
  {
    id: 23,
    detail_id: "pd_004_003",
    image_path: "./images/urbangarden/monitoring.webp",
    alt_text: "monitoring",
    display_order: 2,
  },

  // pd_005_001 圖片
  {
    id: 24,
    detail_id: "pd_005_001",
    image_path: "./images/sleepwell/tracking.webp",
    alt_text: "tracking",
    display_order: 1,
  },
  {
    id: 25,
    detail_id: "pd_005_001",
    image_path: "./images/sleepwell/sleep-stages.webp",
    alt_text: "sleep-stages",
    display_order: 2,
  },

  // pd_005_002 圖片
  {
    id: 26,
    detail_id: "pd_005_002",
    image_path: "./images/sleepwell/ai-analysis.webp",
    alt_text: "ai-analysis",
    display_order: 1,
  },
  {
    id: 27,
    detail_id: "pd_005_002",
    image_path: "./images/sleepwell/report.webp",
    alt_text: "report",
    display_order: 2,
  },

  // pd_005_003 圖片
  {
    id: 28,
    detail_id: "pd_005_003",
    image_path: "./images/sleepwell/personalized-plan.webp",
    alt_text: "personalized-plan",
    display_order: 1,
  },
  {
    id: 29,
    detail_id: "pd_005_003",
    image_path: "./images/sleepwell/improvement.webp",
    alt_text: "improvement",
    display_order: 2,
  },
];

// PRODUCT_INTRODUCTIONS（產品介紹段落）
export const mockProductIntroductions = [
  // pd_001_001 介紹
  {
    id: 1,
    detail_id: "pd_001_001",
    introduction:
      "掌握 Facebook 廣告的第一步，是寫出能吸引點擊、驅動行動的好文案。這套提示詞模組，幫你快速寫出「看了就想點」、「點了就想買」的文案內容！",
    display_order: 1,
  },

  // pd_001_002 介紹
  {
    id: 2,
    detail_id: "pd_001_002",
    introduction:
      "電子報是品牌經營的隱形王牌。這套提示詞系統根據行銷節點（如新品上市、週年慶、限時折扣等）精準分類，讓你快速產出具吸引力的主旨行、開場句與轉換導向的內容架構，大幅提升開信率與點擊率。",
    display_order: 1,
  },
  {
    id: 3,
    detail_id: "pd_001_002",
    introduction:
      "Email 行銷雖然低調，但仍是「最有效的轉換利器」之一。用對文案，每封信都是一場銷售！",
    display_order: 2,
  },

  // pd_001_003 介紹
  {
    id: 4,
    detail_id: "pd_001_003",
    introduction:
      "Instagram 是品牌經營人設與互動的主場，Caption 不再只是附屬，而是吸引停留與互動的核心！",
    display_order: 1,
  },

  // pd_002_001 介紹
  {
    id: 5,
    detail_id: "pd_002_001",
    introduction:
      "ChefMate 採用最先進的深度學習影像辨識技術，能夠即時辨識超過 500 種常見食材。只需將手機對準食材，AI 就能立即告訴你這是什麼、新鮮度如何、適合做什麼料理。",
    display_order: 1,
  },
  {
    id: 6,
    detail_id: "pd_002_001",
    introduction:
      "更棒的是，系統會自動記錄你的冰箱存貨，在食材快過期前提醒你，並推薦最適合的料理方式，再也不浪費任何一份食材！",
    display_order: 2,
  },

  // pd_002_002 介紹
  {
    id: 7,
    detail_id: "pd_002_002",
    introduction:
      "根據你現有的食材、烹飪技巧、飲食偏好和時間限制，AI 會推薦最適合你的食譜。不管是 15 分鐘快手料理，還是週末的精緻大餐，ChefMate 都能給你最佳建議。",
    display_order: 1,
  },
  {
    id: 8,
    detail_id: "pd_002_002",
    introduction:
      "內建超過 1000 道經典食譜，涵蓋中式、西式、日式、韓式等多國料理，每道菜都有詳細的步驟說明和影片教學。",
    display_order: 2,
  },

  // pd_002_003 介紹
  {
    id: 9,
    detail_id: "pd_002_003",
    introduction:
      "每一道料理都會自動計算熱量、蛋白質、碳水化合物、脂肪等營養素，並提供視覺化的營養儀表板。讓你在享受美食的同時，也能輕鬆掌握每日營養攝取。",
    display_order: 1,
  },
  {
    id: 10,
    detail_id: "pd_002_003",
    introduction:
      "系統還能根據你的健康目標（如減重、增肌、控糖等），提供個人化的飲食建議和食譜推薦。",
    display_order: 2,
  },

  // pd_003_001 介紹
  {
    id: 11,
    detail_id: "pd_003_001",
    introduction:
      "我們的服飾採用創新的海洋再生纖維技術，將回收的海洋塑膠垃圾（主要是寶特瓶）經過專業清洗、分解、熔融、紡絲等多道工序，轉化為高品質的再生纖維。",
    display_order: 1,
  },
  {
    id: 12,
    detail_id: "pd_003_001",
    introduction:
      "這種纖維不僅擁有媲美原生纖維的舒適度和耐用性，更重要的是，每生產 1 公斤的海洋再生纖維，就能減少約 6 公斤的碳排放，並清理相當數量的海洋垃圾。",
    display_order: 2,
  },
  {
    id: 13,
    detail_id: "pd_003_001",
    introduction:
      "我們與台灣海洋保育組織合作，確保每一批原料都來自真實的海洋清理行動，讓每一件衣服都承載著對海洋的守護。",
    display_order: 3,
  },

  // pd_003_002 介紹
  {
    id: 14,
    detail_id: "pd_003_002",
    introduction:
      "EcoWear 的生產工廠採用 100% 再生能源供電，生產過程中的廢水經過多重過濾處理後再循環使用，達到零廢水排放。",
    display_order: 1,
  },
  {
    id: 15,
    detail_id: "pd_003_002",
    introduction:
      "我們追蹤每件產品從原料採購、生產製造、運輸配送到消費者手中的完整碳足跡，並通過購買碳權和植樹計畫實現碳中和。每件產品都附有專屬的碳足跡報告書。",
    display_order: 2,
  },

  // pd_003_003 介紹
  {
    id: 16,
    detail_id: "pd_003_003",
    introduction:
      "永續不應該是犧牲美感的藉口。我們的設計團隊由曾獲國際大獎的設計師領軍，將海洋元素融入現代極簡美學，創造出既時尚又環保的服飾系列。",
    display_order: 1,
  },
  {
    id: 17,
    detail_id: "pd_003_003",
    introduction:
      "每一件衣服都經過精心設計，注重剪裁和細節，讓穿著者不僅能展現個人風格，更能透過服裝傳遞對環境的關懷與承諾。",
    display_order: 2,
  },

  // pd_004_001 介紹
  {
    id: 18,
    detail_id: "pd_004_001",
    introduction:
      "UrbanGarden 智能種植系統整合了自動澆水、LED 生長燈、環境監測等多項技術，讓種菜變得像使用智慧家電一樣簡單。",
    display_order: 1,
  },
  {
    id: 19,
    detail_id: "pd_004_001",
    introduction:
      "系統會根據不同植物的需求自動調節水分、光照和養分，即使你出差旅遊也不用擔心植物缺水。真正做到「種下去就能長」！",
    display_order: 2,
  },

  // pd_004_002 介紹
  {
    id: 20,
    detail_id: "pd_004_002",
    introduction:
      "透過專屬 APP，你可以隨時隨地監控植物生長狀況，系統會在需要澆水、施肥或收成時主動通知你。",
    display_order: 1,
  },
  {
    id: 21,
    detail_id: "pd_004_002",
    introduction:
      "內建種植指南會根據季節推薦適合的蔬菜品種，並提供詳細的種植教學，讓新手也能快速上手。",
    display_order: 2,
  },

  // pd_004_003 介紹
  {
    id: 22,
    detail_id: "pd_004_003",
    introduction:
      "高精度感測器即時監測溫度、濕度、光照強度、土壤 pH 值等關鍵環境參數，確保植物在最適合的環境中生長。",
    display_order: 1,
  },
  {
    id: 23,
    detail_id: "pd_004_003",
    introduction:
      "所有數據都會上傳雲端並生成分析報告，幫助你了解不同環境條件對作物的影響，讓你越種越專業！",
    display_order: 2,
  },

  // pd_005_001 介紹
  {
    id: 24,
    detail_id: "pd_005_001",
    introduction:
      "SleepWell 採用先進的睡眠追蹤技術，透過手機內建感測器或穿戴裝置，精準記錄你的睡眠週期、翻身次數、呼吸頻率等數據。",
    display_order: 1,
  },
  {
    id: 25,
    detail_id: "pd_005_001",
    introduction:
      "無需額外購買硬體設備，只要將手機放在床邊，系統就能自動追蹤並分析你的睡眠狀況。",
    display_order: 2,
  },

  // pd_005_002 介紹
  {
    id: 26,
    detail_id: "pd_005_002",
    introduction:
      "AI 演算法會分析你的睡眠數據，找出影響睡眠品質的因素，例如：睡前使用手機時間過長、房間溫度不適、睡眠週期不規律等。",
    display_order: 1,
  },
  {
    id: 27,
    detail_id: "pd_005_002",
    introduction:
      "系統會生成詳細的睡眠品質報告，並提供視覺化圖表，讓你清楚了解自己的睡眠狀況趨勢。",
    display_order: 2,
  },

  // pd_005_003 介紹
  {
    id: 28,
    detail_id: "pd_005_003",
    introduction:
      "根據你的睡眠數據和生活習慣，AI 會為你量身打造專屬的睡眠改善計畫，包括：最佳就寢時間、睡前儀式建議、飲食調整、運動規劃等。",
    display_order: 1,
  },
  {
    id: 29,
    detail_id: "pd_005_003",
    introduction:
      "計畫會隨著你的執行狀況動態調整，確保每個建議都是最適合當下的你。持續使用 21 天，就能明顯感受到睡眠品質的提升！",
    display_order: 2,
  },
];

// PRODUCT_CONTENT_SECTIONS（產品內容結構）
export const mockProductContentSections = [
  // ========== pd_001_001: 爆款 FB 廣告提示詞 ==========
  // 群組：模組亮點
  {
    id: "pcs_001_001_g1",
    detail_id: "pd_001_001",
    parent_id: null,
    section_type: "group",
    group_name: "模組亮點",
    group_icon: "./icons/diamond_shine.svg",
    content: null,
    display_order: 1,
  },
  {
    id: "pcs_001_001_g1_c1",
    detail_id: "pd_001_001",
    parent_id: "pcs_001_001_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "超過 150 組高轉換提示詞，涵蓋促銷、品牌建立、產品導購等多種情境",
    display_order: 1,
  },
  {
    id: "pcs_001_001_g1_c2",
    detail_id: "pd_001_001",
    parent_id: "pcs_001_001_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content:
      "搭配 CTA（行動呼籲）詞庫，如：「現在就領取」、「僅限今天」、「馬上加入」",
    display_order: 2,
  },
  {
    id: "pcs_001_001_g1_c3",
    detail_id: "pd_001_001",
    parent_id: "pcs_001_001_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "提供「痛點＋解方」、「問題＋承諾」、「數字＋行動」等高效文案架構",
    display_order: 3,
  },

  // 群組：適用對象
  {
    id: "pcs_001_001_g2",
    detail_id: "pd_001_001",
    parent_id: null,
    section_type: "group",
    group_name: "適用對象",
    group_icon: "./icons/groups.svg",
    content: null,
    display_order: 2,
  },
  {
    id: "pcs_001_001_g2_c1",
    detail_id: "pd_001_001",
    parent_id: "pcs_001_001_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "廣告投手想提升 ROAS（投資報酬率）",
    display_order: 1,
  },
  {
    id: "pcs_001_001_g2_c2",
    detail_id: "pd_001_001",
    parent_id: "pcs_001_001_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "中小電商品牌主、自營老闆快速自產廣告文案",
    display_order: 2,
  },
  {
    id: "pcs_001_001_g2_c3",
    detail_id: "pd_001_001",
    parent_id: "pcs_001_001_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "無廣編背景的小編，靠提示詞也能產出高水準內容",
    display_order: 3,
  },

  // 群組：額外加值
  {
    id: "pcs_001_001_g3",
    detail_id: "pd_001_001",
    parent_id: null,
    section_type: "group",
    group_name: "額外加值",
    group_icon: "./icons/redeem.svg",
    content: null,
    display_order: 3,
  },
  {
    id: "pcs_001_001_g3_c1",
    detail_id: "pd_001_001",
    parent_id: "pcs_001_001_g3",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "附 Meta 官方建議的撰寫邏輯",
    display_order: 1,
  },
  {
    id: "pcs_001_001_g3_c2",
    detail_id: "pd_001_001",
    parent_id: "pcs_001_001_g3",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "免費附贈「廣告測試文案格式表」PDF，讓你 A/B 測試一次到位",
    display_order: 2,
  },

  // ========== pd_001_002: 高轉換 EDM 文案模組 ==========
  {
    id: "pcs_001_002_g1",
    detail_id: "pd_001_002",
    parent_id: null,
    section_type: "group",
    group_name: "模組亮點",
    group_icon: "./icons/diamond_shine.svg",
    content: null,
    display_order: 1,
  },
  {
    id: "pcs_001_002_g1_c1",
    detail_id: "pd_001_002",
    parent_id: "pcs_001_002_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "主旨行（Subject line）提升開信率",
    display_order: 1,
  },
  {
    id: "pcs_001_002_g1_c2",
    detail_id: "pd_001_002",
    parent_id: "pcs_001_002_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "第一段開場建立信任感",
    display_order: 2,
  },
  {
    id: "pcs_001_002_g1_c3",
    detail_id: "pd_001_002",
    parent_id: "pcs_001_002_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "中段鋪陳產品／優惠重點",
    display_order: 3,
  },
  {
    id: "pcs_001_002_g1_c4",
    detail_id: "pd_001_002",
    parent_id: "pcs_001_002_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "結尾 CTA 與品牌聯絡方式整合",
    display_order: 4,
  },

  {
    id: "pcs_001_002_g2",
    detail_id: "pd_001_002",
    parent_id: null,
    section_type: "group",
    group_name: "不同情境對應格式",
    group_icon: "./icons/scenario.svg",
    content: null,
    display_order: 2,
  },
  {
    id: "pcs_001_002_g2_c1",
    detail_id: "pd_001_002",
    parent_id: "pcs_001_002_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "📬 新品上架通知",
    display_order: 1,
  },
  {
    id: "pcs_001_002_g2_c2",
    detail_id: "pd_001_002",
    parent_id: "pcs_001_002_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "🎁 限時優惠推播",
    display_order: 2,
  },
  {
    id: "pcs_001_002_g2_c3",
    detail_id: "pd_001_002",
    parent_id: "pcs_001_002_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "🤝 用戶回購感謝信",
    display_order: 3,
  },
  {
    id: "pcs_001_002_g2_c4",
    detail_id: "pd_001_002",
    parent_id: "pcs_001_002_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "🎉 週年慶活動 EDM",
    display_order: 4,
  },

  // ========== pd_001_003: 高互動 IG Caption 提示包 ==========
  {
    id: "pcs_001_003_g1",
    detail_id: "pd_001_003",
    parent_id: null,
    section_type: "group",
    group_name: "模組亮點",
    group_icon: "./icons/diamond_shine.svg",
    content: null,
    display_order: 1,
  },
  {
    id: "pcs_001_003_g1_c1",
    detail_id: "pd_001_003",
    parent_id: "pcs_001_003_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "提供 100 組以上的高互動 caption 開頭句、引導互動詞、共鳴故事句",
    display_order: 1,
  },
  {
    id: "pcs_001_003_g1_c2",
    detail_id: "pd_001_003",
    parent_id: "pcs_001_003_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "根據貼文類型分類（新品上市、節慶活動、日常經營、顧客回饋…）",
    display_order: 2,
  },
  {
    id: "pcs_001_003_g1_c3",
    detail_id: "pd_001_003",
    parent_id: "pcs_001_003_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "加入熱門 hashtag 組合建議，提升觸及與主題相關性",
    display_order: 3,
  },

  {
    id: "pcs_001_003_g2",
    detail_id: "pd_001_003",
    parent_id: null,
    section_type: "group",
    group_name: "風格自由切換",
    group_icon: "./icons/palette.svg",
    content: null,
    display_order: 2,
  },
  {
    id: "pcs_001_003_g2_c1",
    detail_id: "pd_001_003",
    parent_id: "pcs_001_003_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "對應品牌語氣分類提示詞：",
    display_order: 1,
  },
  {
    id: "pcs_001_003_g2_c1_d1",
    detail_id: "pd_001_003",
    parent_id: "pcs_001_003_g2_c1",
    section_type: "detail",
    group_name: null,
    group_icon: null,
    content: "✨ 療癒風",
    display_order: 1,
  },
  {
    id: "pcs_001_003_g2_c1_d2",
    detail_id: "pd_001_003",
    parent_id: "pcs_001_003_g2_c1",
    section_type: "detail",
    group_name: null,
    group_icon: null,
    content: "😎 幽默風",
    display_order: 2,
  },
  {
    id: "pcs_001_003_g2_c1_d3",
    detail_id: "pd_001_003",
    parent_id: "pcs_001_003_g2_c1",
    section_type: "detail",
    group_name: null,
    group_icon: null,
    content: "🎯 專業風",
    display_order: 3,
  },

  // ========== pd_002_001: AI 食材辨識技術 ==========
  {
    id: "pcs_002_001_g1",
    detail_id: "pd_002_001",
    parent_id: null,
    section_type: "group",
    group_name: "技術特色",
    group_icon: "./icons/tech.svg",
    content: null,
    display_order: 1,
  },
  {
    id: "pcs_002_001_g1_c1",
    detail_id: "pd_002_001",
    parent_id: "pcs_002_001_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "辨識準確率高達 98.5%，支援 500+ 種常見食材",
    display_order: 1,
  },
  {
    id: "pcs_002_001_g1_c2",
    detail_id: "pd_002_001",
    parent_id: "pcs_002_001_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "即時辨識，響應速度 < 0.5 秒",
    display_order: 2,
  },
  {
    id: "pcs_002_001_g1_c3",
    detail_id: "pd_002_001",
    parent_id: "pcs_002_001_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "支援多角度、不同光線條件下的辨識",
    display_order: 3,
  },
  {
    id: "pcs_002_001_g1_c4",
    detail_id: "pd_002_001",
    parent_id: "pcs_002_001_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "可同時辨識多種食材（最多 10 種）",
    display_order: 4,
  },

  {
    id: "pcs_002_001_g2",
    detail_id: "pd_002_001",
    parent_id: null,
    section_type: "group",
    group_name: "智能功能",
    group_icon: "./icons/ai.svg",
    content: null,
    display_order: 2,
  },
  {
    id: "pcs_002_001_g2_c1",
    detail_id: "pd_002_001",
    parent_id: "pcs_002_001_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "自動建立食材庫存清單",
    display_order: 1,
  },
  {
    id: "pcs_002_001_g2_c2",
    detail_id: "pd_002_001",
    parent_id: "pcs_002_001_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "智能保存期限追蹤與提醒",
    display_order: 2,
  },
  {
    id: "pcs_002_001_g2_c3",
    detail_id: "pd_002_001",
    parent_id: "pcs_002_001_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "新鮮度評估（透過影像分析判斷）",
    display_order: 3,
  },
  {
    id: "pcs_002_001_g2_c4",
    detail_id: "pd_002_001",
    parent_id: "pcs_002_001_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "購物清單自動生成",
    display_order: 4,
  },

  // ========== pd_002_002: 智能食譜推薦系統 ==========
  {
    id: "pcs_002_002_g1",
    detail_id: "pd_002_002",
    parent_id: null,
    section_type: "group",
    group_name: "推薦機制",
    group_icon: "./icons/recommend.svg",
    content: null,
    display_order: 1,
  },
  {
    id: "pcs_002_002_g1_c1",
    detail_id: "pd_002_002",
    parent_id: "pcs_002_002_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "根據現有食材智能配對食譜",
    display_order: 1,
  },
  {
    id: "pcs_002_002_g1_c2",
    detail_id: "pd_002_002",
    parent_id: "pcs_002_002_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "考量烹飪技巧等級（新手/進階/專業）",
    display_order: 2,
  },
  {
    id: "pcs_002_002_g1_c3",
    detail_id: "pd_002_002",
    parent_id: "pcs_002_002_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "時間篩選（15分鐘快手 / 30分鐘 / 1小時以上）",
    display_order: 3,
  },
  {
    id: "pcs_002_002_g1_c4",
    detail_id: "pd_002_002",
    parent_id: "pcs_002_002_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "飲食偏好設定（素食、低碳、生酮、無麩質等）",
    display_order: 4,
  },

  {
    id: "pcs_002_002_g2",
    detail_id: "pd_002_002",
    parent_id: null,
    section_type: "group",
    group_name: "食譜內容",
    group_icon: "./icons/cookbook.svg",
    content: null,
    display_order: 2,
  },
  {
    id: "pcs_002_002_g2_c1",
    detail_id: "pd_002_002",
    parent_id: "pcs_002_002_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "1000+ 道多國料理（中、西、日、韓、泰、義等）",
    display_order: 1,
  },
  {
    id: "pcs_002_002_g2_c2",
    detail_id: "pd_002_002",
    parent_id: "pcs_002_002_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "詳細步驟說明配圖解",
    display_order: 2,
  },
  {
    id: "pcs_002_002_g2_c3",
    detail_id: "pd_002_002",
    parent_id: "pcs_002_002_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "影片教學（關鍵步驟）",
    display_order: 3,
  },
  {
    id: "pcs_002_002_g2_c4",
    detail_id: "pd_002_002",
    parent_id: "pcs_002_002_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "主廚小撇步與常見失敗解析",
    display_order: 4,
  },

  // ========== pd_003_001: 海洋再生纖維技術 ==========
  {
    id: "pcs_003_001_g1",
    detail_id: "pd_003_001",
    parent_id: null,
    section_type: "group",
    group_name: "技術優勢",
    group_icon: "./icons/innovation.svg",
    content: null,
    display_order: 1,
  },
  {
    id: "pcs_003_001_g1_c1",
    detail_id: "pd_003_001",
    parent_id: "pcs_003_001_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "100% 海洋回收塑膠製成，通過 GRS 全球回收標準認證",
    display_order: 1,
  },
  {
    id: "pcs_003_001_g1_c2",
    detail_id: "pd_003_001",
    parent_id: "pcs_003_001_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "纖維強度與舒適度媲美原生纖維",
    display_order: 2,
  },
  {
    id: "pcs_003_001_g1_c3",
    detail_id: "pd_003_001",
    parent_id: "pcs_003_001_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "具備吸濕排汗、抗 UV、抗菌等多重機能",
    display_order: 3,
  },
  {
    id: "pcs_003_001_g1_c4",
    detail_id: "pd_003_001",
    parent_id: "pcs_003_001_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "可重複回收再利用，實現真正的循環經濟",
    display_order: 4,
  },

  {
    id: "pcs_003_001_g2",
    detail_id: "pd_003_001",
    parent_id: null,
    section_type: "group",
    group_name: "環境效益",
    group_icon: "./icons/eco-impact.svg",
    content: null,
    display_order: 2,
  },
  {
    id: "pcs_003_001_g2_c1",
    detail_id: "pd_003_001",
    parent_id: "pcs_003_001_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "每件 T-shirt 使用約 10 個回收寶特瓶",
    display_order: 1,
  },
  {
    id: "pcs_003_001_g2_c2",
    detail_id: "pd_003_001",
    parent_id: "pcs_003_001_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "相較傳統製程減少 60% 碳排放",
    display_order: 2,
  },
  {
    id: "pcs_003_001_g2_c3",
    detail_id: "pd_003_001",
    parent_id: "pcs_003_001_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "節省 90% 的水資源消耗",
    display_order: 3,
  },
  {
    id: "pcs_003_001_g2_c4",
    detail_id: "pd_003_001",
    parent_id: "pcs_003_001_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "每年可清理超過 50 噸海洋塑膠垃圾",
    display_order: 4,
  },

  // ========== pd_004_001: 智能種植系統 ==========
  {
    id: "pcs_004_001_g1",
    detail_id: "pd_004_001",
    parent_id: null,
    section_type: "group",
    group_name: "系統特色",
    group_icon: "./icons/system.svg",
    content: null,
    display_order: 1,
  },
  {
    id: "pcs_004_001_g1_c1",
    detail_id: "pd_004_001",
    parent_id: "pcs_004_001_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "模組化設計，可依空間需求擴充",
    display_order: 1,
  },
  {
    id: "pcs_004_001_g1_c2",
    detail_id: "pd_004_001",
    parent_id: "pcs_004_001_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "食品級材質，安全無毒",
    display_order: 2,
  },
  {
    id: "pcs_004_001_g1_c3",
    detail_id: "pd_004_001",
    parent_id: "pcs_004_001_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "節能 LED 生長燈，耗電量僅傳統燈具 1/5",
    display_order: 3,
  },
  {
    id: "pcs_004_001_g1_c4",
    detail_id: "pd_004_001",
    parent_id: "pcs_004_001_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "靜音設計，運轉噪音 < 30dB",
    display_order: 4,
  },

  {
    id: "pcs_004_001_g2",
    detail_id: "pd_004_001",
    parent_id: null,
    section_type: "group",
    group_name: "適種作物",
    group_icon: "./icons/plants.svg",
    content: null,
    display_order: 2,
  },
  {
    id: "pcs_004_001_g2_c1",
    detail_id: "pd_004_001",
    parent_id: "pcs_004_001_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "🥬 葉菜類：小白菜、青江菜、萵苣、菠菜",
    display_order: 1,
  },
  {
    id: "pcs_004_001_g2_c2",
    detail_id: "pd_004_001",
    parent_id: "pcs_004_001_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "🌿 香料植物：九層塔、薄荷、迷迭香、香菜",
    display_order: 2,
  },
  {
    id: "pcs_004_001_g2_c3",
    detail_id: "pd_004_001",
    parent_id: "pcs_004_001_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "🍅 果菜類：小番茄、辣椒、茄子",
    display_order: 3,
  },
  {
    id: "pcs_004_001_g2_c4",
    detail_id: "pd_004_001",
    parent_id: "pcs_004_001_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "🥕 根莖類：蘿蔔、蔥、蒜",
    display_order: 4,
  },

  // ========== pd_005_001: 睡眠追蹤技術 ==========
  {
    id: "pcs_005_001_g1",
    detail_id: "pd_005_001",
    parent_id: null,
    section_type: "group",
    group_name: "追蹤指標",
    group_icon: "./icons/metrics.svg",
    content: null,
    display_order: 1,
  },
  {
    id: "pcs_005_001_g1_c1",
    detail_id: "pd_005_001",
    parent_id: "pcs_005_001_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "睡眠週期分析（深層睡眠、淺層睡眠、REM 快速動眼期）",
    display_order: 1,
  },
  {
    id: "pcs_005_001_g1_c2",
    detail_id: "pd_005_001",
    parent_id: "pcs_005_001_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "入睡時間與清醒次數記錄",
    display_order: 2,
  },
  {
    id: "pcs_005_001_g1_c3",
    detail_id: "pd_005_001",
    parent_id: "pcs_005_001_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "打鼾與呼吸暫停偵測",
    display_order: 3,
  },
  {
    id: "pcs_005_001_g1_c4",
    detail_id: "pd_005_001",
    parent_id: "pcs_005_001_g1",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "環境因素監測（溫度、濕度、光線、噪音）",
    display_order: 4,
  },

  {
    id: "pcs_005_001_g2",
    detail_id: "pd_005_001",
    parent_id: null,
    section_type: "group",
    group_name: "技術優勢",
    group_icon: "./icons/advantage.svg",
    content: null,
    display_order: 2,
  },
  {
    id: "pcs_005_001_g2_c1",
    detail_id: "pd_005_001",
    parent_id: "pcs_005_001_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "非接觸式追蹤，無需穿戴任何裝置",
    display_order: 1,
  },
  {
    id: "pcs_005_001_g2_c2",
    detail_id: "pd_005_001",
    parent_id: "pcs_005_001_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "軍規級聲波感測技術，準確度媲美醫療級設備",
    display_order: 2,
  },
  {
    id: "pcs_005_001_g2_c3",
    detail_id: "pd_005_001",
    parent_id: "pcs_005_001_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "自動偵測開始與結束，無需手動操作",
    display_order: 3,
  },
  {
    id: "pcs_005_001_g2_c4",
    detail_id: "pd_005_001",
    parent_id: "pcs_005_001_g2",
    section_type: "item",
    group_name: null,
    group_icon: null,
    content: "資料加密儲存，保護個人隱私",
    display_order: 4,
  },
];

// PRODUCT_EMPHASIZE（產品強調重點）
export const mockProductEmphasize = [
  // pd_001_001
  {
    id: 1,
    detail_id: "pd_001_001",
    emoji: "👉",
    icon_path: "./icons/lightbulb_yellow.svg",
    icon_alt: "lightbulb_yellow",
    content: "不用再苦想廣告文案，只要「填空＋套用」，即可秒產專業級廣告內容！",
    display_order: 1,
  },

  // pd_001_002
  {
    id: 2,
    detail_id: "pd_001_002",
    emoji: "👉",
    icon_path: "./icons/mail_yellow.svg",
    icon_alt: "mail_yellow",
    content: "不再怕冷場、不用請代理商，自己也能寫出高轉換的行銷信件！",
    display_order: 1,
  },

  // pd_001_003
  {
    id: 3,
    detail_id: "pd_001_003",
    emoji: "👉",
    icon_path: "./icons/instagram_gradient.svg",
    icon_alt: "instagram_gradient",
    content: "給創作者和品牌經營者的快速靈感加油站，一鍵套用，互動翻倍！",
    display_order: 1,
  },

  // pd_002_001
  {
    id: 4,
    detail_id: "pd_002_001",
    emoji: "🎯",
    icon_path: "./icons/target.svg",
    icon_alt: "target",
    content: "掃一掃就知道，讓你的冰箱變成智能助手，料理從此不再困擾！",
    display_order: 1,
  },

  // pd_002_002
  {
    id: 5,
    detail_id: "pd_002_002",
    emoji: "✨",
    icon_path: "./icons/sparkles.svg",
    icon_alt: "sparkles",
    content: "告別「今天吃什麼」的煩惱，AI 幫你找到最適合的料理方案！",
    display_order: 1,
  },

  // pd_002_003
  {
    id: 6,
    detail_id: "pd_002_003",
    emoji: "💪",
    icon_path: "./icons/health.svg",
    icon_alt: "health",
    content: "美味與健康兼得，讓每一餐都成為達成健康目標的助力！",
    display_order: 1,
  },

  // pd_003_001
  {
    id: 7,
    detail_id: "pd_003_001",
    emoji: "🌊",
    icon_path: "./icons/ocean.svg",
    icon_alt: "ocean",
    content: "每一件衣服都是對海洋的承諾，穿出你的環保態度！",
    display_order: 1,
  },

  // pd_003_002
  {
    id: 8,
    detail_id: "pd_003_002",
    emoji: "♻️",
    icon_path: "./icons/recycle.svg",
    icon_alt: "recycle",
    content: "從生產到配送，全程碳中和，讓時尚真正永續！",
    display_order: 1,
  },

  // pd_003_003
  {
    id: 9,
    detail_id: "pd_003_003",
    emoji: "👔",
    icon_path: "./icons/fashion.svg",
    icon_alt: "fashion",
    content: "永續不妥協美感，環保也能很時尚！",
    display_order: 1,
  },

  // pd_004_001
  {
    id: 10,
    detail_id: "pd_004_001",
    emoji: "🌱",
    icon_path: "./icons/seed.svg",
    icon_alt: "seed",
    content: "零經驗也能成功！智能系統全自動，讓種菜變得像養電子寵物一樣簡單！",
    display_order: 1,
  },

  // pd_004_002
  {
    id: 11,
    detail_id: "pd_004_002",
    emoji: "📱",
    icon_path: "./icons/smartphone.svg",
    icon_alt: "smartphone",
    content: "手機遠端操控，出差旅遊也不怕植物沒人照顧！",
    display_order: 1,
  },

  // pd_004_003
  {
    id: 12,
    detail_id: "pd_004_003",
    emoji: "📊",
    icon_path: "./icons/chart.svg",
    icon_alt: "chart",
    content: "科學數據追蹤，讓你的陽台變成專業農場！",
    display_order: 1,
  },

  // pd_005_001
  {
    id: 13,
    detail_id: "pd_005_001",
    emoji: "😴",
    icon_path: "./icons/sleep.svg",
    icon_alt: "sleep",
    content: "無需穿戴裝置，睡得更舒適，追蹤更精準！",
    display_order: 1,
  },

  // pd_005_002
  {
    id: 14,
    detail_id: "pd_005_002",
    emoji: "🤖",
    icon_path: "./icons/ai_brain.svg",
    icon_alt: "ai_brain",
    content: "AI 深度分析，找出影響睡眠的真正原因！",
    display_order: 1,
  },

  // pd_005_003
  {
    id: 15,
    detail_id: "pd_005_003",
    emoji: "🎯",
    icon_path: "./icons/goal.svg",
    icon_alt: "goal",
    content: "21 天養成好習慣，從此告別失眠，擁抱深層好眠！",
    display_order: 1,
  },
];
