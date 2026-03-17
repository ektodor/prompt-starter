import { useQuery } from "@tanstack/react-query";

import { rewardKeys } from "@/commonJS/rewardKeys";
import { getRewardsByProject } from "@/utils/api/supabase/rewards";
import { mapReward } from "@/domain/project/reward.mapper";

export const useReward = (id) => {
  return useQuery({
    queryKey: id ? rewardKeys.detail(id) : rewardKeys.all,
    queryFn: () => getRewardsByProject(id),
    staleTime: 5 * 60 * 1000, // 5 分鐘內不重新抓
    gcTime: 10 * 60 * 1000, // 快取資料保留時間
    retry: false, // 關閉錯誤自動重試
    select: (apiData) => mapReward(apiData),
  });
};
