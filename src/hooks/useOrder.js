import { createOrder, getOrdersByProject } from "@/utils/api/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCreateOrder() {
  return useMutation({
    mutationKey: ["order", "createOrder"],
    mutationFn: ({ orderData, userId }) => createOrder(orderData, userId),
  });
}

export function useGetOrderByProject(projectId) {
  return useQuery({
    queryKey: ["order", "getOrderByProject"],
    queryFn: () => getOrdersByProject(projectId),
    enabled: !!projectId,
  });
}
