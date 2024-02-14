import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { PAGE_SIZE } from "../../utils/constants";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // 1. FILTER
  const filterValue = searchParams.get("status") || 'all';
  const filter = filterValue === 'all' ? null : { field: 'status', value: filterValue };

  // 2. SORT
  const sortValue = searchParams.get("sortBy") || 'start_date-desc';
  const [field, direction] = sortValue.split("-");
  const sortBy = { field, direction };

  // 3. PAGINATION
  const page = Number(searchParams.get("page") || 1);

  // QUERY
  const { isLoading: isLoadingBookings, data, error } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page })
  });

  const { data: bookings, count } = data || {};

  // 4. PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
    });
  }

  return { isLoadingBookings, bookings, error, count };
}