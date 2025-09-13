import Searchbar from "@/app/components/Searchbar";
import PostComponent from "@/app/components/PostComponent";
import Button from "@/app/components/Button";
import Link from "next/link";
import { getRecentPosts } from "@/app/utils/supabaseFunctions";
import type { Post } from "@/types/type";
// import { createClient } from "./utils/server";
// import type { Database } from "@/types/database.types";

export default async function Home() {
  // const supabase = await createClient<Database>();

  // // セッションの取得
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // 最近の投稿のデータ取得
  const posts: Post[] = await getRecentPosts();

  return (
    <main className="py-6">
      <Searchbar />
      <div className="text-center my-5">
        <Link href="/posts/create">
          <Button variant="gray" size="sm">
            投稿する
          </Button>
        </Link>
      </div>
      <div className="space-y-4 mt-5">
        <h3>最近の投稿</h3>
        <div className="grid grid-cols-3 gap-4 ">
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
