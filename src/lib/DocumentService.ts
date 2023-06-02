import {supabase} from "@/utils/SupabaseClient";

export const saveDocument = async (file: File) => {
    const {data, error} = await supabase.storage
        .from("blokcejn-bucket")
        .upload(`public/${file.name}`, file, {
            cacheControl: "3600",
            upsert: false,
        });

    if (error) {
        throw error;
    }

    return data.path;
};

export const getDocument = async (path: string) => {
    const {data, error} = await supabase.storage
        .from("blokcejn-bucket")
        .download(path);

    if (error) {
        throw error;
    }

    return data;
}