import supabase, { supabaseUrl } from "./supabase";

export async function getCabins({ filter, sortBy }) {

  //NB: building query based on filter options

  let query = supabase.from("cabins").select("*");
  if (filter.value === "with-discount") query = query.gt(filter.prop, 0);
  if (filter.value == "no-discount") query.eq(filter.prop, 0);
  query = query.order(sortBy.prop, { ascending: sortBy.dir === "asc" });

  const { data, error } = await query;

  if (error) {
    throw new Error("Could not load cabins");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Could not delete cabin");
  }

  return data;
}

export async function createEditCabin({ newCabin, id }) {
  const isImageUrl = JSON.stringify(newCabin.image).indexOf(supabaseUrl) > -1;
  const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = isImageUrl
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error(`Could not ${!isImageUrl ? "create" : "update"} cabin`);
  }

  if (!isImageUrl) {
    // Upload file using standard upload
    const { error: imageUploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (imageUploadError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error("Could not upload cabin image and cabin was not created");
    }
  }

  return data;
}
