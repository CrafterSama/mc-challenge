import { API_URL } from "@/constants/common";
import { api } from "@/utils/api";

export const getAuthUser = async (access?: string) => {
  const response = await api.get(`${API_URL}/api/user/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access,
    },
  });
  return response;
};
