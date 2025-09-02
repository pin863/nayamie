import { supabase } from "./supabaseClient";

export const getRecentPosts = async () => {
  type PostFromDB = {
    id: string;
    title: string;
    content: string;
    created_at: string;
    user?: [{ name: string }];
    category?: [{ name: string }];
    prefecture?: [{ name: string }];
  };
  const { data, error } = await supabase
    .from<PostFromDB>("posts")
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
  console.log("整形前のデータ:", data);

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
