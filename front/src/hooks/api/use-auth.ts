"use client";

import { authLogin } from "@/services/auth";
import { LoginFormValues } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAuthLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: LoginFormValues) => authLogin(user),
    onSettled: () => {
      queryClient.invalidateQueries(["login"] as any);
    },
  });
};

export const useAuthSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: LoginFormValues) => authLogin(user),
    onSettled: () => {
      queryClient.invalidateQueries(["login"] as any);
    },
  });
};
