import { API_URL } from "@/constants/common";
import { LoginFormValues } from "@/types/common";

const authLogin = async (user: LoginFormValues) => {
  const response = await fetch(`${API_URL}/api/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return response.json();
};

export { authLogin };
