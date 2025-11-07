// RISKS_CHALLENGES（風險與挑戰總述）
export const mockRisksChallenges = [
  // proj_001 - AdPrompt Lab
  {
    id: 1,
    project_id: "proj_001",
    preface:
      "本次《AdPrompt Lab 廣告提示詞大全》旨在幫助社群經營者與電商創作者，快速產出高轉換行銷文案，實用性高，內容精心編製。然而，作為一項數位內容產品與實體課程結合的募資案，仍可能面臨以下幾項潛在風險：",
    disclosure:
      "專案可能遇到各種不可控因素，若遇突發狀況，將通知贊助者最新狀況。當您贊助此計畫即同意承擔此風險，並接受可能延遲出貨之變因。",
  },

  // proj_002 - ChefMate
  {
    id: 2,
    project_id: "proj_002",
    preface:
      "ChefMate 智能料理助手是一款結合硬體與軟體的創新產品。我們已完成原型開發與測試，但作為新創產品，仍可能面臨以下挑戰：",
    disclosure:
      "我們承諾盡最大努力確保產品品質與交付時程，但募資專案本質上存在不確定性。贊助前請審慎評估，贊助即表示您理解並願意承擔相關風險。",
  },

  // proj_003 - EcoWear
  {
    id: 3,
    project_id: "proj_003",
    preface:
      "EcoWear 致力於推動永續時尚，我們已建立完整的供應鏈與生產流程。然而，作為環保服飾募資專案，仍存在以下潛在風險：",
    disclosure:
      "我們將持續與贊助者保持透明溝通，若遇重大變更將立即公告。贊助即代表您認同永續理念並願意與我們共同面對挑戰。",
  },

  // proj_004 - UrbanGarden
  {
    id: 4,
    project_id: "proj_004",
    preface:
      "UrbanGarden 智能陽台菜園系統結合了 IoT 物聯網技術與農業科技，我們已與多家供應商建立合作關係。儘管如此，作為智能硬體募資專案，仍可能面臨以下風險：",
    disclosure:
      "我們將定期更新專案進度，確保透明度。若遇不可抗力導致延遲，將第一時間通知贊助者並提供解決方案。贊助即表示您了解並接受這些潛在風險。",
  },

  // proj_005 - SleepWell
  {
    id: 5,
    project_id: "proj_005",
    preface:
      "SleepWell 智能睡眠改善計畫是一項結合 APP 軟體、數位內容與線上服務的綜合方案。我們的團隊擁有豐富的睡眠科學研究背景，但仍可能面臨以下挑戰：",
    disclosure:
      "睡眠改善需要時間與持續努力，效果因人而異。我們承諾提供專業指導，但無法保證所有使用者都能達到相同效果。贊助前請理解個人體質差異，贊助即表示您接受此不確定性。",
  },
];

// RISK_ITEMS（風險項目）
export const mockRiskItems = [
  // ========== proj_001 風險項目 ==========
  {
    id: "risk_001_001",
    project_id: "proj_001",
    title: "1. 課程與檔案交付延遲",
    risk_description:
      "雖然我們已規劃電子檔案與課程在 2025 年 9 月起陸續交付，但仍可能因設計校稿、系統測試、平台處理時間等因素，導致部分用戶收到內容的時程延後。",
    countermeasures:
      "將分批釋出數位資源（例如：先交付核心模組 PDF，再補充加值工具），並定期於募資平台更新進度，保持資訊透明。",
    display_order: 1,
  },
  {
    id: "risk_001_002",
    project_id: "proj_001",
    title: "2. 實體工作坊排程異動",
    risk_description:
      "課程原訂於 2025/09～2026/01 之間舉行，若遇場地預約問題、講師檔期調整或不可抗力（如天災、疫情）可能導致場次延期或更換地點。",
    countermeasures:
      "提供場次選擇機會與補課機制，必要時轉為線上直播替代，確保所有支持者皆能獲得完整體驗。",
    display_order: 2,
  },
  {
    id: "risk_001_003",
    project_id: "proj_001",
    title: "3. 預期以外的需求變動",
    risk_description:
      "若募資成功後，實際支持者的背景分布、產業需求與預期不同，可能會導致某些模組需要追加設計、調整語氣或提供不同版本。",
    countermeasures:
      "預留彈性製作時程與內容更新機制，並設立問卷收集使用者反饋，以利後續優化。",
    display_order: 3,
  },
  {
    id: "risk_001_004",
    project_id: "proj_001",
    title: "4. 數位產品的授權與盜用風險",
    risk_description:
      "電子檔案雖易於發送與使用，但也可能被未經授權轉發或轉售。",
    countermeasures:
      "採取浮水印標記、限制用途聲明，並提供專屬下載連結控管，確保支持者權益。",
    display_order: 4,
  },

  // ========== proj_002 風險項目 ==========
  {
    id: "risk_002_001",
    project_id: "proj_002",
    title: "1. 硬體生產與供應鏈風險",
    risk_description:
      "硬體生產涉及多個供應商與製造流程，可能因零件短缺、良率問題或物流延誤影響交付時程。",
    countermeasures:
      "我們已與多家供應商簽訂備用合約，並預留 20% 的緩衝時間。若遇重大延誤將優先通知贊助者並提供補償方案。",
    display_order: 1,
  },
  {
    id: "risk_002_002",
    project_id: "proj_002",
    title: "2. AI 辨識準確度挑戰",
    risk_description:
      "雖然測試階段辨識率達 98.5%，但實際使用環境複雜多變，某些特殊食材或極端光線條件可能影響辨識效果。",
    countermeasures:
      "持續優化 AI 模型，並建立用戶回饋機制。若辨識錯誤，用戶可手動修正並協助訓練系統，讓 AI 越用越聰明。",
    display_order: 2,
  },
  {
    id: "risk_002_003",
    project_id: "proj_002",
    title: "3. 軟體功能開發進度",
    risk_description:
      "部分進階功能（如個人化飲食建議、社群分享等）可能因開發複雜度較高而延後上線。",
    countermeasures:
      "核心功能（食材辨識、食譜推薦、營養分析）確保如期交付，進階功能將透過 App 更新陸續釋出，所有功能最終都會完整實現。",
    display_order: 3,
  },
  {
    id: "risk_002_004",
    project_id: "proj_002",
    title: "4. 售後服務與保固",
    risk_description:
      "作為新創團隊，若產品出現瑕疵，維修與更換流程可能不如大品牌快速。",
    countermeasures:
      "提供一年保固服務，並與專業維修中心合作。設立專屬客服信箱與 LINE 官方帳號，確保問題能在 48 小時內獲得回應。",
    display_order: 4,
  },

  // ========== proj_003 風險項目 ==========
  {
    id: "risk_003_001",
    project_id: "proj_003",
    title: "1. 原料供應波動",
    risk_description:
      "海洋回收塑膠的供應量受海洋清理計畫進度影響，若回收量不如預期可能影響生產時程。",
    countermeasures:
      "我們已與三個海洋保育組織建立長期合作，並預留 6 個月的原料庫存。若仍遇短缺將優先保障募資訂單。",
    display_order: 1,
  },
  {
    id: "risk_003_002",
    project_id: "proj_003",
    title: "2. 尺寸與版型調整",
    risk_description:
      "服飾產品涉及個人穿著偏好，部分贊助者可能需要換貨或尺寸調整。",
    countermeasures:
      "提供詳細的尺寸對照表與試穿建議。交貨後 30 天內可免費更換尺寸一次（需自付來回運費）。",
    display_order: 2,
  },
  {
    id: "risk_003_003",
    project_id: "proj_003",
    title: "3. 生產與交付時程",
    risk_description:
      "永續製程相較傳統生產需要更多時間，加上品質檢驗嚴格，可能延後 1-2 週交貨。",
    countermeasures:
      "我們已將緩衝時間納入預計交貨日，並會在生產各階段（裁剪、縫製、檢驗、包裝）發送進度更新給贊助者。",
    display_order: 3,
  },
  {
    id: "risk_003_004",
    project_id: "proj_003",
    title: "4. 顏色與材質差異",
    risk_description:
      "由於使用回收材料，每批次的布料可能存在些微色差，實品與照片可能略有不同。",
    countermeasures:
      "我們嚴格控管色差在可接受範圍（ΔE<2），並在產品頁面說明材質特性。若色差超出標準將提供退換貨服務。",
    display_order: 4,
  },

  // ========== proj_004 風險項目 ==========
  {
    id: "risk_004_001",
    project_id: "proj_004",
    title: "1. 硬體製造與物流",
    risk_description:
      "種植箱、感測器等硬體需從不同供應商採購組裝，可能因零件缺貨或製造延遲影響出貨時間。",
    countermeasures:
      "已與台灣在地供應商建立合作，縮短供應鏈風險。預留 30 天緩衝期，並在生產前進行完整測試。",
    display_order: 1,
  },
  {
    id: "risk_004_002",
    project_id: "proj_004",
    title: "2. 環境適應性差異",
    risk_description:
      "不同地區的氣候、陽台朝向、日照時間差異大，可能影響作物生長效果。",
    countermeasures:
      "提供環境評估問卷，並根據用戶所在地區給予客製化建議。APP 內建環境調整指南，協助用戶優化設定。",
    display_order: 2,
  },
  {
    id: "risk_004_003",
    project_id: "proj_004",
    title: "3. 軟體相容性問題",
    risk_description:
      "APP 需支援多種手機型號與作業系統版本，可能出現相容性問題或部分功能無法使用。",
    countermeasures:
      "已在 20+ 款主流手機測試，並持續更新維護。提供完整的技術支援，遇問題 24 小時內回應。",
    display_order: 3,
  },
  {
    id: "risk_004_004",
    project_id: "proj_004",
    title: "4. 種植成功率期望差異",
    risk_description:
      "雖有智能系統輔助，但植物生長仍受多重因素影響，無法保證 100% 成功率。",
    countermeasures:
      "提供詳細種植教學與常見問題排解。若因系統問題導致失敗，將免費補充種子與培養土。建立社群互助平台，讓用戶交流經驗。",
    display_order: 4,
  },

  // ========== proj_005 風險項目 ==========
  {
    id: "risk_005_001",
    project_id: "proj_005",
    title: "1. 個人效果差異",
    risk_description:
      "每個人的睡眠問題成因不同，改善效果和所需時間因人而異，部分使用者可能需要更長時間才能看到明顯改善。",
    countermeasures:
      "提供 21 天、60 天、90 天等不同階段的改善計畫。專業睡眠顧問會根據個人數據調整建議，並提供一對一諮詢服務。",
    display_order: 1,
  },
  {
    id: "risk_005_002",
    project_id: "proj_005",
    title: "2. 追蹤數據準確度",
    risk_description:
      "非穿戴式追蹤雖然舒適，但可能受環境因素（如寵物、同床伴侶）影響數據準確度。",
    countermeasures:
      "提供多種追蹤模式選擇（手機、智慧手環、智慧床墊等）。系統會學習個人睡眠模式，自動排除干擾因素。",
    display_order: 2,
  },
  {
    id: "risk_005_003",
    project_id: "proj_005",
    title: "3. 內容更新與維護",
    risk_description:
      "助眠音頻、冥想課程等數位內容需持續更新，可能因製作時程影響新內容上線速度。",
    countermeasures:
      "承諾每月至少新增 5 組新內容。與專業冥想師、音樂治療師合作，確保內容品質。既有內容已足夠使用，新內容為額外加值。",
    display_order: 3,
  },
  {
    id: "risk_005_004",
    project_id: "proj_005",
    title: "4. 醫療諮詢界限",
    risk_description:
      "本計畫提供睡眠改善建議，但不取代專業醫療診斷。嚴重睡眠障礙（如睡眠呼吸中止症）需就醫治療。",
    countermeasures:
      "APP 內建健康風險評估，若偵測到嚴重問題會建議就醫。與睡眠醫學中心合作，提供轉診資訊。明確標示服務範圍與限制。",
    display_order: 4,
  },
];
