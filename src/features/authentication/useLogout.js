import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { logout } from "../../services/apiAuth";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isLoggingOut, mutate: handleLogout } = useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
  });

  return { isLoggingOut, handleLogout };
}