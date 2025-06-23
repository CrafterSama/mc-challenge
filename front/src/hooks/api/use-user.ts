import { getAuthUser } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

export const useAuthUser = () => {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: () => getAuthUser(),
  });
};