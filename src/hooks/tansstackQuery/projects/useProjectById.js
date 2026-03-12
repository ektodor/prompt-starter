import { useQuery } from "@tanstack/react-query";

import { projectKeys } from "@/commonJS/projectKeys";
import { getProjectById } from "@/utils/api/supabase/products";
import { mapProject } from "@/domain/project/project.mapper";

export const useProject = (id) => {
  return useQuery({
    queryKey: id ? projectKeys.detail(id) : projectKeys.all,
    queryFn: () => getProjectById(id),
    staleTime: 5 * 60 * 1000, // 5 分鐘內不重新抓
    gcTime: 10 * 60 * 1000, // 快取資料保留時間
    retry: false, // 關閉錯誤自動重試
    select: (apiData) => mapProject(apiData),
  });
};
