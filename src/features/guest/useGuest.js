import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getGuest } from "../../services/apiGuest";

export function useGuest() {
  const { guestId } = useParams();
  const { isPending: isLoadingGuest, data: guest } = useQuery({
    queryKey: ["booking", guestId],
    queryFn: () => getGuest(guestId),
  });

  return { isLoadingGuest, guest };
}
