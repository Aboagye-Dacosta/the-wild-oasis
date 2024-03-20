import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getGuestBookings } from "../../services/apiGuest";

export function useGuestBookings() {
  const { guestId } = useParams();
  const { isPending: isLoadingGuestBookings, data: guestBookings } = useQuery({
    queryKey: ["guest-bookings", guestId],
    queryFn: () => getGuestBookings(guestId),
  });

  return { isLoadingGuestBookings, guestBookings };
}
