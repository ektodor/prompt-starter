/**
 * API Response Helper
 * 統一處理 API 回應格式，確保所有 API 回傳一致的格式
 * 
 * 標準回應格式：
 * 成功: { data: any, error: null }
 * 失敗: { data: null, error: { message, code, status, details } }
 */

/**
 * 格式化成功回應
 * @param {*} data - 回應資料
 * @returns {{data: *, error: null}}
 */
export const successResponse = (data) => {
  return { data, error: null };
};

/**
 * 格式化錯誤回應
 * @param {string} message - 錯誤訊息
 * @param {string} code - 錯誤代碼
 * @param {number} status - HTTP 狀態碼
 * @param {*} details - 額外錯誤詳情
 * @returns {{data: null, error: {message: string, code: string, status: number, details: *}}}
 */
export const errorResponse = (message, code = "ERROR", status = 500, details = null) => {
  return {
    data: null,
    error: {
      message,
      code,
      status,
      details,
    },
  };
};

/**
 * 標準化 API 回應格式（向後兼容）
 * @deprecated 建議使用 successResponse 或 errorResponse
 * @param {*} data - 回應資料
 * @param {*} error - 錯誤物件
 * @returns {{data: *, error: *}}
 */
export const formatResponse = (data, error = null) => {
  if (error) {
    // 如果 error 已經是標準格式，直接使用
    if (error.message && error.code) {
      return { data: null, error };
    }
    // 否則格式化錯誤
    return errorResponse(error.message || '未知錯誤', error.code || 'ERROR', error.status || 500);
  }
  return successResponse(data);
};

/**
 * 常見錯誤類型
 * 每個方法都返回標準的錯誤回應格式
 */
export const ErrorTypes = {
  /**
   * 資源不存在
   */
  NOT_FOUND: (resource = "資源") =>
    errorResponse(`${resource}不存在`, "NOT_FOUND", 404),

  /**
   * 未授權（未登入）
   */
  UNAUTHORIZED: (message = "請先登入") =>
    errorResponse(message, "UNAUTHORIZED", 401),

  /**
   * 禁止訪問（無權限）
   */
  FORBIDDEN: (message = "無權限執行此操作") =>
    errorResponse(message, "FORBIDDEN", 403),

  /**
   * 輸入資料格式不正確
   */
  INVALID_INPUT: (field = "") =>
    errorResponse(
      field ? `${field}格式不正確` : "輸入資料格式不正確",
      "INVALID_INPUT",
      400
    ),

  /**
   * 資源已存在（重複）
   */
  DUPLICATE: (resource = "資源") =>
    errorResponse(`${resource}已存在`, "DUPLICATE", 409),

  /**
   * 伺服器錯誤
   */
  SERVER_ERROR: (message = "伺服器錯誤，請稍後再試") =>
    errorResponse(message, "SERVER_ERROR", 500),

  /**
   * 庫存不足
   */
  INSUFFICIENT_STOCK: (itemName = "商品") =>
    errorResponse(`${itemName}庫存不足`, "INSUFFICIENT_STOCK", 400),

  /**
   * 金額無效
   */
  INVALID_AMOUNT: (message = "金額必須大於 0") =>
    errorResponse(message, "INVALID_AMOUNT", 400),

  /**
   * 專案已結束
   */
  PROJECT_ENDED: (message = "專案募資已結束") =>
    errorResponse(message, "PROJECT_ENDED", 400),

  /**
   * 狀態不正確
   */
  INVALID_STATUS: (currentStatus, requiredStatus) =>
    errorResponse(
      `專案狀態必須為 ${requiredStatus}，目前為 ${currentStatus}`,
      "INVALID_STATUS",
      400
    ),

  /**
   * 必填欄位缺失
   */
  REQUIRED_FIELD: (field) =>
    errorResponse(`${field}為必填欄位`, "REQUIRED_FIELD", 400),

  /**
   * 資料庫錯誤
   */
  DATABASE_ERROR: (details = null) =>
    errorResponse("資料庫操作失敗", "DATABASE_ERROR", 500, details),

  /**
   * 驗證失敗
   */
  VALIDATION_ERROR: (message, details = null) =>
    errorResponse(message, "VALIDATION_ERROR", 400, details),
};

/**
 * 處理 Supabase 錯誤
 * @param {*} error - Supabase 錯誤物件
 * @returns {{data: null, error: {message: string, code: string, status: number, details: *}}}
 */
export const handleSupabaseError = (error) => {
  if (!error) {
    return successResponse(null);
  }

  // Supabase 特定錯誤代碼處理
  const errorMap = {
    'PGRST116': { message: '資源不存在', code: 'NOT_FOUND', status: 404 },
    '23505': { message: '資料已存在', code: 'DUPLICATE', status: 409 },
    '23503': { message: '參照資料不存在', code: 'INVALID_REFERENCE', status: 400 },
    '42501': { message: '無權限執行此操作', code: 'FORBIDDEN', status: 403 },
  };

  const mappedError = errorMap[error.code];

  if (mappedError) {
    return errorResponse(
      mappedError.message,
      mappedError.code,
      mappedError.status,
      error
    );
  }

  // 預設錯誤處理
  return errorResponse(
    error.message || '操作失敗',
    error.code || 'ERROR',
    error.status || 500,
    error
  );
};
