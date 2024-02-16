import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select("id, created_at, start_date, end_date, num_nights, num_guests, status, total_price, cabins(name), guests(full_name, email)", { count: 'exact' });

  // 1. FILTER
  if (filter) {
    query = query[filter.method || 'eq'](filter.field, filter.value);
  }

  // 2. SORT
  if (sortBy) {
    query = query.order(sortBy.field, { ascending: sortBy.direction === 'asc' });
  }

  // 3. PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, total_price, extra_price")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date.
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name)")
    .gte("start_date", date)
    .lte("start_date", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  return data;
}

export async function deleteBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  return data;
}
