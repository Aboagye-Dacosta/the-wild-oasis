import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isPending: isDeletingBooking, mutate: deleteBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

      toast.success(`Booking successfully deleted`);
    },

    onError: () =>
      toast.error("Sorry an error occurred while deleting booking"),
  });

  return { isDeletingBooking, deleteBooking };
}
