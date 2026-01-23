import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/utils/api/api";

export function useGetUserProfile(isLogin) {
  return useQuery({
    queryKey: ["getUserProfile"],
    queryFn: getUserProfile,
    retry: false,
    enabled: isLogin, // 只有登入時才執行查詢
  });
}
