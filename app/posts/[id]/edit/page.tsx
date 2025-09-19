"use client";

// ==========================================================
// 投稿編集ページ
// ==========================================================

import { useState, useEffect } from "react";
import Link from "next/link";
import FormInput from "@/app/components/FormInput";
import Button from "@/app/components/Button";
import CategorySelector from "@/app/components/CategorySelector";
import PrefectureSelect from "@/app/components/PrefectureSelect";
import { useRouter, useParams } from "next/navigation";
import { getPostById } from "@/app/utils/supabaseFunctions";
import { usePostContext } from "@/app/context/postcontext";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { data, setData } = usePostContext();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [prefecture, setPrefecture] = useState("");

  useEffect(() => {
    if (!data?.length) {
      getPostById(Number(id)).then((post) => {
        const newData = [
          { label: "id", context: id },
          { label: "タイトル", context: post.title },
          { label: "詳細内容", context: post.content },
          { label: "カテゴリ", context: post.category.name },
          { label: "都道府県", context: post.prefecture.name },
        ];
        setData(newData);

        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category.name);
        setPrefecture(post.prefecture.name);
      });
    } else {
      setTitle(data.find((d) => d.label === "タイトル")?.context || "");
      setContent(data.find((d) => d.label === "詳細内容")?.context || "");
      setCategory(data.find((d) => d.label === "カテゴリ")?.context || "");
      setPrefecture(data.find((d) => d.label === "都道府県")?.context || "");
    }
  }, [id, data, setData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setData([
      { label: "id", context: id },
      { label: "タイトル", context: title },
      { label: "詳細内容", context: content },
      { label: "カテゴリ", context: category },
      { label: "都道府県", context: prefecture },
    ]);

    router.push(`/posts/${id}/edit/confirm`);
  };

  return (
    <main className="flex justify-center">
      <div className="px-16 py-10 space-y-6 lg:w-1/2 my-5 bg-white shadow-md rounded-xl">
        <h3 className="text-2xl font-bold tracking-wider text-center text-gray-600">
          投稿編集画面
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="text-left">
            <FormInput
              type="text"
              label="タイトル"
              placeholder="例：観光バスの路上駐車が深刻化"
              postScreen
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormInput
              type="text"
              label="詳細内容"
              placeholder="地域の悩みや困りごとの詳細や状況を具体的に説明してください。"
              postScreen
              as="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <CategorySelector value={category} onChange={setCategory} />
          <PrefectureSelect value={prefecture} onChange={setPrefecture} />

          <div className="bg-amber-100 rounded-xl p-4 border border-amber-300 text-orange-900 tracking-wider">
            <p className="font-bold pb-1">投稿前にご確認ください</p>
            <ul className="pl-3 text-sm">
              <li>・個人情報は投稿しないでください</li>
              <li>・建設的な議論につながる内容を心がけてください</li>
            </ul>
          </div>

          <div className="text-center space-x-6 mt-10">
            <Link href={`/posts/${id}/delete`}>
              <Button variant="red" size="sm">
                削除する
              </Button>
            </Link>
            <Button type="submit" variant="secondary" size="sm">
              確認する
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
