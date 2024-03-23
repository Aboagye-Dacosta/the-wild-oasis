import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateUser as updateUserApi } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      toast.success("You have successfully updated user ");
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => toast.error(error.message),
  });

  return { isUpdatingUser, updateUser };
}
