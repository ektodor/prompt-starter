/**
 * API 統一入口
 * 直接使用 Supabase API
 *
 * 使用方式：
 * import * as api from '@/utils/api';
 * const projects = await api.getProjects();
 */

// 直接從 supabase 目錄導出所有 API
export * from "./supabase/index.js";

console.log('🚀 API 已載入 (Supabase)');
