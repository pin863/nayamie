"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import FormInput from "@/app/components/FormInput";
import Button from "@/app/components/Button";
import CategorySelector from "@/app/components/CategorySelector";
import PrefectureSelect from "@/app/components/PrefectureSelect";
import { useRouter } from "next/navigation";
import { useFormContext } from "./layout";
import { getPostById } from "@/app/utils/supabaseFunctions";

interface PageProps {
  params: Promise<{ id: string }>;
}
export default function Page({ params }: PageProps) {
  const inputs = [
    {
      label: "タイトル",
      placeholder: "例：観光バスの路上駐車が深刻化",
      labelShow: true,
      postScreen: true,
    },
    {
      label: "詳細内容",
      placeholder:
        "地域の悩みや困りごとの詳細や状況を具体的に説明してください。",
      labelShow: true,
      as: "textarea" as const,
      postScreen: true,
    },
  ];
  const { data, setData } = useFormContext();
  const router = useRouter();

  const { id } = use(params);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [prefecture, setPrefecture] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPostById(Number(id));
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category.name);
      setPrefecture(post.prefecture.name);

      // context にも反映
      setData([
        { label: "タイトル", context: post.title },
        { label: "詳細内容", context: post.content },
        { label: "カテゴリ", context: post.category.name },
        { label: "都道府県", context: post.prefecture.name },
      ]);
    };
    fetchPost();
  }, [id]);

  // フォーム送信
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 入力内容をContextに保存
    setData([
      { label: "タイトル", context: title },
      { label: "詳細内容", context: content },
      { label: "カテゴリ", context: category },
      { label: "都道府県", context: prefecture },
    ]);

    // 確認画面へ遷移
    router.push(`/posts/create/${id}/edit/confirm`);
  };
  return (
    <>
      <main className="flex justify-center">
        <div className="px-16 py-10 space-y-6 w-1/2 my-5 bg-white shadow-md rounded-xl">
          <h3 className="text-2xl font-bold tracking-wider text-center text-gray-600">
            投稿編集画面
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="text-left">
              {/* タイトルと詳細内容入力エリア */}
              <FormInput
                label="タイトル"
                placeholder={inputs[0].placeholder}
                postScreen={true}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <FormInput
                label="詳細内容"
                placeholder={inputs[1].placeholder}
                postScreen={true}
                as="textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            {/* カテゴリ選択 */}
            <CategorySelector value={category} onChange={setCategory} />

            {/* 都道府県選択 */}
            <PrefectureSelect value={prefecture} onChange={setPrefecture} />
            <div className="bg-amber-100 rounded-xl p-4 border border-amber-300 text-orange-900 tracking-wider">
              <p className="font-bold pb-1">投稿前にご確認ください</p>
              <ul className="pl-3 text-sm">
                <li>・個人情報は投稿しないでください</li>
                <li>・建設的な議論につながる内容を心がけてください</li>
              </ul>
            </div>
            <div className="text-center space-x-6 mt-10">
              {/* 削除ボタン */}
              <Link href={`/posts/${id}/delete`}>
                <Button variant="red" size="sm">
                  削除する
                </Button>
              </Link>
              {/* 確認ボタン */}
              <Button type="submit" variant="secondary" size="sm">
                確認する
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
