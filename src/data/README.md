# PROJECTS 資料結構

## 一、PROJECTS（專案主表）

| 欄位名稱          | 資料型別      | 必填 | 說明                           | 範例值                               |
| ----------------- | ------------- | ---- | ------------------------------ | ------------------------------------ |
| id                | VARCHAR(50)   | ✓    | 專案唯一識別碼 (PK)            | proj_001                             |
| title             | VARCHAR(200)  | ✓    | 專案標題                       | AdPrompt Lab - AI 廣告文案提示詞大全 |
| owner_id          | VARCHAR(50)   | ✓    | 專案擁有者ID（外鍵連接用戶表） | user_001                             |
| owner_name        | VARCHAR(100)  | ✓    | 專案擁有者姓名                 | 江戶川柯南                           |
| introduction      | TEXT          | ✓    | 專案簡介（500字內）            | 專為社群經營者、電商老闆量身打造...  |
| cover_image       | VARCHAR(500)  | ✓    | 專案封面圖路徑                 | ./images/project-adprompt.webp       |
| target_amount     | DECIMAL(10,2) | ✓    | 募資目標金額（NT$）            | 109835.00                            |
| current_amount    | DECIMAL(10,2) |      | 目前募資金額（NT$），預設0     | 859618.00                            |
| short_description |               |      | 首頁顯示的說明                 |                                      |
| donor_count       | INT           |      | 贊助人數，預設0                | 256                                  |
| start_date        | DATETIME      | ✓    | 募資開始時間                   | 2025-09-18 12:00:00                  |
| end_date          | DATETIME      | ✓    | 募資結束時間                   | 2025-12-23 23:59:59                  |
| status            | ENUM          | ✓    | 專案狀態                       | active                               |
| created_at        | DATETIME      |      | 建立時間（系統自動）           | 2025-09-01 10:00:00                  |
| updated_at        | DATETIME      |      | 更新時間（系統自動）           | 2025-10-28 15:30:00                  |

**status 狀態值說明：**

- `draft`：草稿（尚未提交）
- `reviewing`：審核中
- `active`：募資進行中
- `ended`：募資已結束
- `successful`：募資成功
- `failed`：募資失敗

---

## 二、PROJECT_TAGS（專案標籤）

- TAGS

| 欄位名稱 | 資料型別    | 必填 | 說明                        | 範例值   |
| -------- | ----------- | ---- | --------------------------- | -------- |
| id       | INT         | ✓    | 標籤ID (PK, Auto Increment) | 1        |
| tag_name | VARCHAR(50) | ✓    | 標籤名稱                    | 教育學習 |

- PROJECT_TAGS（專案標籤）

| 欄位名稱   | 資料型別    | 必填 | 說明            | 範例值   |
| ---------- | ----------- | ---- | --------------- | -------- |
| project_id | VARCHAR(50) | ✓    | 對應 project.id | proj_001 |
| tag_id     | VARCHAR(50) | ✓    | 對應 tags.id    | 教育學習 |

---

## 三、PROJECT_SOCIAL_MEDIA（社群媒體連結）

| 欄位名稱      | 資料型別     | 必填 | 說明                            | 範例值                           |
| ------------- | ------------ | ---- | ------------------------------- | -------------------------------- |
| id            | INT          | ✓    | 社群連結ID (PK, Auto Increment) | 1                                |
| project_id    | VARCHAR(50)  | ✓    | 所屬專案ID (FK)                 | proj_001                         |
| platform      | VARCHAR(50)  | ✓    | 社群平台名稱                    | facebook                         |
| url           | VARCHAR(500) |      | 社群連結網址                    | https://facebook.com/adpromptlab |
| icon_path     | VARCHAR(200) |      | 圖示路徑                        | ./icons/facebook.svg             |
| display_order | INT          |      | 顯示順序                        | 1                                |

**platform 平台選項：**

- facebook
- instagram
- threads
- x (Twitter)
- mail
- youtube
- linkedin
- line

---

## 四、PRICING_PLANS（募資方案）

| 欄位名稱           | 資料型別      | 必填 | 說明                       | 範例值                                |
| ------------------ | ------------- | ---- | -------------------------- | ------------------------------------- |
| id                 | VARCHAR(50)   | ✓    | 方案ID (PK)                | plan_001_001                          |
| project_id         | VARCHAR(50)   | ✓    | 所屬專案ID (FK)            | proj_001                              |
| title              | VARCHAR(200)  | ✓    | 方案標題                   | 入門探索方案                          |
| subtitle           | VARCHAR(200)  |      | 方案副標題                 | 限量試玩價                            |
| cover_image        | VARCHAR(500)  | ✓    | 方案封面圖                 | ./images/productDetail/package-1.webp |
| selling_price      | DECIMAL(10,2) | ✓    | 販售價格（NT$）            | 880.00                                |
| list_price         | DECIMAL(10,2) |      | 原價（顯示折扣用）         | 1480.00                               |
| sponsored_count    | INT           |      | 已贊助數量，預設0          | 36                                    |
| total_quota        | INT           |      | 限量配額（NULL表示無限量） | 60                                    |
| estimated_delivery | VARCHAR(100)  | ✓    | 預計交付時間               | 2026 年 3 月初                        |
| recommended_to     | TEXT          |      | 推薦對象描述               | 想搶先體驗提示詞工具的新手創作者...   |
| display_order      | INT           |      | 顯示順序                   | 1                                     |
| is_active          | BOOLEAN       |      | 是否啟用，預設TRUE         | TRUE                                  |
| created_at         | DATETIME      |      | 建立時間（系統自動）       | 2025-09-01 10:00:00                   |
| updated_at         | DATETIME      |      | 更新時間（系統自動）       | 2025-10-28 15:30:00                   |

**用途說明：**

- 一個專案可以有多個方案（1:N）
- `sponsored_count` 和 `total_quota` 用於顯示「已售/總量」
- `display_order` 控制方案在頁面上的排序

---

## 五、PLAN_CONTENTS（方案內容）🌲

| 欄位名稱      | 資料型別     | 必填 | 說明                          | 範例值                             |
| ------------- | ------------ | ---- | ----------------------------- | ---------------------------------- |
| id            | VARCHAR(50)  | ✓    | 內容ID (PK)                   | pc_001_001_g1                      |
| plan_id       | VARCHAR(50)  | ✓    | 所屬方案ID (FK)               | plan_001_001                       |
| parent_id     | VARCHAR(50)  |      | 父節點ID (FK，NULL表示根節點) | NULL                               |
| content_type  | ENUM         | ✓    | 內容類型                      | group                              |
| title         | VARCHAR(200) |      | 標題（用於群組）              | 方案內容                           |
| content       | TEXT         |      | 內容文字                      | AdPrompt Lab 精選提示詞 PDF x 1 份 |
| icon_path     | VARCHAR(200) |      | 圖示路徑（群組用）            | ./icons/package.svg                |
| display_order | INT          |      | 顯示順序                      | 1                                  |

**content_type 類型說明：**

- `group`：群組（第一層）- 有 title 和 icon_path
- `item`：項目（第二層）- 有 content
- `detail`：細節（第三層）- 有 content

**樹狀結構範例：**

```
群組 (parent_id = NULL)
├── 項目 (parent_id = 群組ID)
│   ├── 細節 (parent_id = 項目ID)
│   └── 細節 (parent_id = 項目ID)
└── 項目 (parent_id = 群組ID)

```

---

## 六、PLAN_HIGHLIGHTS（方案特色）

| 欄位名稱      | 資料型別    | 必填 | 說明                        | 範例值       |
| ------------- | ----------- | ---- | --------------------------- | ------------ |
| id            | INT         | ✓    | 特色ID (PK, Auto Increment) | 1            |
| plan_id       | VARCHAR(50) | ✓    | 所屬方案ID (FK)             | plan_001_001 |
| emoji         | VARCHAR(10) |      | Emoji 符號                  | ✅           |
| content       | TEXT        | ✓    | 特色內容                    | 可開立收據   |
| display_order | INT         |      | 顯示順序                    | 1            |

**用途說明：**

- 顯示方案的重要特色或注意事項
- 通常顯示在方案卡片底部
- 使用 emoji 提升視覺效果

---

## 七、PRODUCT_DETAILS（產品詳細說明）

| 欄位名稱      | 資料型別     | 必填 | 說明                 | 範例值              |
| ------------- | ------------ | ---- | -------------------- | ------------------- |
| id            | VARCHAR(50)  | ✓    | 詳情ID (PK)          | pd_001_001          |
| project_id    | VARCHAR(50)  | ✓    | 所屬專案ID (FK)      | proj_001            |
| title         | VARCHAR(200) |      | 模組標題             | 爆款 FB 廣告提示詞  |
| display_order | INT          |      | 顯示順序             | 1                   |
| created_at    | DATETIME     |      | 建立時間（系統自動） | 2025-09-01 10:00:00 |
| updated_at    | DATETIME     |      | 更新時間（系統自動） | 2025-10-28 15:30:00 |

**用途說明：**

- 一個專案可以有多個產品詳情模組（1:N）
- 用於詳細介紹專案的各個功能或產品
- 每個模組包含：圖片、介紹文字、內容結構、強調重點

---

## 八、PRODUCT_DETAIL_IMAGES（產品圖片）

| 欄位名稱      | 資料型別     | 必填 | 說明                        | 範例值                            |
| ------------- | ------------ | ---- | --------------------------- | --------------------------------- |
| id            | INT          | ✓    | 圖片ID (PK, Auto Increment) | 1                                 |
| detail_id     | VARCHAR(50)  | ✓    | 所屬詳情ID (FK)             | pd_001_001                        |
| image_path    | VARCHAR(500) | ✓    | 圖片路徑                    | ./images/productDetail/fb-ad.webp |
| alt_text      | VARCHAR(200) |      | 圖片替代文字（無障礙）      | fb-ad                             |
| display_order | INT          |      | 顯示順序                    | 1                                 |

**用途說明：**

- 一個產品詳情可以有多張圖片（1:N）
- 支援圖片輪播或並排顯示
- `alt_text` 用於 SEO 和無障礙

---

## 九、PRODUCT_INTRODUCTIONS（產品介紹段落）

| 欄位名稱      | 資料型別    | 必填 | 說明                        | 範例值                        |
| ------------- | ----------- | ---- | --------------------------- | ----------------------------- |
| id            | INT         | ✓    | 介紹ID (PK, Auto Increment) | 1                             |
| detail_id     | VARCHAR(50) | ✓    | 所屬詳情ID (FK)             | pd_001_001                    |
| introduction  | TEXT        | ✓    | 介紹內容                    | 掌握 Facebook 廣告的第一步... |
| display_order | INT         |      | 顯示順序                    | 1                             |

**用途說明：**

- 一個產品詳情可以有多個介紹段落（1:N）
- 分段顯示，提升閱讀體驗
- 支援富文本格式（可擴展為 HTML）

---

## 十、PRODUCT_CONTENT_SECTIONS（產品內容結構）🌲

| 欄位名稱      | 資料型別     | 必填 | 說明                          | 範例值                     |
| ------------- | ------------ | ---- | ----------------------------- | -------------------------- |
| id            | VARCHAR(50)  | ✓    | 區段ID (PK)                   | pcs_001_001_g1             |
| detail_id     | VARCHAR(50)  | ✓    | 所屬詳情ID (FK)               | pd_001_001                 |
| parent_id     | VARCHAR(50)  |      | 父節點ID (FK，NULL表示根節點) | NULL                       |
| section_type  | ENUM         | ✓    | 區段類型                      | group                      |
| group_name    | VARCHAR(200) |      | 群組名稱                      | 模組亮點                   |
| group_icon    | VARCHAR(200) |      | 群組圖示                      | ./icons/diamond_shine.svg  |
| content       | TEXT         |      | 內容文字                      | 超過 150 組高轉換提示詞... |
| display_order | INT          |      | 顯示順序                      | 1                          |

**section_type 類型說明：**

- `group`：群組（第一層）- 有 group_name 和 group_icon
- `item`：項目（第二層）- 有 content
- `detail`：細節（第三層）- 有 content

**與 PLAN_CONTENTS 的區別：**

- `PLAN_CONTENTS`：用於方案內容（購買內容清單）
- `PRODUCT_CONTENT_SECTIONS`：用於產品說明（功能特色介紹）

---

## 十一、PRODUCT_EMPHASIZE（產品強調重點）

| 欄位名稱      | 資料型別     | 必填 | 說明                        | 範例值                       |
| ------------- | ------------ | ---- | --------------------------- | ---------------------------- |
| id            | INT          | ✓    | 重點ID (PK, Auto Increment) | 1                            |
| detail_id     | VARCHAR(50)  | ✓    | 所屬詳情ID (FK)             | pd_001_001                   |
| emoji         | VARCHAR(10)  |      | Emoji 符號                  | 👉                           |
| icon_path     | VARCHAR(200) |      | 圖示路徑                    | ./icons/lightbulb_yellow.svg |
| icon_alt      | VARCHAR(100) |      | 圖示替代文字                | lightbulb_yellow             |
| content       | TEXT         | ✓    | 重點內容                    | 不用再苦想廣告文案...        |
| display_order | INT          |      | 顯示順序                    | 1                            |

**用途說明：**

- 顯示產品的核心賣點或關鍵優勢
- 通常以醒目的方式呈現（背景色、邊框等）
- 可同時使用 emoji 和 icon 增強視覺效果

---

## 十二、RISKS_CHALLENGES（風險與挑戰總述）

| 欄位名稱   | 資料型別    | 必填 | 說明                    | 範例值                          |
| ---------- | ----------- | ---- | ----------------------- | ------------------------------- |
| id         | INT         | ✓    | ID (PK, Auto Increment) | 1                               |
| project_id | VARCHAR(50) | ✓    | 所屬專案ID (FK)         | proj_001                        |
| preface    | TEXT        | ✓    | 風險前言                | 本次《AdPrompt Lab》旨在幫助... |
| disclosure | TEXT        | ✓    | 風險聲明                | 專案可能遇到各種不可控因素...   |

**用途說明：**

- 一個專案對應一筆風險總述（1:1）
- `preface`：說明專案背景和潛在風險
- `disclosure`：法律聲明和風險承擔說明

---

## 十三、RISK_ITEMS（風險項目）

| 欄位名稱         | 資料型別     | 必填 | 說明            | 範例值                    |
| ---------------- | ------------ | ---- | --------------- | ------------------------- |
| id               | VARCHAR(50)  | ✓    | 風險項目ID (PK) | risk_001_001              |
| project_id       | VARCHAR(50)  | ✓    | 所屬專案ID (FK) | proj_001                  |
| title            | VARCHAR(200) | ✓    | 風險標題        | 1. 課程與檔案交付延遲     |
| risk_description | TEXT         | ✓    | 風險說明        | 雖然我們已規劃電子檔案... |
| countermeasures  | TEXT         | ✓    | 因應措施        | 將分批釋出數位資源...     |
| display_order    | INT          |      | 顯示順序        | 1                         |

**用途說明：**

- 一個專案可以有多個風險項目（1:N）
- 詳細列出各項風險及對應的解決方案
- 提升專案透明度和可信度

---

## 資料表關聯總覽

```
📦 PROJECTS (專案主表)
│
├─🏷️  PROJECT_TAGS (標籤) [1:N]
├─🔗 PROJECT_SOCIAL_MEDIA (社群媒體) [1:N]
│
├─💰 PRICING_PLANS (方案) [1:N]
│  ├─📋 PLAN_CONTENTS (方案內容) [1:N] 🌲
│  └─⭐ PLAN_HIGHLIGHTS (方案特色) [1:N]
│
├─📱 PRODUCT_DETAILS (產品詳情) [1:N]
│  ├─🖼️  PRODUCT_DETAIL_IMAGES (圖片) [1:N]
│  ├─📝 PRODUCT_INTRODUCTIONS (介紹) [1:N]
│  ├─📊 PRODUCT_CONTENT_SECTIONS (內容結構) [1:N] 🌲
│  └─💡 PRODUCT_EMPHASIZE (強調重點) [1:N]
│
└─⚠️  RISKS & CHALLENGES (風險)
   ├─📄 RISKS_CHALLENGES (總述) [1:1]
   └─📑 RISK_ITEMS (項目) [1:N]

🌲 = 樹狀結構（自關聯）

```

## 欄位設計原則

### 1️⃣ **命名規範**

- 使用 snake_case（小寫+底線）
- 清楚表達欄位用途
- 關聯表包含主表名稱

### 2️⃣ **資料型別選擇**

- **VARCHAR**：限定長度的字串（ID、標題、路徑）
- **TEXT**：不限長度的文字（介紹、描述）
- **DECIMAL(10,2)**：金額（精確計算）
- **INT**：整數（數量、排序）
- **DATETIME**：日期時間（精確到秒）
- **BOOLEAN**：布林值（是/否）
- **ENUM**：列舉值（固定選項）

### 3️⃣ **必填欄位設計**

- 業務核心欄位：必填 ✓
- 輔助或擴展欄位：選填
- 系統自動產生：選填（預設值）

### 4️⃣ **display_order 使用場景**

- 控制顯示順序
- 支援拖拉排序
- 預設值建議從 1 開始遞增

### 5️⃣ **樹狀結構設計**

- 使用 `parent_id` 自關聯
- `parent_id = NULL` 表示根節點
- 配合 `content_type/section_type` 區分層級
