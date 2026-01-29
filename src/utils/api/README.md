# API 使用指南

Prompt Starter 專案的 API 層統一文件。

## 📁 目錄結構

```
/src/utils/api/
├── README.md                 # 本文件
├── api.js                    # API 統一入口
├── apiData.js                # API 文件資料（供後台展示）
├── apiResponseHelper.js      # API 回應格式化工具
├── supabaseClient.js         # Supabase 客戶端設定
├── supabase/                 # Supabase API 實作
│   ├── index.js             # 統一導出
│   ├── products.js          # 專案 API
│   ├── rewards.js           # 回饋方案 API
│   ├── tags.js              # 標籤 API
│   ├── orders.js            # 訂單 API
│   ├── favorites.js         # 收藏 API
│   ├── interactions.js      # 互動（留言/問答）API
│   ├── users.js             # 使用者 API
│   └── admin.js             # 管理後台 API
└── transformers/            # 資料轉換層
    ├── index.js             # 統一導出
    ├── projectDetailTransformer.js  # 專案資料轉換
    └── rewardTransformer.js         # 回饋方案資料轉換
```

---

## 🚀 快速開始

### 基本使用

```javascript
import * as api from '@/utils/api';

// 取得專案列表
const { data, error } = await api.getProjects();

if (error) {
  console.error('錯誤:', error);
  return;
}

console.log('專案列表:', data);
```

### 使用資料轉換層

```javascript
import { getProjectById } from '@/utils/api';
import { transformToProductDetailCard } from '@/utils/api/transformers';

// 取得專案資料
const { data: project } = await getProjectById(projectId);

// 轉換為頁面格式
const cardData = transformToProductDetailCard(project);
```

---

## 📦 API 分類

### 1. Projects / Products API

專案與商品相關的所有操作。

#### 方法列表

| 方法名稱 | 說明 | 需要登入 |
|---------|------|---------|
| `getProjects(filters)` | 取得專案列表（支援篩選） | ❌ |
| `getProjectById(id)` | 取得單一專案詳細資訊 | ❌ |
| `getProjectBySlug(slug)` | 透過 slug 取得專案 | ❌ |
| `getFeaturedProjects(limit)` | 取得精選專案（Banner 用） | ❌ |
| `getHotProjects(limit)` | 取得熱門專案（依贊助人數） | ❌ |
| `getProjectStats(id)` | 取得專案統計資料 | ❌ |
| `createProject(data, userId, ownerName)` | 建立新專案 | ✅ |
| `updateProject(id, updates)` | 更新專案資訊 | ✅ |
| `updateProjectSocialMedia(id, socialMedia)` | 更新社群媒體連結 | ✅ |
| `deleteProject(id)` | 刪除專案（軟刪除） | ✅ |

#### 使用範例

```javascript
// 取得專案列表（帶篩選）
const { data } = await api.getProjects({
  search: 'AI',
  tags: ['tag-id-1', 'tag-id-2'],
  status: 'active',
  limit: 10,
  offset: 0
});

// 取得精選專案（首頁 Banner）
const { data: featured } = await api.getFeaturedProjects(4);

// 取得熱門專案（首頁熱門募集）
const { data: hot } = await api.getHotProjects(5);

// 取得專案詳細資訊（包含詳細內容區塊）
const { data: project } = await api.getProjectById('project-uuid');
// project.detail_sections - 詳細內容區塊
// project.reward_tiers - 回饋方案
// project.creator - 創建者資訊
```

#### 資料結構

**Projects Table 主要欄位**：

```typescript
{
  id: string;                    // UUID
  creator_id: string;            // 創建者 ID
  category_id: string;           // 分類 ID（可為 null）
  title: string;                 // 專案標題
  slug: string;                  // URL 友善名稱
  tagline: string;               // 簡短標語
  description: string;           // 完整說明
  cover_image_url: string;       // 封面圖片
  cover_image_alt: string;       // 圖片替代文字
  video_url: string;             // 影片連結
  goal_amount: number;           // 目標金額
  current_amount: number;        // 當前募資金額
  currency: string;              // 幣別（預設 TWD）
  backers_count: number;         // 贊助人數
  start_date: timestamp;         // 開始時間
  end_date: timestamp;           // 結束時間
  status: 'draft' | 'active' | 'funded' | 'failed';  // 狀態
  introduction: string;          // 專案介紹
  risks_and_challenges: string;  // 風險與挑戰
  declaration: string;           // 聲明
  creator_intro: string;         // 創建者介紹
  refund_policy: string;         // 退款政策
  customer_service: string;      // 客服資訊
  social_media: jsonb;           // 社群媒體連結
  owner_name: string;            // 創建者名稱
  is_featured: boolean;          // 是否為精選
  featured_order: number;        // 精選排序
  created_at: timestamp;
  updated_at: timestamp;
  deleted_at: timestamp;         // 軟刪除
}
```

**關聯資料**：

- `detail_sections` - 專案詳細內容區塊
  - `images` - 詳細圖片
  - `paragraphs` - 段落內容
  - `content_groups` - 內容分組
    - `items` - 內容項目（樹狀結構）
  - `highlights` - 強調內容
- `project_tags` - 專案標籤（多對多）
- `reward_tiers` - 回饋方案
- `creator` - 創建者資訊（profiles）

---

### 2. Rewards API

回饋方案相關操作。

#### 方法列表

| 方法名稱 | 說明 | 需要登入 |
|---------|------|---------|
| `getRewardsByProject(projectId)` | 取得專案的所有回饋方案 | ❌ |
| `getRewardById(id)` | 取得單一回饋方案 | ❌ |
| `isRewardAvailable(id)` | 檢查方案是否可購買 | ❌ |
| `calculateDiscount(reward)` | 計算折扣百分比 | ❌ |
| `getRewardWithDiscount(id)` | 取得方案（含折扣資訊） | ❌ |
| `createReward(data)` | 建立新回饋方案 | ✅ |
| `updateReward(id, updates)` | 更新回饋方案 | ✅ |
| `deleteReward(id)` | 刪除回饋方案 | ✅ |
| `claimReward(id)` | 領取方案（增加已領取數） | ✅ |

#### 使用範例

```javascript
// 取得專案的所有回饋方案（包含詳細內容）
const { data: rewards } = await api.getRewardsByProject('project-uuid');
// rewards[0].package_groups - 方案內容分組
// rewards[0].highlights - 強調項目

// 檢查方案是否可購買
const { data: available } = await api.isRewardAvailable('reward-uuid');

// 計算折扣
const discount = api.calculateDiscount({
  amount: 880,
  list_price: 1480
}); // 返回 40 (40% off)
```

#### 資料結構

**Reward Tiers Table 主要欄位**：

```typescript
{
  id: string;                    // UUID
  project_id: string;            // 專案 ID
  title: string;                 // 方案標題
  subtitle: string;              // 副標題
  description: string;           // 方案說明
  amount: number;                // 售價
  list_price: number;            // 原價
  cover_image_url: string;       // 方案圖片
  cover_image_alt: string;       // 圖片替代文字
  recommended_to: string;        // 推薦對象
  total_quantity: number;        // 總數量（null = 無限）
  claimed_quantity: number;      // 已領取數量
  estimated_delivery_date: date; // 預計交付日期
  shipping_info: string;         // 運送資訊
  display_order: number;         // 顯示順序
  is_available: boolean;         // 是否可購買
  created_at: timestamp;
  updated_at: timestamp;
}
```

**關聯資料**：

- `package_groups` - 方案內容分組
  - `items` - 內容項目（樹狀結構）
- `highlights` - 強調項目

---

### 3. Tags API

標籤管理相關操作。

#### 方法列表

| 方法名稱 | 說明 | 需要登入 |
|---------|------|---------|
| `getAllTags()` | 取得所有標籤 | ❌ |
| `getTagById(id)` | 取得單一標籤 | ❌ |
| `getTagBySlug(slug)` | 透過 slug 取得標籤 | ❌ |
| `getProjectsByTag(tagId, limit)` | 取得標籤下的專案 | ❌ |
| `getProjectsByTags(tagIds, limit)` | 取得多個標籤的專案 | ❌ |
| `getProjectTags(projectId)` | 取得專案的所有標籤 | ❌ |
| `addProjectTags(projectId, tagIds)` | 為專案新增標籤 | ✅ |
| `removeProjectTags(projectId, tagIds)` | 移除專案標籤 | ✅ |
| `replaceProjectTags(projectId, tagIds)` | 替換專案標籤 | ✅ |

#### 使用範例

```javascript
// 取得所有標籤
const { data: tags } = await api.getAllTags();

// 取得標籤下的專案
const { data: projects } = await api.getProjectsByTag('tag-uuid', 10);

// 為專案新增標籤
await api.addProjectTags('project-uuid', ['tag-1', 'tag-2']);
```

#### 資料結構

```typescript
{
  id: string;           // UUID
  tag_name: string;     // 標籤名稱
  slug: string;         // URL 友善名稱
  description: string;  // 說明
  icon_url: string;     // 圖示
  created_at: timestamp;
}
```

---

### 4. Orders API

訂單與贊助相關操作。

#### 方法列表

| 方法名稱 | 說明 | 需要登入 |
|---------|------|---------|
| `createOrder(orderData)` | 建立新訂單 | ✅ |
| `getOrdersByUser(userId)` | 取得使用者的所有訂單 | ✅ |
| `getOrdersByProject(projectId)` | 取得專案的所有訂單 | ✅ |
| `getOrderById(id)` | 取得單一訂單 | ✅ |
| `getOrderStats(projectId)` | 取得專案訂單統計 | ✅ |
| `updateOrderStatus(id, status)` | 更新訂單狀態 | ✅ |
| `updateOrderShipping(id, shipping)` | 更新運送資訊 | ✅ |
| `updateOrderNote(id, note)` | 更新訂單備註 | ✅ |
| `updateInvoiceCarrier(id, carrier)` | 更新發票載具 | ✅ |
| `updateOrderDetails(id, updates)` | 更新訂單詳細資訊 | ✅ |
| `cancelOrder(id)` | 取消訂單 | ✅ |

#### 資料結構

```typescript
{
  id: string;
  user_id: string;
  project_id: string;
  reward_tier_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';
  shipping_name: string;
  shipping_email: string;
  shipping_phone: string;
  shipping_address: string;
  payment_method: string;
  payment_transaction_id: string;
  paid_at: timestamp;
  note: string;
  invoice_carrier: string;
  created_at: timestamp;
  updated_at: timestamp;
}
```

---

### 5. Favorites API

收藏與追蹤相關操作。

#### 方法列表

| 方法名稱 | 說明 | 需要登入 |
|---------|------|---------|
| `addFavorite(userId, projectId)` | 新增收藏 | ✅ |
| `removeFavorite(userId, projectId)` | 移除收藏 | ✅ |
| `getFavoritesByUser(userId)` | 取得使用者的收藏列表 | ✅ |
| `isFavorited(userId, projectId)` | 檢查是否已收藏 | ✅ |
| `toggleFavorite(userId, projectId)` | 切換收藏狀態 | ✅ |

---

### 6. Interactions API

留言與問答相關操作。

#### 方法列表

| 方法名稱 | 說明 | 需要登入 |
|---------|------|---------|
| `createInteraction(data)` | 建立新互動（留言/問答） | ✅ |
| `getInteractionsByProject(projectId)` | 取得專案的所有互動 | ❌ |
| `getComments(projectId)` | 取得專案留言 | ❌ |
| `getQA(projectId)` | 取得專案問答 | ❌ |
| `updateInteraction(id, updates)` | 更新互動內容 | ✅ |
| `deleteInteraction(id)` | 刪除互動 | ✅ |
| `replyToInteraction(parentId, content)` | 回覆互動 | ✅ |

#### 資料結構

```typescript
{
  id: string;
  project_id: string;
  user_id: string;
  parent_id: string;        // 父留言 ID（回覆用）
  type: 'comment' | 'qa';   // 類型
  content: string;
  is_creator_reply: boolean;
  created_at: timestamp;
  updated_at: timestamp;
  deleted_at: timestamp;
}
```

---

### 7. Users API

使用者相關操作。

#### 方法列表

| 方法名稱 | 說明 | 需要登入 |
|---------|------|---------|
| `getUserProfile(userId)` | 取得使用者資料 | ✅ |
| `updateUserProfile(userId, updates)` | 更新使用者資料 | ✅ |
| `getUserProjects(userId)` | 取得使用者建立的專案 | ❌ |
| `getUserBackedProjects(userId)` | 取得使用者贊助的專案 | ✅ |
| `getUserStats(userId)` | 取得使用者統計資料 | ✅ |
| `getCategories()` | 取得所有分類 | ❌ |

#### 資料結構

```typescript
{
  id: string;
  email: string;
  display_name: string;
  avatar_url: string;
  bio: string;
  role: 'user' | 'creator' | 'admin';
  created_at: timestamp;
  updated_at: timestamp;
}
```

---

### 8. Admin API

管理後台相關操作（需要 admin 權限）。

#### 方法列表

| 方法名稱 | 說明 | 需要登入 |
|---------|------|---------|
| `getAllUsers()` | 取得所有使用者 | ✅ Admin |
| `getAllProjects()` | 取得所有專案 | ✅ Admin |
| `getAllOrders()` | 取得所有訂單 | ✅ Admin |
| `updateProjectStatus(id, status)` | 更新專案狀態 | ✅ Admin |
| `updateUserRole(userId, role)` | 更新使用者角色 | ✅ Admin |
| `getPlatformStats()` | 取得平台統計資料 | ✅ Admin |
| `getAnalytics(date)` | 取得分析資料 | ✅ Admin |

---

## 🔄 資料轉換層

### Project Detail Transformers

將資料庫格式轉換為頁面格式。

#### 可用函數

| 函數名稱 | 說明 | 輸入 | 輸出 |
|---------|------|------|------|
| `transformToProductDetailCard(project)` | 轉換為專案卡片格式 | Project 物件 | ProductDetailCard 格式 |
| `transformToProductDetails(sections)` | 轉換為詳細內容格式 | Detail Sections 陣列 | ProductDetailItem 格式 |
| `transformRisksAndChallenges(text)` | 轉換風險與挑戰 | 文字 | 格式化物件 |
| `calculateDaysLeft(endDate)` | 計算剩餘天數 | 日期字串 | 天數 |
| `calculateFundingPercentage(current, goal)` | 計算達成百分比 | 兩個數字 | 百分比 |
| `formatThousands(num)` | 格式化千分位 | 數字 | 格式化字串 |

#### 使用範例

```javascript
import {
  transformToProductDetailCard,
  transformToProductDetails,
  calculateDaysLeft,
  formatThousands
} from '@/utils/api/transformers';

// 取得專案
const { data: project } = await getProjectById(id);

// 轉換為卡片格式
const cardData = transformToProductDetailCard(project);
// {
//   img: string,
//   tag: Array<{id, tag}>,
//   title: string,
//   owner: string,
//   targetCrowdfundingAmount: number,
//   currentCrowdfundingAmount: number,
//   donors: number,
//   introduction: string,
//   crowdfundingStartDate: string,
//   crowdfundingEndDate: string,
//   socialMedia: Array<{id, name, img, to}>
// }

// 轉換詳細內容
const details = transformToProductDetails(project.detail_sections);

// 計算剩餘天數
const daysLeft = calculateDaysLeft(project.end_date);

// 格式化金額
const formattedAmount = formatThousands(75000); // "75,000"
```

### Reward Transformers

將回饋方案資料轉換為頁面格式。

#### 可用函數

| 函數名稱 | 說明 |
|---------|------|
| `transformToPricingCard(reward)` | 轉換單一回饋方案 |
| `transformToPricingCards(rewards)` | 批量轉換回饋方案 |
| `calculateDiscountPercentage(amount, listPrice)` | 計算折扣百分比 |
| `isRewardAvailable(reward)` | 檢查方案是否可購買 |
| `calculateRemainingQuantity(reward)` | 計算剩餘數量 |

#### 使用範例

```javascript
import {
  transformToPricingCard,
  calculateDiscountPercentage
} from '@/utils/api/transformers';

// 取得回饋方案
const { data: rewards } = await getRewardsByProject(projectId);

// 轉換為定價卡片格式
const pricingCards = rewards.map(r => transformToPricingCard(r));
// {
//   id: string,
//   cardImg: string,
//   imgAlt: string,
//   title: string,
//   subtitle: string,
//   sellingPrice: number,
//   listPrice: number,
//   sponsored: number,
//   sponsorshipsAvailable: number,
//   packageContents: Array,
//   recommendedTo: string,
//   emphasizeContent: Array,
//   estimatedDelivery: string
// }

// 計算折扣
const discount = calculateDiscountPercentage(880, 1480); // 40
```

---

## 📝 API 回應格式

所有 API 都使用統一的回應格式：

```javascript
{
  data: any,      // 成功時的資料
  error: {        // 錯誤時的資訊
    code: string,
    message: string,
    details: any
  }
}
```

### 使用範例

```javascript
const { data, error } = await api.getProjects();

if (error) {
  // 處理錯誤
  console.error('錯誤代碼:', error.code);
  console.error('錯誤訊息:', error.message);
  return;
}

// 使用資料
console.log('專案列表:', data);
```

### 常見錯誤代碼

| 代碼 | 說明 |
|-----|------|
| `REQUIRED_FIELD` | 必填欄位缺失 |
| `NOT_FOUND` | 找不到資源 |
| `UNAUTHORIZED` | 未授權 |
| `INVALID_AMOUNT` | 金額無效 |
| `INSUFFICIENT_STOCK` | 庫存不足 |

---

## 🎯 最佳實踐

### 1. 錯誤處理

```javascript
const { data, error } = await api.getProjects();

if (error) {
  // 根據錯誤類型處理
  switch (error.code) {
    case 'UNAUTHORIZED':
      // 導向登入頁
      break;
    case 'NOT_FOUND':
      // 顯示 404 頁面
      break;
    default:
      // 顯示通用錯誤訊息
  }
  return;
}

// 使用資料
```

### 2. 使用資料轉換層

```javascript
// ✅ 推薦：使用轉換層
import { getProjectById } from '@/utils/api';
import { transformToProductDetailCard } from '@/utils/api/transformers';

const { data } = await getProjectById(id);
const cardData = transformToProductDetailCard(data);

// ❌ 不推薦：手動轉換
const cardData = {
  img: data.cover_image_url,
  title: data.title,
  // ... 手動對應所有欄位
};
```

---


## 🔄 更新日誌

### v2.0 (2026-01-29)
- ✅ 移除 Mock API 支援
- ✅ 新增 `getHotProjects` API
- ✅ 新增資料轉換層
- ✅ 更新 `getProjectById` 包含詳細內容
- ✅ 更新 `getRewardsByProject` 包含方案詳細內容
- ✅ 建立統一導出 (index.js)

### v1.0
- 初始版本
- 支援 Mock / Supabase 切換

---

## 💡 提示

1. **使用 API 入口**：統一從 `@/utils/api` 導入，不要直接從 `supabase/` 導入
2. **使用轉換層**：讓資料格式轉換邏輯集中管理
3. **錯誤處理**：永遠檢查 `error` 欄位
4. **查看文件**：訪問 `/api` 路徑查看互動式 API 文件

---

**最後更新**: 2026-01-29
**維護者**: Prompt Starter Team
