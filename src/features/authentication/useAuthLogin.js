import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";

export function useAuthLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoggingInUser } = useMutation({
    mutationFn: (data) => loginApi(data),
    onSuccess: (data) => {
      toast.success("You have successfully logged in ");
      queryClient.setQueryData(["user"], data);
      navigate("/");
    },
    onError: (error) => toast.error(error.message),
  });

  return { isLoggingInUser, login };
}
