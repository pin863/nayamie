"use client";

// ==========================================================
// 投稿削除ページ
// ==========================================================

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getPostById, deletePost } from "@/app/utils/supabaseFunctions";
import Button from "@/app/components/Button";
import { DeletePostType } from "@/types/type";

export default function DeletePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [post, setPost] = useState<DeletePostType | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const resolvedParams = await params;
        const data = await getPostById(Number(resolvedParams.id));
        setPost(data);
      } catch (err) {
        console.error("投稿の取得に失敗しました", err);
        alert("投稿の取得に失敗しました");
        router.back();
      }
    };
    fetchPost();
  }, [params, router]);

  const handleDelete = async () => {
    if (!post) return;

    if (!confirm("本当にこの投稿を削除しますか？")) return;

    try {
      await deletePost(post.id);
      alert("投稿を削除しました。");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("削除に失敗しました。");
    }
  };

  if (!post) {
    return <p className="text-center mt-10">読み込み中...</p>;
  }

  return (
    <main className="flex justify-center">
      <div className="px-16 py-10 space-y-6 lg:w-1/2 my-5 bg-white shadow-md rounded-xl">
        <h3 className="text-2xl font-bold tracking-wider text-center text-gray-600">
          投稿<span className="text-red-400">削除</span>確認画面
        </h3>

        <div className="text-left tracking-wider break-words space-y-4">
          <div>
            <h4 className="pb-1 border-b pl-3 mt-6 font-bold border-gray-300">
              タイトル
            </h4>
            <p className="pl-3 pt-3">{post.title}</p>
          </div>
          <div>
            <h4 className="pb-1 border-b pl-3 mt-6 font-bold border-gray-300">
              詳細内容
            </h4>
            <p className="pl-3 pt-3">{post.content}</p>
          </div>
          <div>
            <h4 className="pb-1 border-b pl-3 mt-6 font-bold border-gray-300">
              カテゴリ
            </h4>
            <p className="pl-3 pt-3">{post.category?.name || "-"}</p>
          </div>
          <div>
            <h4 className="pb-1 border-b pl-3 mt-6 font-bold border-gray-300">
              都道府県
            </h4>
            <p className="pl-3 pt-3">{post.prefecture?.name || "-"}</p>
          </div>
        </div>

        <div className="text-center space-x-6 mt-10">
          <Button variant="gray" size="sm" onClick={() => router.back()}>
            もどる
          </Button>
          <Button variant="primary" size="sm" onClick={handleDelete}>
            削除する
          </Button>
        </div>
      </div>
    </main>
  );
}
