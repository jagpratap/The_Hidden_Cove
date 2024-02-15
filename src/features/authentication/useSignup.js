import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { signup } from "../../services/apiAuth";

export function useSignup() {
  const { isLoading: isSigningUp, mutate: handleSignup } = useMutation({
    mutationFn: signup,

    onSuccess: (user) => {
      console.log(user);
      toast.success("Account successfully created! Please verify the new account from the user's email address.")
    },
  });

  return { isSigningUp, handleSignup };
}