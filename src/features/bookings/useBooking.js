import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams();

  const { isLoading: isLoadingBooking, data: booking, error } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
  });

  return { isLoadingBooking, booking, error };
}