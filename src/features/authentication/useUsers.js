import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiAuth";

export function useUsers() {
  const { isPending: isLoadingUsers, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return {
    isLoadingUsers,
    users,
  };
}
