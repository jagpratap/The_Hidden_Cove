import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCabin } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: handleDeleteCabin } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      alert('Cabin successfully deleted');

      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
    },
    onError: (err) => alert(err.message),
  });

  return { isDeleting, handleDeleteCabin };
}