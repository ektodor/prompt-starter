import {
  createOrder,
  getOrderById,
  getOrdersByProject,
  updateOrderDetails,
} from "@/utils/api/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCreateOrder() {
  return useMutation({
    mutationKey: ["order", "createOrder"],
    mutationFn: ({ orderData, userId }) => createOrder(orderData, userId),
  });
}

export function useGetOrderByProject(projectId) {
  return useQuery({
    queryKey: ["order", "getOrderByProject", projectId],
    queryFn: () => getOrdersByProject(projectId),
    enabled: !!projectId,
  });
}

export function useGetOrderById(id) {
  return useQuery({
    queryKey: ["order", "getOrderById", id],
    queryFn: () => getOrderById(id),
    enabled: !!id,
  });
}

export function usePutOrderById() {
  return useMutation({
    mutationKey: ["order", "updateOrder"],
    mutationFn: ({ orderId, orderData }) =>
      updateOrderDetails(orderId, orderData),
  });
}
