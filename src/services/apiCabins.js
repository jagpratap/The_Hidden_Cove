import supabase, { supabaseUrl } from "./supabase";

function generateImageInfo(imageName) {
  const name = `${Math.random()}-${imageName}`.replaceAll('/', '');
  const path = `${supabaseUrl}/storage/v1/object/public/cabin-images/${name}`;
  return { name, path };
}

async function uploadImage(image, imageName, id) {
  // 1. Upload image
  const { error } = await supabase.storage.from('cabin-images').upload(imageName, image);

  // 2. Delete cabin IF there was an error in uploading image
  if (error) {
    await supabase.from('cabins').delete().eq('id', id);
    throw new Error('Cabin image could not be uploaded and the cabin was not created');
  }
}

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(cabin) {
  const imagePathExist = cabin.image?.startsWith?.(supabaseUrl);
  const { path, name } = generateImageInfo(cabin.image.name);

  const imagePath = imagePathExist ? cabin.image : path;

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!cabin?.id) query = query.insert([{ ...cabin, image: imagePath }]);

  // B) EDIT
  if (cabin?.id) {
    const { id, ...editedValues } = cabin;
    query = query.update({ ...editedValues, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  if (imagePathExist) return data;

  // 2. Upload image
  await uploadImage(cabin.image, name, data.id);

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id).select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
