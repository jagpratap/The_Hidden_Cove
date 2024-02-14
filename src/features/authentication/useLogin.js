import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/apiAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isLogging, mutate: handleLogin } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),

    onSuccess: (user) => {
      queryClient.setQueriesData(['user'], user);
      navigate('/dashboard');
    },

    onError: () => toast.error("Provided email or password are incorrect"),
  });

  return { isLogging, handleLogin };
}