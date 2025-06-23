import Cookies from "js-cookie";

import { AuthSession, COOKIE_KEY, SessionForCookies } from "@/types/common";

export const saveSessionToCookies = ({
  auth,
  isAuthenticated,
}: {
  auth: SessionForCookies;
  isAuthenticated: boolean;
}) => {
  const session = { auth, isAuthenticated };
  Cookies.set(COOKIE_KEY, JSON.stringify(session), { expires: 7 }); // 7 días
};

export const getSession = (): AuthSession | null => {
  const cookie = Cookies.get(COOKIE_KEY);
  return cookie ? JSON.parse(cookie) : null;
};

export const removeSessionFromCookies = () => {
  Cookies.remove(COOKIE_KEY);
};
