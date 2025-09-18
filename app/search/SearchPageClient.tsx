"use client";

import { useEffect, useState } from "react";
import Searchbar from "@/app/components/Searchbar";
import PostComponent from "@/app/components/PostComponent";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import Button from "../components/Button";

type PostFromDB = {
  id: number;
  title: string;
  content: string;
  date: string;
  user: { name: string };
  category: { name: string };
  prefecture: { name: string };
};

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const prefecture = searchParams.get("prefecture");
  const keyword = searchParams.get("keyword");

  const [posts, setPosts] = useState<PostFromDB[]>([]);
  const [loading, setLoading] = useState(true);

  // ページネーション用
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 6;

  const categoryMap: Record<string, string> = {
    "1": "ごみ問題",
    "2": "騒音",
    "3": "外国人",
    "4": "交通",
    "5": "子育て",
    "6": "その他",
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

  const fetchPosts = async (currentPage: number) => {
    setLoading(true);
    const offset = (currentPage - 1) * limit;

    let query = supabase
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
    `,
        { count: "exact" }
      )
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (category && category !== "all")
      query = query.eq("category_id", Number(category));
    if (prefecture && prefecture !== "all")
      query = query.eq("prefecture_id", Number(prefecture));
    if (keyword) query = query.ilike("title", `%${keyword}%`);

    const { data, error, count } = await query;

    if (error) {
      console.error(error);
      setPosts([]);
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
      if (count) {
        setTotalPages(Math.ceil(count / limit));
        setTotalCount(count);
      }
    }

    setLoading(false);
  };

  // 検索条件が変わったら page をリセットして fetch
  useEffect(() => {
    setPage(1);
    fetchPosts(1); // ここで currentPage=1 を渡す
  }, [category, prefecture, keyword]);

  // page が変わったとき fetch
  useEffect(() => {
    if (page !== 1) fetchPosts(page);
  }, [page]);

  return (
    <main>
      <Searchbar />
      {/* 検索条件と該当件数 */}
      <div className="space-y-4 mt-5">
        <p className="text-gray-600 tracking-widest">
          {category && category !== "all"
            ? `カテゴリ: ${categoryMap[category]} | `
            : "カテゴリ: すべて | "}
          {prefecture && prefecture !== "all"
            ? `都道府県: ${prefectureMap[Number(prefecture)]} | `
            : "都道府県: すべて | "}
          キーワード: {keyword || "未指定"} の投稿が
          <span className="font-bold text-xl">{totalCount}</span>{" "}
          件見つかりました。
        </p>

        {/* 検索結果 */}
        <div className="grid grid-cols-3 gap-4">
          {loading ? (
            <p>読み込み中...</p>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostComponent
                key={post.id}
                username={post.user.name}
                {...post}
                date={post.date}
                showButton
                href={`/posts/${post.id}`}
                truncate
              />
            ))
          ) : (
            <p className="font-bold mt-3 text-xl">該当する投稿はありません。</p>
          )}
        </div>

        {/* ページネーション */}
        {!loading && posts.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              variant="gray"
              size="sm"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              前へ
            </Button>
            <span>
              {page} / {totalPages}
            </span>
            <Button
              variant="gray"
              size="sm"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              次へ
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
