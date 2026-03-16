import { getProjectById } from "@/utils/api/supabase";
import { useQuery } from "@tanstack/react-query";

export function useGetProjectDetail(projectId) {
  return useQuery({
    queryKey: ["project", "getProjectDetail", projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
  });
}
