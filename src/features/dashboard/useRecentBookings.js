import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const lastDate = subDays(new Date(), numDays).toISOString();

  console.log(lastDate);

  const { isPending: isLoadingBookingsAfterDate, data: bookingsAfterDate } =
    useQuery({
      queryKey: ["bookings", `last-${numDays}-days`],
      queryFn: () => getBookingsAfterDate(lastDate),
    });

  return { isLoadingBookingsAfterDate, bookingsAfterDate, numDays };
}
