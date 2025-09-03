"use client";

import Searchbar from "@/app/components/Searchbar";
import PostComponent from "@/app/components/PostComponent";
import Button from "@/app/components/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getRecentPosts } from "@/app/utils/supabaseFunctions";
import type { Post } from "@/types/type";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const getPosts = async () => {
      const posts = await getRecentPosts();
      setPosts(posts ?? []);
      console.log(posts);
    };
    getPosts();
  }, []);

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
