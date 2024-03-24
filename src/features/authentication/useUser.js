import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export function useUser() {
  const { isPending: isLoadingUser, data } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });


  return {
    isLoadingUser,
    user: data,
    isAuthenticated: data?.role === "authenticated",
  };
}
