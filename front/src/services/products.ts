import { API_URL } from "@/constants/common";
import { getSession } from "@/utils/auth-cookie";

export const getProducts = async () => {
  const session = getSession();
  console.log("session", session);
  const response = await fetch(`${API_URL}/api/products/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session?.auth?.token,
    },
  });
  return response.json();
};

export const getProduct = async (id: string) => {
  const session = getSession();
  console.log("session", session);
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session?.auth?.token,
    },
  });
  return response.json();
};

export const getProductsByAuthor = async (author: string) => {
  const session = getSession();
  const response = await fetch(`${API_URL}/api/products/autor/${author}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session?.auth?.token,
    },
  });
  return response.json();
};

export const createProduct = async (product: any) => {
  const session = getSession();
  const response = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session?.auth?.token,
    },
    body: JSON.stringify(product),
  });
  return response.json();
};
