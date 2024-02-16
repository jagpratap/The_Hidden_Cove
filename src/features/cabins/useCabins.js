import { useQuery } from "@tanstack/react-query";

import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const { isLoading: isGettingCabins, data: cabins, error } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins
  })

  return { isGettingCabins, cabins, error };
}