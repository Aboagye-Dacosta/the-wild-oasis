import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { createEditCabin } from "../../services/apiCabins";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onMutate: (variables) => {
      //NB: cancelling all queries
      queryClient.cancelQueries({
        queryKey: ["cabins"],
      });

      //NB: creating a new cabin object with a randon Id
      const newCabin = {
        id: uuidv4(),
        ...variables.newCabin,
      };

      queryClient.setQueriesData(
        {
          queryKey: ["cabins"],
        },
        (oldData) => [...oldData, newCabin]
      );
      return { id: newCabin.id };
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Successfully created cabin ${data.name}`, {
        id: "createCabin",
      });
    },
    onError: (error, variables, context) => {
      toast.error(error.message + " " + variables.newCabin.name, {
        id: "createCabin",
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

  return { isCreating, createCabin };
};
