import { getRewardsByProject } from "@/utils/api/supabase";
import { useQuery } from "@tanstack/react-query";

export function useGetRewardsByProject(projectId) {
  return useQuery({
    queryKey: ["reward", "getRewardsByProject"],
    queryFn: () => getRewardsByProject(projectId),
    enabled: !!projectId,
  });
}
