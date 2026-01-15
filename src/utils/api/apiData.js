// API Documentation Data
export const apiCategories = [
  {
    id: "tags",
    name: "Tags",
    description: "標籤管理相關 API（新增）",
    icon: "🏷️",
  },
  {
    id: "products",
    name: "Projects / Products",
    description: "專案與商品相關 API",
    icon: "📦",
  },
  {
    id: "rewards",
    name: "Reward Tiers",
    description: "回饋方案相關 API",
    icon: "🎁",
  },
  {
    id: "orders",
    name: "Orders",
    description: "訂單與贊助相關 API",
    icon: "🛒",
  },
  {
    id: "favorites",
    name: "Favorites",
    description: "收藏與追蹤相關 API",
    icon: "❤️",
  },
  {
    id: "interactions",
    name: "Interactions",
    description: "留言與問答相關 API",
    icon: "💬",
  },
  {
    id: "users",
    name: "Users",
    description: "使用者相關 API",
    icon: "👤",
  },
  {
    id: "admin",
    name: "Admin",
    description: "管理後台相關 API",
    icon: "⚙️",
  },
];

export const apiEndpoints = {
  tags: [
    {
      name: "getAllTags",
      description: "取得所有標籤",
      method: "GET",
      requiresAuth: false,
      parameters: [],
      exampleRequest: {},
      exampleResponse: [
        {
          id: "tag-uuid",
          tag_name: "科技創新",
          slug: "technology",
          description: "科技創新產品",
          icon_url: "https://...",
        },
      ],
      errorResponses: [
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "getTagById",
      description: "取得單一標籤資訊",
      method: "GET",
      requiresAuth: false,
      parameters: [
        { name: "id", type: "string", required: true, description: "標籤 ID" },
      ],
      exampleRequest: { id: "tag-uuid" },
      exampleResponse: {
        id: "tag-uuid",
        tag_name: "科技創新",
        slug: "technology",
      },
      errorResponses: [
        { code: 404, message: "Not Found", description: "找不到指定的標籤" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "getProjectsByTag",
      description: "依標籤篩選專案（單一標籤）",
      method: "GET",
      requiresAuth: false,
      parameters: [
        {
          name: "tagId",
          type: "string",
          required: true,
          description: "標籤 ID",
        },
        {
          name: "filters",
          type: "Object",
          required: false,
          description: "額外篩選條件",
        },
      ],
      exampleRequest: {
        tagId: "tag-uuid",
        filters: { status: "active", limit: 10 },
      },
      exampleResponse: [],
      errorResponses: [
        { code: 404, message: "Not Found", description: "找不到指定的標籤" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "getProjectsByTags",
      description: "依多個標籤篩選專案（OR 邏輯）",
      method: "GET",
      requiresAuth: false,
      parameters: [
        {
          name: "tagIds",
          type: "Array<string>",
          required: true,
          description: "標籤 ID 陣列",
        },
        {
          name: "filters",
          type: "Object",
          required: false,
          description: "額外篩選條件",
        },
      ],
      exampleRequest: {
        tagIds: ["tag-uuid-1", "tag-uuid-2"],
        filters: { status: "active", limit: 20 },
      },
      exampleResponse: [],
      errorResponses: [
        {
          code: 400,
          message: "Bad Request",
          description: "標籤 ID 陣列格式錯誤",
        },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "getProjectTags",
      description: "取得專案的所有標籤",
      method: "GET",
      requiresAuth: false,
      parameters: [
        {
          name: "projectId",
          type: "string",
          required: true,
          description: "專案 ID",
        },
      ],
      exampleRequest: { projectId: "project-uuid" },
      exampleResponse: [
        { id: "tag-uuid-1", tag_name: "科技", slug: "tech" },
        { id: "tag-uuid-2", tag_name: "環保", slug: "eco" },
      ],
      errorResponses: [
        { code: 404, message: "Not Found", description: "找不到指定的專案" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "addProjectTags",
      description: "為專案新增標籤（需登入）",
      method: "POST",
      requiresAuth: true,
      parameters: [
        {
          name: "projectId",
          type: "string",
          required: true,
          description: "專案 ID",
        },
        {
          name: "tagIds",
          type: "Array<string>",
          required: true,
          description: "標籤 ID 陣列",
        },
      ],
      exampleRequest: {
        projectId: "project-uuid",
        tagIds: ["tag-uuid-1", "tag-uuid-2"],
      },
      exampleResponse: { success: true },
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 404, message: "Not Found", description: "找不到專案或標籤" },
        { code: 400, message: "Bad Request", description: "請求參數錯誤" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "removeProjectTags",
      description: "移除專案標籤（需登入）",
      method: "DELETE",
      requiresAuth: true,
      parameters: [
        {
          name: "projectId",
          type: "string",
          required: true,
          description: "專案 ID",
        },
        {
          name: "tagIds",
          type: "Array<string>",
          required: true,
          description: "標籤 ID 陣列",
        },
      ],
      exampleRequest: {
        projectId: "project-uuid",
        tagIds: ["tag-uuid-1"],
      },
      exampleResponse: { success: true },
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 404, message: "Not Found", description: "找不到專案或標籤" },
        { code: 400, message: "Bad Request", description: "請求參數錯誤" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "replaceProjectTags",
      description: "替換專案的所有標籤（需登入）",
      method: "PUT",
      requiresAuth: true,
      parameters: [
        {
          name: "projectId",
          type: "string",
          required: true,
          description: "專案 ID",
        },
        {
          name: "tagIds",
          type: "Array<string>",
          required: true,
          description: "新的標籤 ID 陣列",
        },
      ],
      exampleRequest: {
        projectId: "project-uuid",
        tagIds: ["tag-uuid-3", "tag-uuid-4"],
      },
      exampleResponse: { success: true },
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 404, message: "Not Found", description: "找不到專案或標籤" },
        { code: 400, message: "Bad Request", description: "請求參數錯誤" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
  ],
  products: [
    {
      name: "getProjects",
      description: "取得專案列表，支援搜尋、多標籤、狀態篩選（已更新）",
      method: "GET",
      requiresAuth: false,
      parameters: [
        {
          name: "filters",
          type: "Object",
          required: false,
          description: "篩選條件",
        },
        {
          name: "filters.search",
          type: "string",
          required: false,
          description: "搜尋關鍵字",
        },
        {
          name: "filters.tags",
          type: "Array<string>",
          required: false,
          description: "標籤 ID 陣列（新增）",
        },
        {
          name: "filters.category",
          type: "string",
          required: false,
          description: "分類 ID（向後兼容）",
        },
        {
          name: "filters.status",
          type: "string",
          required: false,
          description: "專案狀態",
        },
        {
          name: "filters.limit",
          type: "number",
          required: false,
          description: "回傳數量",
        },
        {
          name: "filters.offset",
          type: "number",
          required: false,
          description: "分頁偏移",
        },
      ],
      exampleRequest: {
        filters: {
          search: "科技",
          tags: ["tech-tag-id", "eco-tag-id"],
          status: "active",
          limit: 10,
        },
      },
      exampleResponse: [
        {
          id: "uuid",
          title: "AI 智慧音箱",
          tagline: "讓生活更智慧",
          owner_name: "John Doe",
          goal_amount: 100000,
          current_amount: 75000,
          backers_count: 150,
          status: "active",
          project_tags: [{ tags: { id: "tag-1", tag_name: "科技" } }],
          social_media: [{ platform: "facebook", url: "https://..." }],
        },
      ],
      errorResponses: [
        { code: 400, message: "Bad Request", description: "篩選參數格式錯誤" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "getProjectById",
      description: "取得單一專案詳細資訊（已更新）",
      method: "GET",
      requiresAuth: false,
      parameters: [
        { name: "id", type: "string", required: true, description: "專案 ID" },
      ],
      exampleRequest: { id: "project-uuid" },
      exampleResponse: {
        id: "uuid",
        title: "AI 智慧音箱",
        description: "完整專案說明...",
        owner_name: "John Doe",
        social_media: [
          { platform: "facebook", url: "https://fb.com/...", display_order: 1 },
          {
            platform: "instagram",
            url: "https://ig.com/...",
            display_order: 2,
          },
        ],
        creator: {
          id: "user-uuid",
          display_name: "John Doe",
        },
        project_tags: [
          { tags: { id: "tag-1", tag_name: "科技", slug: "tech" } },
        ],
        reward_tiers: [],
      },
      errorResponses: [
        { code: 404, message: "Not Found", description: "找不到指定的專案" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "createProject",
      description: "建立新專案（需登入，已更新）",
      method: "POST",
      requiresAuth: true,
      parameters: [
        {
          name: "projectData",
          type: "Object",
          required: true,
          description: "專案資料",
        },
        {
          name: "userId",
          type: "string",
          required: true,
          description: "創建者 ID",
        },
        {
          name: "ownerName",
          type: "string",
          required: true,
          description: "創建者名稱（新增）",
        },
      ],
      exampleRequest: {
        projectData: {
          title: "新專案",
          slug: "new-project",
          tagline: "簡短標語",
          goal_amount: 50000,
        },
        userId: "user-uuid",
        ownerName: "John Doe",
      },
      exampleResponse: {
        id: "new-uuid",
        title: "新專案",
        owner_name: "John Doe",
      },
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        {
          code: 400,
          message: "Bad Request",
          description: "專案資料格式錯誤或必填欄位缺失",
        },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "updateProjectSocialMedia",
      description: "更新專案社群媒體連結（新增）",
      method: "PUT",
      requiresAuth: true,
      parameters: [
        { name: "id", type: "string", required: true, description: "專案 ID" },
        {
          name: "socialMedia",
          type: "Array",
          required: true,
          description: "社群媒體陣列",
        },
      ],
      exampleRequest: {
        id: "project-uuid",
        socialMedia: [
          { platform: "facebook", url: "https://fb.com/...", display_order: 1 },
          {
            platform: "instagram",
            url: "https://ig.com/...",
            display_order: 2,
          },
        ],
      },
      exampleResponse: {
        id: "project-uuid",
        social_media: [{ platform: "facebook", url: "https://fb.com/..." }],
      },
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 404, message: "Not Found", description: "找不到指定的專案" },
        {
          code: 400,
          message: "Bad Request",
          description: "社群媒體資料格式錯誤",
        },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "updateProject",
      description: "更新專案資訊（需登入）",
      method: "PUT",
      requiresAuth: true,
      parameters: [
        { name: "id", type: "string", required: true, description: "專案 ID" },
        {
          name: "updates",
          type: "Object",
          required: true,
          description: "更新內容",
        },
      ],
      exampleRequest: {
        id: "project-uuid",
        updates: { title: "更新後的標題" },
      },
      exampleResponse: { id: "project-uuid", title: "更新後的標題" },
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 404, message: "Not Found", description: "找不到指定的專案" },
        { code: 400, message: "Bad Request", description: "更新資料格式錯誤" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "getProjectStats",
      description: "取得專案統計資訊",
      method: "GET",
      requiresAuth: false,
      parameters: [
        { name: "id", type: "string", required: true, description: "專案 ID" },
      ],
      exampleRequest: { id: "project-uuid" },
      exampleResponse: {
        goalAmount: 100000,
        currentAmount: 75000,
        backersCount: 150,
        fundingPercentage: 75,
        daysLeft: 15,
      },
      errorResponses: [
        { code: 404, message: "Not Found", description: "找不到指定的專案" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "getFeaturedProjects",
      description: "取得熱門精選專案",
      method: "GET",
      requiresAuth: false,
      parameters: [
        {
          name: "limit",
          type: "number",
          required: false,
          description: "回傳數量（預設 6）",
        },
      ],
      exampleRequest: { limit: 6 },
      exampleResponse: [],
      errorResponses: [
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
  ],
  rewards: [
    {
      name: "getRewardsByProject",
      description: "取得專案的所有回饋方案",
      method: "GET",
      requiresAuth: false,
      parameters: [
        {
          name: "projectId",
          type: "string",
          required: true,
          description: "專案 ID",
        },
      ],
      exampleRequest: { projectId: "project-uuid" },
      exampleResponse: [
        {
          id: "reward-uuid",
          title: "早鳥優惠",
          subtitle: "限量 100 組",
          amount: 880,
          list_price: 1480,
          cover_image_url: "https://...",
          recommended_to: "想搶先體驗的你",
          total_quantity: 100,
          claimed_quantity: 50,
        },
      ],
      errorResponses: [
        { code: 404, message: "Not Found", description: "找不到指定的專案" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "createReward",
      description: "建立新回饋方案（需登入，已更新）",
      method: "POST",
      requiresAuth: true,
      parameters: [
        {
          name: "rewardData",
          type: "Object",
          required: true,
          description: "方案資料",
        },
      ],
      exampleRequest: {
        rewardData: {
          project_id: "project-uuid",
          title: "超級早鳥",
          subtitle: "限量 50 組",
          amount: 800,
          list_price: 1200,
          cover_image_url: "https://...",
          recommended_to: "早期支持者",
          total_quantity: 50,
        },
      },
      exampleResponse: { id: "new-reward-uuid" },
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        {
          code: 400,
          message: "Bad Request",
          description: "方案資料格式錯誤或必填欄位缺失",
        },
        { code: 404, message: "Not Found", description: "找不到指定的專案" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "calculateDiscount",
      description: "計算方案折扣百分比（新增）",
      method: "GET",
      requiresAuth: false,
      parameters: [
        {
          name: "reward",
          type: "Object",
          required: true,
          description: "方案物件",
        },
      ],
      exampleRequest: {
        reward: {
          amount: 880,
          list_price: 1480,
        },
      },
      exampleResponse: 40,
      errorResponses: [
        { code: 400, message: "Bad Request", description: "方案資料格式錯誤" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "getRewardWithDiscount",
      description: "取得含折扣資訊的方案（新增）",
      method: "GET",
      requiresAuth: false,
      parameters: [
        { name: "id", type: "string", required: true, description: "方案 ID" },
      ],
      exampleRequest: { id: "reward-uuid" },
      exampleResponse: {
        id: "reward-uuid",
        title: "早鳥優惠",
        amount: 880,
        list_price: 1480,
        discount_percentage: 40,
      },
      errorResponses: [
        { code: 404, message: "Not Found", description: "找不到指定的方案" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "isRewardAvailable",
      description: "檢查回饋方案是否可購買",
      method: "GET",
      requiresAuth: false,
      parameters: [
        { name: "id", type: "string", required: true, description: "方案 ID" },
      ],
      exampleRequest: { id: "reward-uuid" },
      exampleResponse: true,
      errorResponses: [
        { code: 404, message: "Not Found", description: "找不到指定的方案" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
  ],
  orders: [
    {
      name: "createOrder",
      description: "建立訂單（贊助專案，已更新）",
      method: "POST",
      requiresAuth: true,
      parameters: [
        {
          name: "orderData",
          type: "Object",
          required: true,
          description: "訂單資料",
        },
        {
          name: "userId",
          type: "string",
          required: true,
          description: "使用者 ID",
        },
      ],
      exampleRequest: {
        orderData: {
          project_id: "project-uuid",
          reward_tier_id: "reward-uuid",
          amount: 1000,
          shipping_name: "王小明",
          shipping_address: "台北市...",
          note: "請於下午配送",
          invoice_carrier: "/AB12345",
        },
        userId: "user-uuid",
      },
      exampleResponse: { id: "order-uuid", status: "pending" },
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        {
          code: 400,
          message: "Bad Request",
          description: "訂單資料格式錯誤或必填欄位缺失",
        },
        {
          code: 404,
          message: "Not Found",
          description: "找不到專案或回饋方案",
        },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "getOrdersByUser",
      description: "取得使用者的所有訂單",
      method: "GET",
      requiresAuth: true,
      parameters: [
        {
          name: "userId",
          type: "string",
          required: true,
          description: "使用者 ID",
        },
        {
          name: "filters",
          type: "Object",
          required: false,
          description: "篩選條件",
        },
      ],
      exampleRequest: { userId: "user-uuid" },
      exampleResponse: [],
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 404, message: "Not Found", description: "找不到使用者" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "getOrdersByProject",
      description: "取得專案的所有訂單（創建者）",
      method: "GET",
      requiresAuth: true,
      parameters: [
        {
          name: "projectId",
          type: "string",
          required: true,
          description: "專案 ID",
        },
      ],
      exampleRequest: { projectId: "project-uuid" },
      exampleResponse: [],
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 404, message: "Not Found", description: "找不到專案" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "updateOrderStatus",
      description: "更新訂單狀態",
      method: "PUT",
      requiresAuth: true,
      parameters: [
        { name: "id", type: "string", required: true, description: "訂單 ID" },
        {
          name: "status",
          type: "string",
          required: true,
          description: "新狀態 (pending/paid/refunded/cancelled)",
        },
      ],
      exampleRequest: { id: "order-uuid", status: "paid" },
      exampleResponse: { id: "order-uuid", status: "paid" },
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 404, message: "Not Found", description: "找不到訂單" },
        { code: 400, message: "Bad Request", description: "狀態值無效" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "updateOrderNote",
      description: "更新訂單備註（新增）",
      method: "PUT",
      requiresAuth: true,
      parameters: [
        { name: "id", type: "string", required: true, description: "訂單 ID" },
        {
          name: "note",
          type: "string",
          required: true,
          description: "訂單備註",
        },
      ],
      exampleRequest: {
        id: "order-uuid",
        note: "請於下午配送，謝謝！",
      },
      exampleResponse: { id: "order-uuid", note: "請於下午配送，謝謝！" },
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 404, message: "Not Found", description: "找不到訂單" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "updateInvoiceCarrier",
      description: "更新電子發票載具（新增）",
      method: "PUT",
      requiresAuth: true,
      parameters: [
        { name: "id", type: "string", required: true, description: "訂單 ID" },
        {
          name: "invoiceCarrier",
          type: "string",
          required: true,
          description: "發票載具代碼",
        },
      ],
      exampleRequest: {
        id: "order-uuid",
        invoiceCarrier: "/AB12345",
      },
      exampleResponse: { id: "order-uuid", invoice_carrier: "/AB12345" },
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 404, message: "Not Found", description: "找不到訂單" },
        { code: 400, message: "Bad Request", description: "載具格式錯誤" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "updateOrderDetails",
      description: "一次更新多個訂單欄位（新增）",
      method: "PUT",
      requiresAuth: true,
      parameters: [
        { name: "id", type: "string", required: true, description: "訂單 ID" },
        {
          name: "updates",
          type: "Object",
          required: true,
          description: "更新內容",
        },
      ],
      exampleRequest: {
        id: "order-uuid",
        updates: {
          note: "請於下午配送",
          invoice_carrier: "/AB12345",
          shipping_name: "王小明",
        },
      },
      exampleResponse: {
        id: "order-uuid",
        note: "請於下午配送",
        invoice_carrier: "/AB12345",
        shipping_name: "王小明",
      },
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 404, message: "Not Found", description: "找不到訂單" },
        { code: 400, message: "Bad Request", description: "更新資料格式錯誤" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
  ],
  favorites: [
    {
      name: "addFavorite",
      description: "加入收藏",
      method: "POST",
      requiresAuth: true,
      parameters: [
        {
          name: "userId",
          type: "string",
          required: true,
          description: "使用者 ID",
        },
        {
          name: "projectId",
          type: "string",
          required: true,
          description: "專案 ID",
        },
      ],
      exampleRequest: { userId: "user-uuid", projectId: "project-uuid" },
      exampleResponse: { id: "favorite-uuid" },
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 404, message: "Not Found", description: "找不到使用者或專案" },
        { code: 400, message: "Bad Request", description: "已經在收藏列表中" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "removeFavorite",
      description: "移除收藏",
      method: "DELETE",
      requiresAuth: true,
      parameters: [
        {
          name: "userId",
          type: "string",
          required: true,
          description: "使用者 ID",
        },
        {
          name: "projectId",
          type: "string",
          required: true,
          description: "專案 ID",
        },
      ],
      exampleRequest: { userId: "user-uuid", projectId: "project-uuid" },
      exampleResponse: { id: "favorite-uuid" },
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 404, message: "Not Found", description: "找不到收藏記錄" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "getFavoritesByUser",
      description: "取得使用者的收藏列表",
      method: "GET",
      requiresAuth: true,
      parameters: [
        {
          name: "userId",
          type: "string",
          required: true,
          description: "使用者 ID",
        },
      ],
      exampleRequest: { userId: "user-uuid" },
      exampleResponse: [],
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 404, message: "Not Found", description: "找不到使用者" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "toggleFavorite",
      description: "切換收藏狀態",
      method: "POST",
      requiresAuth: true,
      parameters: [
        {
          name: "userId",
          type: "string",
          required: true,
          description: "使用者 ID",
        },
        {
          name: "projectId",
          type: "string",
          required: true,
          description: "專案 ID",
        },
      ],
      exampleRequest: { userId: "user-uuid", projectId: "project-uuid" },
      exampleResponse: { action: "added", favorited: true },
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 404, message: "Not Found", description: "找不到使用者或專案" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
  ],
  interactions: [
    {
      name: "createInteraction",
      description: "建立留言或問題",
      method: "POST",
      requiresAuth: true,
      parameters: [
        {
          name: "interactionData",
          type: "Object",
          required: true,
          description: "互動資料",
        },
        {
          name: "userId",
          type: "string",
          required: true,
          description: "使用者 ID",
        },
      ],
      exampleRequest: {
        interactionData: {
          project_id: "project-uuid",
          type: "comment",
          content: "很棒的專案！",
        },
        userId: "user-uuid",
      },
      exampleResponse: { id: "interaction-uuid" },
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 404, message: "Not Found", description: "找不到專案" },
        { code: 400, message: "Bad Request", description: "互動資料格式錯誤" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "getComments",
      description: "取得專案的留言",
      method: "GET",
      requiresAuth: false,
      parameters: [
        {
          name: "projectId",
          type: "string",
          required: true,
          description: "專案 ID",
        },
      ],
      exampleRequest: { projectId: "project-uuid" },
      exampleResponse: [],
      errorResponses: [
        { code: 404, message: "Not Found", description: "找不到專案" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "getQA",
      description: "取得專案的問答",
      method: "GET",
      requiresAuth: false,
      parameters: [
        {
          name: "projectId",
          type: "string",
          required: true,
          description: "專案 ID",
        },
      ],
      exampleRequest: { projectId: "project-uuid" },
      exampleResponse: [],
      errorResponses: [
        { code: 404, message: "Not Found", description: "找不到專案" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "replyToInteraction",
      description: "回覆留言或問題",
      method: "POST",
      requiresAuth: true,
      parameters: [
        {
          name: "replyData",
          type: "Object",
          required: true,
          description: "回覆資料",
        },
        {
          name: "userId",
          type: "string",
          required: true,
          description: "使用者 ID",
        },
      ],
      exampleRequest: {
        replyData: {
          project_id: "project-uuid",
          parent_id: "interaction-uuid",
          content: "謝謝支持！",
        },
        userId: "user-uuid",
      },
      exampleResponse: { id: "reply-uuid" },
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        {
          code: 404,
          message: "Not Found",
          description: "找不到原始留言或專案",
        },
        { code: 400, message: "Bad Request", description: "回覆資料格式錯誤" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
  ],
  users: [
    {
      name: "getUserProfile",
      description: "取得使用者個人資料",
      method: "GET",
      requiresAuth: false,
      parameters: [
        {
          name: "userId",
          type: "string",
          required: true,
          description: "使用者 ID",
        },
      ],
      exampleRequest: { userId: "user-uuid" },
      exampleResponse: {
        id: "user-uuid",
        display_name: "王小明",
        avatar_url: "https://...",
        bio: "個人簡介",
      },
      errorResponses: [
        { code: 404, message: "Not Found", description: "找不到使用者" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "updateUserProfile",
      description: "更新個人資料",
      method: "PUT",
      requiresAuth: true,
      parameters: [
        {
          name: "userId",
          type: "string",
          required: true,
          description: "使用者 ID",
        },
        {
          name: "updates",
          type: "Object",
          required: true,
          description: "更新內容",
        },
      ],
      exampleRequest: {
        userId: "user-uuid",
        updates: { display_name: "新名稱" },
      },
      exampleResponse: { id: "user-uuid", display_name: "新名稱" },
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 404, message: "Not Found", description: "找不到使用者" },
        { code: 400, message: "Bad Request", description: "更新資料格式錯誤" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "getUserProjects",
      description: "取得使用者建立的專案",
      method: "GET",
      requiresAuth: false,
      parameters: [
        {
          name: "userId",
          type: "string",
          required: true,
          description: "使用者 ID",
        },
      ],
      exampleRequest: { userId: "user-uuid" },
      exampleResponse: [],
      errorResponses: [
        { code: 404, message: "Not Found", description: "找不到使用者" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "getUserStats",
      description: "取得使用者統計資訊",
      method: "GET",
      requiresAuth: false,
      parameters: [
        {
          name: "userId",
          type: "string",
          required: true,
          description: "使用者 ID",
        },
      ],
      exampleRequest: { userId: "user-uuid" },
      exampleResponse: {
        projectsCreated: 5,
        projectsBacked: 12,
        favoriteCount: 8,
        totalBacked: 15000,
      },
      errorResponses: [
        { code: 404, message: "Not Found", description: "找不到使用者" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "getCategories",
      description: "取得所有分類（向後兼容）",
      method: "GET",
      requiresAuth: false,
      parameters: [],
      exampleRequest: {},
      exampleResponse: [{ id: "cat-uuid", name: "科技", slug: "technology" }],
      errorResponses: [
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
  ],
  admin: [
    {
      name: "getAllUsers",
      description: "取得所有使用者（管理員）",
      method: "GET",
      requiresAuth: true,
      parameters: [
        {
          name: "filters",
          type: "Object",
          required: false,
          description: "篩選條件",
        },
      ],
      exampleRequest: { filters: { role: "creator" } },
      exampleResponse: [],
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 403, message: "Forbidden", description: "非管理員帳號" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "getAllProjects",
      description: "取得所有專案（管理員）",
      method: "GET",
      requiresAuth: true,
      parameters: [
        {
          name: "filters",
          type: "Object",
          required: false,
          description: "篩選條件",
        },
      ],
      exampleRequest: { filters: { status: "reviewing" } },
      exampleResponse: [],
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 403, message: "Forbidden", description: "非管理員帳號" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "updateProjectStatus",
      description: "更新專案狀態（管理員）",
      method: "PUT",
      requiresAuth: true,
      parameters: [
        { name: "id", type: "string", required: true, description: "專案 ID" },
        {
          name: "status",
          type: "string",
          required: true,
          description: "新狀態",
        },
      ],
      exampleRequest: { id: "project-uuid", status: "active" },
      exampleResponse: { id: "project-uuid", status: "active" },
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 403, message: "Forbidden", description: "非管理員帳號" },
        { code: 404, message: "Not Found", description: "找不到專案" },
        { code: 400, message: "Bad Request", description: "狀態值無效" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "getPlatformStats",
      description: "取得平台統計資訊",
      method: "GET",
      requiresAuth: true,
      parameters: [],
      exampleRequest: {},
      exampleResponse: {
        totalUsers: 1000,
        totalProjects: 250,
        activeProjects: 50,
        totalRevenue: 5000000,
      },
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 403, message: "Forbidden", description: "非管理員帳號" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
    {
      name: "getAllOrders",
      description: "取得所有訂單（管理員）",
      method: "GET",
      requiresAuth: true,
      parameters: [
        {
          name: "filters",
          type: "Object",
          required: false,
          description: "篩選條件",
        },
      ],
      exampleRequest: { filters: { status: "paid" } },
      exampleResponse: [],
      errorResponses: [
        { code: 401, message: "Unauthorized", description: "未登入或無權限" },
        { code: 403, message: "Forbidden", description: "非管理員帳號" },
        {
          code: 500,
          message: "Internal Server Error",
          description: "伺服器錯誤",
        },
      ],
    },
  ],
};
