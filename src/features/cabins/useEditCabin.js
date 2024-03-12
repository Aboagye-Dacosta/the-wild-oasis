import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export const useEditCabin = () => {
  const queryClient = useQueryClient();
  const { isPending: isEditing, mutate: editCabin } = useMutation({
    mutationFn: createEditCabin,
    onMutate: ({ newCabin, id, image }) => {
      //NB: cancelling all queries
      queryClient.cancelQueries({
        queryKey: ["cabins"],
      });

      //NB: creating a new cabin object with the id
      const newCabinObj = {
        id,
        ...newCabin,
        image,
      };

      queryClient.setQueriesData(
        {
          queryKey: ["cabins"],
        },
        (oldData) => {
          console.log(oldData, "from useEditCabin hook");
          return oldData.filter((data) =>
            data.id === id ? newCabinObj : data
          );
        }
      );
      return { id };
    },
    onSuccess: (data) => {
      toast.success(`Successfully edited cabin ${data.name}`, {
        id: "editCabin",
      });
    },
    onError: (error, { newCabin }, context) => {
      toast.error(error.message + " " + newCabin.name, {
        id: "editCabin",
      });

      queryClient.setQueriesData(
        {
          queryKey: ["cabins"],
        },
        (oldData) => oldData.filter((data) => data.id !== context.id)
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });

  return { isEditing, editCabin };
};
