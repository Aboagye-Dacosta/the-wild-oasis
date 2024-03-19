import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { createBooking as createBookingApi } from "../../services/apiBookings";

export function useCreateBooking() {
  const queryClient = useQueryClient();
    const navigate = useNavigate();

  const { isPending: isCreatingBooking, mutate: createBooking } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success("Successfully created booking");
        navigate("/bookings");
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    isCreatingBooking,
    createBooking,
  };
}
