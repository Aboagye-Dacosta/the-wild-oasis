import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";
export function useSignup() {
  const { isPending: isSigningUp, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => toast.success("user successfully created"),
    onError: (error) => toast.error(error.message),
  });

  return { isSigningUp, signup };
}
