import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateSetting } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdatingSettings, mutate: handleUpdateSetting } = useMutation({
    mutationFn: updateSetting,

    onSuccess: () => {
      toast.success("Setting successfully edited");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isUpdatingSettings, handleUpdateSetting };
}