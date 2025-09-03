import { supabase } from "./supabaseClient";
import { Database } from "../../types/database.types"; 

type PostInsert = Database["public"]["Tables"]["posts"]["Insert"];

// DBから最新の投稿6件の取得
export const getRecentPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
    id,
    title,
    content,
    created_at,
    user:user_id ( name ),
    category:category_id ( name ),
    prefecture:prefecture_id ( name )
  `
    )
    .order("created_at", { ascending: false })
    .limit(6); // 最新6件;

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []).map((p) => ({
    id: p.id,
    title: p.title,
    content: p.content,
    date: new Date(p.created_at).toLocaleDateString("ja-JP"),
    username: p.user?.name ?? "名無しさん",
    category: p.category?.name ?? "未分類",
    prefecture: p.prefecture?.name ?? "未設定",
  }));
};


// 新規投稿作成
export const createPost = async (postData: PostInsert)  => {
  const postWithUser = {
    ...postData,
    user_id: "0d8abe50-8f93-44da-ab62-7ddc489d04af", // ひとまず固定のuser_id 
    prefecture_id: postData.prefecture_id
  };

  const { data, error } = await supabase
    .from("posts")
    .insert([postWithUser]);

  if (error) {
    console.error("Supabase エラー内容:", error);
    throw new Error(`投稿に失敗しました。再度お試しください。`);
  }

  return data;
};

