import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: ({ bookingId, checkedOut }) =>
      updateBooking(bookingId, checkedOut),
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Guest successfully checked out`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

      navigate("/bookings");
    },
    onError: () =>
      toast.error("sorry and error occurred could not check out guest"),
  });

  return { isCheckingOut, checkout };
}
