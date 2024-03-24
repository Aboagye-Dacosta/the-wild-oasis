import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const lastDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const lastDate = subDays(new Date(), lastDays).toISOString();

  console.log(lastDate);

  const { isPending: isLoadingRecentStays, data: stays } = useQuery({
    queryKey: ["bookings", `stays-after-${lastDays}-days`],
    queryFn: () => getStaysAfterDate(lastDate),
  });


  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );
  return { isLoadingRecentStays, stays, confirmedStays };
}
