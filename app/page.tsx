"use client";

import Searchbar from "./components/Searchbar";
import PostComponent from "./components/PostComponent";
import Button from "./components/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllPosts } from "./utils/supabaseFunctions";

type Post = {
  id: string;
  title: string;
  content: string;
};

export default function Home() {
  const dummy = {
    title: "タイトルですタイトルです",
    content:
      "本文です本文です本文です本文です本文です本文です本文です本文です本文です本文です本文です本文です本文です本文です本文です本文です本文です本文です本文です本文です本文です",
    prefecture: "東京都",
    date: "2025年8月1日",
    username: "田中たろう",
    showButton: true,
    href: "/posts/1",
    truncate: true,
  };

  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const getPosts = async () => {
      const posts = await getAllPosts();
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
          <PostComponent {...dummy} category={"ごみ問題"} />
          <PostComponent {...dummy} category={"騒音"} />
          <PostComponent {...dummy} category={"外国人"} />
          <PostComponent {...dummy} category={"自然・環境"} />
          <PostComponent {...dummy} category={"子育て"} />
          <PostComponent {...dummy} category={"その他"} />
          <PostComponent {...posts} />
        </div>
      </div>
    </main>
  );
}
