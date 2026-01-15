/**
 * API Response Helper
 * 統一處理 API 回應格式，確保 Mock API 和 Supabase API 回傳一致的格式
 */

/**
 * 標準化 API 回應格式
 * @param {*} data - 回應資料
 * @param {*} error - 錯誤物件
 * @returns {{data: *, error: *}}
 */
export const formatResponse = (data, error = null) => {
    return { data, error };
};

/**
 * 建立錯誤回應
 * @param {string} message - 錯誤訊息
 * @param {string} code - 錯誤代碼
 * @param {number} status - HTTP 狀態碼
 * @returns {{data: null, error: {message: string, code: string, status: number}}}
 */
export const formatError = (message, code = 'ERROR', status = 500) => {
    return {
        data: null,
        error: {
            message,
            code,
            status,
            details: null
        }
    };
};

/**
 * 常見錯誤類型
 */
export const ErrorTypes = {
    NOT_FOUND: (resource = '資源') => formatError(`${resource}不存在`, 'NOT_FOUND', 404),
    UNAUTHORIZED: () => formatError('請先登入', 'UNAUTHORIZED', 401),
    FORBIDDEN: () => formatError('無權限執行此操作', 'FORBIDDEN', 403),
    INVALID_INPUT: (field = '') => formatError(
        field ? `${field}格式不正確` : '輸入資料格式不正確',
        'INVALID_INPUT',
        400
    ),
    DUPLICATE: (resource = '資源') => formatError(`${resource}已存在`, 'DUPLICATE', 409),
    SERVER_ERROR: () => formatError('伺服器錯誤，請稍後再試', 'SERVER_ERROR', 500),
    INSUFFICIENT_STOCK: (itemName = '商品') => formatError(
        `${itemName}庫存不足`,
        'INSUFFICIENT_STOCK',
        400
    ),
    INVALID_AMOUNT: () => formatError('金額必須大於 0', 'INVALID_AMOUNT', 400),
    PROJECT_ENDED: () => formatError('專案募資已結束', 'PROJECT_ENDED', 400),
    INVALID_STATUS: (currentStatus, requiredStatus) => formatError(
        `專案狀態必須為 ${requiredStatus}，目前為 ${currentStatus}`,
        'INVALID_STATUS',
        400
    ),
    REQUIRED_FIELD: (field) => formatError(`${field}為必填欄位`, 'REQUIRED_FIELD', 400),
};
