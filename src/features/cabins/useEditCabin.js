import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isEditingCabin, mutate: handleEditCabin } = useMutation({
    mutationFn: createEditCabin,

    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isEditingCabin, handleEditCabin };
}
