import supabase from "./supabase";

export async function getBookings() {
  const { data, error } = await supabase.from("bookings").select("id, created_at, start_date, end_date, num_nights, num_guests, status, total_price, cabins(name), guests(full_name, email)");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return data;
}