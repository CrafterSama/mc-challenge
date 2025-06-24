import { API_URL } from "@/constants/common";
import { api } from "@/utils/api";
import { getSession } from "@/utils/auth-cookie";

export const getProducts = async (search?: string) => {
  const session = getSession();

  const urlWithParams = search
    ? `${API_URL}/api/products/?search=${search}`
    : `${API_URL}/api/products/`;

  const data = await api.get(urlWithParams, {
    headers: {
      "Content-Type": "application/json",
      /*Authorization: "Bearer " + session?.auth?.token,*/
    },
  });
  console.log("response", data);
  return data;
};

export const getProduct = async (id: string) => {
  const session = getSession();
  const response = await api.get(`${API_URL}/api/products/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session?.auth?.token,
    },
  });
  return response;
};

export const getProductsByAuthor = async (author: string) => {
  const session = getSession();
  const response = await api.get(`${API_URL}/api/products/autor/${author}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session?.auth?.token,
    },
  });
  return response;
};

export const createProduct = async (product: any) => {
  const session = getSession();
  const response = await api.post(`${API_URL}/api/products/`, product, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session?.auth?.token,
    },
  });
  return response;
};
