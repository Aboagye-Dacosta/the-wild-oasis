import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";

export function useAuthLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoggingInUser } = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      toast.success("You have successfully logged in ");
      navigate("/");
    },
    onError: (error) => toast.error(error.message),
  });

  return { isLoggingInUser, login };
}
