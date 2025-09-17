"use client";

// ==========================================================
// トップページ
// ==========================================================

import { useEffect, useState } from "react";
import Searchbar from "@/app/components/Searchbar";
import PostComponent from "@/app/components/PostComponent";
import { getAllPosts } from "@/app/utils/supabaseFunctions";
import type { Post } from "@/types/type";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    const data = await getAllPosts();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="py-6">
      <Searchbar />
      <div className="space-y-4 mt-5">
        <h3>最近の投稿</h3>
        {loading ? (
          <p>読み込み中...</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {posts.map((post) => (
              <PostComponent
                key={post.id}
                {...post}
                date={post.date}
                showButton={true}
                href={`/posts/${post.id}`}
                truncate={true}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
