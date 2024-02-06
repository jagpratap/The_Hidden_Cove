import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  const [searchParams] = useSearchParams();

  // 1. FILTER
  const filterValue = searchParams.get("status") || 'all';
  const filter = filterValue === 'all' ? null : { field: 'status', value: filterValue };

  // 2. SORT
  const sortValue = searchParams.get("sortBy") || 'start_date-desc';
  const [field, direction] = sortValue.split("-");
  const sortBy = { field, direction };

  const { isLoading, data: bookings, error } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy })
  });

  return { isLoading, bookings, error };
}