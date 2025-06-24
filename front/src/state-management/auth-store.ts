import type { AuthState, User } from "@/types";
import { AuthUser } from "@/types/common";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore extends AuthState {
  login: ({
    user,
    token,
    refreshToken,
  }: {
    user: User | AuthUser | null;
    token: string | null;
    refreshToken?: string | null;
  }) => void;
  logout: () => void;
  updateUser: (user: Partial<User | AuthUser | null | any>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,

      login: ({
        user,
        token,
        refreshToken,
      }: {
        user: User | AuthUser | null | any;
        token: string | null;
        refreshToken?: string | null;
      }) => {
        set({
          user,
          token,
          refreshToken,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData: Partial<User | AuthUser | null | any>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
