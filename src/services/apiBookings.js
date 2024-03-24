import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({ filter, sortBy, page, pageSize }) {
  const paginate = { from: page * pageSize, to: (page + 1) * pageSize - 1 };

  let query = supabase
    .from("bookings")
    .select(
      "id,created_at,startDate,endDate,numNights,numGuests,totalPrice,status,cabins(name),guests(fullName,email)",
      { count: "exact" }
    );

  query = query.order(sortBy.prop, {
    ascending: sortBy.dir === "asc",
  });
  if (filter.value !== "all") query.eq(filter.prop, filter.value);

  const { error, data, count } = await query.range(paginate.from, paginate.to);

  if (error) {
    throw new Error("Booking not found");
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
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {

    throw new Error("Bookings could not get loaded");
  }


  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
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
    throw new Error("Booking could not be updated");
  }
  return data;
}
export async function createBooking({ guest, booking }) {
  const {
    data: { id },
    error,
  } = await supabase.from("guests").insert(guest).select().single();

  if (error) {
    throw new Error("Guest could not be created");
  }



  const { data, error: bookingError } = await supabase
    .from("bookings")
    .insert({ ...booking, guestId: id })
    .select();

  if (bookingError) {
    await supabase.from("guests").delete().eq("id", id);
    throw new Error("Booking could not be created");
  }

  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    throw new Error("Booking could not be deleted");
  }
  return data;
}
