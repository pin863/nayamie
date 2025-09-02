import { supabase } from "./supabaseClient";

export const getAllPosts = async () => {
  const posts = await supabase.from("posts").select("*");
  return posts.data;
};
