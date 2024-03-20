import supabase from "./supabase";

export async function getGuest(id) {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Guest not found");
  }

  return data;
}

export async function getGuestBookings(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*,cabins(*)")
    .eq("guestId", id);

  if (error) {
    throw new Error("Guest not found");
  }

  return data;
}

export async function getGuests({ page, pageSize, sortBy }) {
  const paginate = { from: page * pageSize, to: (page + 1) * pageSize - 1 };

  const { data, error, count } = await supabase
    .from("guests")
    .select("*", { count: "exact" })
    .order(sortBy.prop, { ascending: sortBy.dir === "asc" })
    .range(paginate.from, paginate.to);

  if (error) {
    throw new Error(error.message);
  }

  return { data, count };
}

export async function deleteGuest(guestId) {
  const { data, error } = await supabase
    .from("guests")
    .delete()
    .eq("id", guestId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
