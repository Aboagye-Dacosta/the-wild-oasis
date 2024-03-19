import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteGuest as deleteGuestApi } from "../../services/apiGuest";

export function useDeleteGuest() {
  const queryClient = useQueryClient();
  const { isPending: isDeletingGuest, mutate: deleteGuest } = useMutation({
    mutationFn: (guestId) => deleteGuestApi(guestId),
    onSuccess: () => {
      toast.success("Guest successfully deleted");
      queryClient.invalidateQueries(["guests"]);
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeletingGuest, deleteGuest };
}
