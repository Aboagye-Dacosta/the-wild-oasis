import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
export const useDeleteCabin = () => {
  const queryClient = useQueryClient();
  const {
    isPending: isDeleting,
    mutate: deleteCabin,
    isPaused,
  } = useMutation({
    mutationFn: (data) => deleteCabinApi(data),
    onSuccess: () => {
      toast.success(`Successfully deleted cabin ${name}`);
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteCabin, isDeleting, isPaused };
};
