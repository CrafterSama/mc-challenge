"use client";

import { useEffect } from "react";

import { AuthSession } from "@/types/common";
import { getSession } from "@/utils/auth-cookie";
import { useRouter } from "next/navigation";

const LoginDirective = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const session: AuthSession = getSession() ?? {
    isAuthenticated: false,
    auth: { user: null, token: "", refreshToken: "" },
  };

  useEffect(() => {
    if (session?.isAuthenticated) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return <>{children}</>;
};

export default LoginDirective;
