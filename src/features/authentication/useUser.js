import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading: isGettingCurrentUser, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  const isAuthenticated = user?.role === 'authenticated';

  return { isGettingCurrentUser, user, isAuthenticated }
}