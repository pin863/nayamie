// ==========================================================
// 投稿・コメント関連の Supabase 操作用ユーティリティ
// - 投稿の取得 / 作成 / 更新 / 削除
// - コメントの取得 / 作成
// ==========================================================

import { supabase } from "@/app/utils/supabaseClient";
import { Database } from "@/types/database.types"; 

type PostInsert = Database["public"]["Tables"]["posts"]["Insert"];

// DBからすべての投稿の取得
export const getAllPosts = async () => {
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

  if (error) {
    console.error(error);
    return [];
  }

  return data.map((d) => ({
    id: d.id,
    title: d.title,
    content: d.content,
    date: new Date(d.created_at).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }),
    username: d.user.name,
    user: d.user,
    category: d.category,
    prefecture: d.prefecture,
    showButton: true,
  }));
};

// DBから特定のIDの1件を取得
export const getPostById = async (id: number) => {
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
    .eq("id", id)
    .single();
  if (error) throw error;
  return {
    id: data.id,
    title: data.title,
    content: data.content,
    date: new Date(data.created_at).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }),
    username: data.user.name,
    user: data.user,
    category: data.category,
    prefecture: data.prefecture,
    showButton: true,
  };
};

// 新規投稿作成
export const createPost = async (postData: PostInsert)  => {
  const postWithUser = {
    ...postData,
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

// 投稿編集
export const updatePost = async (postId: number, postData: PostInsert) => {
  const postWithUser = {
    ...postData,
    user_id: "0d8abe50-8f93-44da-ab62-7ddc489d04af", // 固定ユーザーID
    prefecture_id: postData.prefecture_id,
  };

  const { data, error } = await supabase
    .from("posts")
    .update(postWithUser)
    .eq("id", postId);

  if (error) {
    console.error("Supabase エラー内容:", error);
    throw new Error(`投稿の更新に失敗しました。再度お試しください。`);
  }

  return data;
};

// 投稿削除
export const deletePost = async (postId: number) => {
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId);

  if (error) {
    console.error("Supabase エラー内容:", error);
    throw new Error(`投稿の削除に失敗しました。再度お試しください。`);
  }

  return true;
};

// DBからコメントを取得
export const getCommentsByPostId = async (postId: number) => {
  const { data, error } = await supabase
    .from("comments")
    .select(`
      id,
      content,
      created_at,
      user:user_id ( name )
    `)
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data.map((d) => ({
    id: d.id,
    content: d.content,
    username: d.user.name,
    date: new Date(d.created_at).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }),
  }));
};

// コメント投稿
export const createComment = async (postId: number, content: string) => {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ post_id: postId, user_id: "0d8abe50-8f93-44da-ab62-7ddc489d04af", content }]) // 固定ユーザーID
    .select(`id, content, created_at, user:user_id(name)`)
    .single(); 

  if (error || !data) {
    console.error("Supabase エラー:", error);
    throw new Error("コメントの投稿に失敗しました。");
  }

  return {
    id: data.id,
    content: data.content,
    username: data.user.name,
    date: new Date(data.created_at).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }),
  };
};

// DBから最新の投稿6件の取得
// export const getRecentPosts = async () => {
//   const { data, error } = await supabase
//     .from("posts")
//     .select(
//       `
//     id,
//     title,
//     content,
//     created_at,
//     user:user_id ( name ),
//     category:category_id ( name ),
//     prefecture:prefecture_id ( name )
//   `
//     )
//     .order("created_at", { ascending: false })
//     .limit(6); // 最新6件;

//   if (error) {
//     console.error(error);
//     return [];
//   }

//   return data.map((d) => ({
//     id: d.id,
//     title: d.title,
//     content: d.content,
//     date: new Date(d.created_at).toLocaleDateString("ja-JP", {
//     year: "numeric",
//     month: "numeric",
//     day: "numeric",
//   }),
//     username: d.user.name,
//     user: d.user,
//     category: d.category,
//     prefecture: d.prefecture,
//     showButton: true,
//   }));
// };