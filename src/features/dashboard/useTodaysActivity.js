import { useQuery } from "@tanstack/react-query";

import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodaysActivity() {
  const { isPending: isLoadingTodaysActivities, data: todaysActivities } =
    useQuery({
      queryKey: ["todays-activity"],
      queryFn: getStaysTodayActivity,
    });
  
  return { isLoadingTodaysActivities, todaysActivities };
}
