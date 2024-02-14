import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { updateBooking } from "../../services/apiBookings";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isCheckingIn, mutate: handleCheckin } = useMutation({
    mutationFn: ({ bookingId, breakfast }) => {
      updateBooking(bookingId, {
        status: "checked-in",
        is_paid: true,
        ...breakfast,
      })
    },

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return { isCheckingIn, handleCheckin };
}
