export interface LoginFormValues {
  username: string;
  password: string;
}

export interface SignupFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthUser {
  id?: string | number;
  username?: string;
  email?: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export interface SessionForCookies {
  user: AuthUser | AuthUser[] | any[] | null;
  token: string;
  refreshToken: string;
}

export interface AuthSession {
  isAuthenticated: boolean;
  auth: {
    user: AuthUser[] | any[] | null;
    token: string;
    refreshToken: string;
  };
}

export const COOKIE_KEY = "auth_user";
