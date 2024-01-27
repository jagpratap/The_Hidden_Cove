import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: handleCreateCabin } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, handleCreateCabin };
}
