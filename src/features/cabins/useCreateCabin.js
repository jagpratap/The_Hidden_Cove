import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreatingCabin, mutate: handleCreateCabin } = useMutation({
    mutationFn: createEditCabin,

    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isCreatingCabin, handleCreateCabin };
}
