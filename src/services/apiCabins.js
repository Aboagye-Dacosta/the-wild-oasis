import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

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

export async function createCabin(cabin) {
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image: imagePath }])
    .select();

  if (error) {
    throw new Error("Could not create cabin");
  }

  // Upload file using standard upload
  const { error: imageUploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  if (imageUploadError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Could not upload cabin image and cabin was not created");
  }

  return data;
}

export async function updateCabin(editedCabin) {
  const id = editedCabin.id;
  delete editedCabin.id;

  console.log(editedCabin);
  const { data, error } = await supabase
    .from("cabins")
    .update(editedCabin)
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("Could not update cabin");
  }

  return data;
}
