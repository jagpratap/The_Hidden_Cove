import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeletingBooking, mutate: handleDeleteBooking } = useMutation({
    mutationFn: deleteBooking,

    onSuccess: () => {
      toast.success('Booking successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },

    onError: (err) => {
      console.log(err);
      toast.error(err.message)
    },
  });

  return { isDeletingBooking, handleDeleteBooking };
}