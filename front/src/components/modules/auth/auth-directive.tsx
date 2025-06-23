"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { AuthSession } from "@/types/common";
import { getSession } from "@/utils/auth-cookie";

const AuthDirective = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const session: AuthSession = getSession() ?? {
    isAuthenticated: false,
    auth: { user: null, token: "", refreshToken: "" },
  };

  useEffect(() => {
    if (!session?.isAuthenticated) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.isAuthenticated]);

  return <>{children}</>;
};

export default AuthDirective;
