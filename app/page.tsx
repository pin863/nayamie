"use client";

// ==========================================================
// トップページ
// ==========================================================

import { useEffect, useState } from "react";
import Searchbar from "@/app/components/Searchbar";
import PostComponent from "@/app/components/PostComponent";
import { getAllPosts } from "@/app/utils/supabaseFunctions";
import type { Post } from "@/types/type";
import Button from "./components/Button";
import Image from "next/image";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // ページネーション用
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6; // 1ページあたりの件数

  const fetchPosts = async (page: number) => {
    // loading中でも前の投稿は残す
    setLoading(true);
    const offset = (page - 1) * limit;
    const { data, count } = await getAllPosts(limit, offset);
    setPosts(data);
    if (count) {
      setTotalPages(Math.ceil(count / limit));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  return (
    <main className="pt-6 pb-15">
      {/* メインビジュアル */}
      <div className="flex justify-center mb-6">
        <Image
          src="/top.webp"
          alt="地域の悩みを見える化。"
          width={300}
          height={300}
        />
      </div>

      {/* 検索バー */}
      <Searchbar />

      <div className="space-y-4 mt-5">
        <h3>最近の投稿</h3>

        {/* 投稿リスト */}
        {posts.length === 0 && loading ? (
          <p>読み込み中...</p>
        ) : (
          <>
            {/* 投稿情報カード */}
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostComponent
                  key={post.id}
                  {...post}
                  showButton={true}
                  href={`/posts/${post.id}`}
                  truncate={true}
                />
              ))}
            </div>

            {/* ページネーション */}
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
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
              >
                次へ
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
