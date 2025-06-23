"use client";

import { create, useStore } from "zustand";

import { AuthSession, SessionForCookies } from "@/types/common";
import {
  getSession,
  removeSessionFromCookies,
  saveSessionToCookies,
} from "@/utils/auth-cookie";

type appStoreProps = {
  session: AuthSession | null;
  setSession: (session: AuthSession | null) => void;
  auth: {
    isAuthenticated: boolean;
    login: (session: SessionForCookies) => void;
    logout: () => void;
  };
  getSessionFromCookies: () => AuthSession | null;
};

const appStore = create<appStoreProps>((set: any) => ({
  session: null,
  setSession: (session: AuthSession | null) => set({ session }),
  auth: {
    isAuthenticated: false,
    login: (session: SessionForCookies) => {
      saveSessionToCookies({ auth: { ...session }, isAuthenticated: true });
      set({ session: { ...session } });
    },
    logout: () => {
      removeSessionFromCookies();
      set({ session: null });
    },
  },
  getSessionFromCookies: () => getSession(),
}));

const useAppStoreContext = () => useStore(appStore);

export { appStore };

export default useAppStoreContext;
