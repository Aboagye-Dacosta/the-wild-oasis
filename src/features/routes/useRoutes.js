import { useQuery } from "@tanstack/react-query";
import { loadRoutes } from "../../services/apiAuth";

export function useRoutes() {
  const { data: routes, isPending: isLoadingRoutes } = useQuery({
    queryKey: ["routes"],
    queryFn: loadRoutes,
  });

  return { routes, isLoadingRoutes };
}
