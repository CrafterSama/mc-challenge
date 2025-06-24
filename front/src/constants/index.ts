export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  DASHBOARD: "/dashboard",
  PRODUCTS: "/dashboard/products",
  ORDERS: "/orders",
  CART: "/cart",
  CHECKOUT: "/checkout",
  CHECKOUT_SUCCESS: "/checkout/success",
} as const;

export const PRODUCT_CATEGORIES = [
  "Deportivos",
  "Casuales",
  "Formales",
  "Botas",
  "Sandalias",
] as const;
