import { API_URL } from "@/constants/common";
import { LoginFormValues, SignupFormValues } from "@/types/common";
import { api } from "@/utils/api";

const authLogin = async (user: LoginFormValues) => {
  const response = await api.post(`${API_URL}/api/token/`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

const authSignup = async (user: SignupFormValues) => {
  const response = await api.post(`${API_URL}/api/token/`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export { authLogin, authSignup };
