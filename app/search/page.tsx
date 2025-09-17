"use client";

import { useEffect, useState } from "react";
import Searchbar from "@/app/components/Searchbar";
import PostComponent from "@/app/components/PostComponent";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";

type PostFromDB = {
  id: number;
  title: string;
  content: string;
  date: string;
  user: { name: string };
  category: { name: string };
  prefecture: { name: string };
};

export default function Page() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const prefecture = searchParams.get("prefecture");
  const keyword = searchParams.get("keyword");

  const [posts, setPosts] = useState<PostFromDB[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryMap: Record<number, string> = {
    1: "ごみ問題",
    2: "騒音",
    3: "外国人",
    4: "交通",
    5: "子育て",
    6: "その他",
  };

  const prefectureMap: Record<number, string> = {
    1: "北海道",
    2: "青森県",
    3: "岩手県",
    4: "宮城県",
    5: "秋田県",
    6: "山形県",
    7: "福島県",
    8: "茨城県",
    9: "栃木県",
    10: "群馬県",
    11: "埼玉県",
    12: "千葉県",
    13: "東京都",
    14: "神奈川県",
    15: "新潟県",
    16: "富山県",
    17: "石川県",
    18: "福井県",
    19: "山梨県",
    20: "長野県",
    21: "岐阜県",
    22: "静岡県",
    23: "愛知県",
    24: "三重県",
    25: "滋賀県",
    26: "京都府",
    27: "大阪府",
    28: "兵庫県",
    29: "奈良県",
    30: "和歌山県",
    31: "鳥取県",
    32: "島根県",
    33: "岡山県",
    34: "広島県",
    35: "山口県",
    36: "徳島県",
    37: "香川県",
    38: "愛媛県",
    39: "高知県",
    40: "福岡県",
    41: "佐賀県",
    42: "長崎県",
    43: "熊本県",
    44: "大分県",
    45: "宮崎県",
    46: "鹿児島県",
    47: "沖縄県",
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      let query = supabase.from("posts").select(
        `
        id,
        title,
        content,
        created_at,
        user:user_id ( name ),
        category:category_id ( name ),
        prefecture:prefecture_id ( name )
      `
      );

      if (category && category !== "all") {
        query = query.eq("category_id", Number(category));
      }
      if (prefecture && prefecture !== "all") {
        query = query.eq("prefecture_id", Number(prefecture));
      }

      if (keyword) {
        query = query.ilike("title", `%${keyword}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error(error);
      } else {
        const mapped = (data || []).map((d) => ({
          id: d.id,
          title: d.title,
          content: d.content,
          date: new Date(d.created_at).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }),
          user: d.user,
          category: d.category,
          prefecture: d.prefecture,
        }));
        setPosts(mapped);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [category, prefecture, keyword]);

  return (
    <main>
      <Searchbar />
      <div className="space-y-4 mt-5">
        {/* 検索条件と該当件数 */}
        <p className="text-gray-600 tracking-widest">
          {category && category !== "all"
            ? `カテゴリ: ${categoryMap[Number(category)]} | `
            : "カテゴリ: すべて | "}
          {prefecture && prefecture !== "all"
            ? `都道府県: ${prefectureMap[Number(prefecture)]} | `
            : "都道府県: すべて | "}
          キーワード: {keyword || "未指定"} の投稿が
          <span className="font-bold text-xl">{posts.length}</span>{" "}
          件見つかりました。
        </p>

        {/* 検索結果 */}
        <div className="grid grid-cols-3 gap-4 ">
          {loading ? (
            <p>読み込み中...</p>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostComponent
                key={post.id}
                username={post.user.name}
                {...post}
                date={post.date}
                showButton={true}
                href={`/posts/${post.id}`}
                truncate={true}
              />
            ))
          ) : (
            <p>該当する投稿はありません。</p>
          )}
        </div>
      </div>
    </main>
  );
}
