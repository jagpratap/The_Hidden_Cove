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

export async function createCabin(newCabin) {
  const { path, name } = generateImageInfo(newCabin.image.name);

  const { data, error } = await supabase.from("cabins").insert([{ ...newCabin, image: path }]).select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  await uploadImage(newCabin.image, name, data.id);

  return data;
}

export async function editCabin(editedCabin) {
  const { id, ...editedValues } = editedCabin;

  const imagePathExist = editedCabin.image?.startsWith?.(supabaseUrl);

  const { path, name } = generateImageInfo(editedCabin.image.name);

  const imagePath = imagePathExist ? editedCabin.image : path;

  const { data, error } = await supabase.from("cabins").update({ ...editedValues, image: imagePath }).eq('id', id).select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be edited");
  }

  if (imagePathExist) return data;

  await uploadImage(editedCabin.image, name, data.id);

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
