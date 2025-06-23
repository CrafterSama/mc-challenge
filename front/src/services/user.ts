import { API_URL } from "@/constants/common";
import { AuthUser } from "@/types/common";

export const getAuthUser = async (access?: string) => {
  const response = await fetch(`${API_URL}/api/user/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access,
    },
  });
  return response.json() as AuthUser;
};
