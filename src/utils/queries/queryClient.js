import { QueryClient } from "@tanstack/react-query";

// Query 的全域設定
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 五分鐘後視為過期資料
      staleTime: 5 * 60 * 1000,
      // 快取資料保留時間
      gcTime: 10 * 60 * 1000,
      // 重新回到視窗就重抓資料
      refetchOnWindowFocus: true,
      // 網路重連也重新抓資料
      refetchOnReconnect: true,
    },
  },
});
