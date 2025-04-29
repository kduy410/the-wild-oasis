import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted");
    }

    return data;
}

export async function createEditCabin(cabin, id) {
    const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
    const imagePath = hasImagePath ? cabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. create/edit a cabin
    let query = supabase.from('cabins');

    if (!id) {
        // A. Create a new cabin
        query = query.insert([{ ...cabin, image: imagePath }]) // Add the image path to the cabin data
    } else {
        // B. Edit an existing cabin
        query = query.update({ ...cabin, image: imagePath }).eq('id', id);
    }


    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error(`Cabin could not be ${id ? 'edited' : 'created'}`);
    }
    if (hasImagePath) {
        return data;
    }
    // 2. Upload the image
    const { error: storageError } = await supabase.storage // dont need data, just error
        .from('cabin-images')
        .upload(imageName, cabin.image)

    // 3. Delete cabin if there was an error uploading the image
    if (storageError) {
        await supabase.from('cabins').delete().eq('id', data.id);
        console.error(storageError);
        throw new Error("Image could not be uploaded for the cabin, thus the cabin was not created");
    }
    // 4. Return the cabin data with the image path
    return data;
}