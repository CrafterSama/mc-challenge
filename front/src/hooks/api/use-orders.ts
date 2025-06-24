import { mockOrders } from "@/lib/mock-orders";
import { apiService } from "@/services/api";
import { useAuthStore } from "@/state-management/auth-store";
import type { Order } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useOrders = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["orders", user?.id],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Filter orders by current user
      return mockOrders.filter((order: Order) => order.userId === user?.id);
    },
    enabled: !!user?.id,
  });
};

export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockOrders.find((order: Order) => order.id === orderId);
    },
    enabled: !!orderId,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      order: Omit<Order, "id" | "createdAt" | "updatedAt" | "orderNumber">
    ) => apiService.createOrder(order as Order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
