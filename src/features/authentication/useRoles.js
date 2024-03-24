import { useQuery } from "@tanstack/react-query";
import { loadRoles } from "../../services/apiAuth";

export function useRoles() {
  const { data: roles, isPending: isLoadingRoles } = useQuery({
    queryKey: ["roles"],
    queryFn: loadRoles,
  });

  return { roles, isLoadingRoles };
}
