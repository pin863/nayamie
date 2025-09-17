// ==========================================================
// トップページ
// ==========================================================

import Searchbar from "@/app/components/Searchbar";
import PostComponent from "@/app/components/PostComponent";
import { getAllPosts } from "@/app/utils/supabaseFunctions";
import type { Post } from "@/types/type";

export default async function Home() {
  // 最近の投稿のデータ取得
  const posts: Post[] = await getAllPosts();

  return (
    <main className="py-6">
      {/* 検索バー */}
      <Searchbar />
      <div className="space-y-4 mt-5">
        <h3>最近の投稿</h3>
        <div className="grid grid-cols-3 gap-4 ">
          {/* 投稿 */}
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
      </div>
    </main>
  );
}
