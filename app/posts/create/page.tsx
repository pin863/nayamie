"use client";

// ==========================================================
// 投稿作成ページ
// ==========================================================

import { useState } from "react";
import FormInput from "@/app/components/FormInput";
import Button from "@/app/components/Button";
import CategorySelector from "@/app/components/CategorySelector";
import PrefectureSelect from "@/app/components/PrefectureSelect";
import { useRouter } from "next/navigation";
import { usePostContext } from "./context";

export default function Page() {
  const { data, setData } = usePostContext();
  const router = useRouter();
  // 初期値をContextから取る
  const [title, setTitle] = useState(
    data.find((d) => d.label === "タイトル")?.context || ""
  );
  const [content, setContent] = useState(
    data.find((d) => d.label === "詳細内容")?.context || ""
  );
  const [category, setCategory] = useState(
    data.find((d) => d.label === "カテゴリ")?.context || ""
  );
  const [prefecture, setPrefecture] = useState(
    data.find((d) => d.label === "都道府県")?.context || ""
  );
  // フォームの入力項目
  const inputs = [
    {
      label: "タイトル",
      placeholder: "例：観光バスの路上駐車が深刻化",
      labelShow: true,
      postScreen: true,
      as: "input" as const,
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
    router.push("/posts/create/confirm");
  };

  return (
    <main className="lg:flex justify-center">
      <div className="px-6 lg:px-16 py-10 space-y-6 lg:w-1/3 mt-15 bg-white shadow-md rounded-xl">
        <h3 className="text-2xl font-bold tracking-wider text-center text-gray-600">
          投稿画面
        </h3>

        <form onSubmit={handleSubmit}>
          {/* タイトルと詳細内容 */}
          <div className="text-left">
            {inputs.map((input) => (
              <FormInput
                type="text"
                key={input.label}
                label={input.label}
                labelShow={input.labelShow}
                placeholder={input.placeholder}
                as={input.as}
                postScreen={input.postScreen}
                value={input.label === "タイトル" ? title : content}
                onChange={(e) =>
                  input.label === "タイトル"
                    ? setTitle(e.target.value)
                    : setContent(e.target.value)
                }
              />
            ))}
          </div>

          {/* カテゴリ選択 */}
          <CategorySelector value={category} onChange={setCategory} />

          {/* 都道府県選択 */}
          <PrefectureSelect value={prefecture} onChange={setPrefecture} />

          {/* 注意書き */}
          <div className="bg-amber-100 rounded-xl p-4 border border-amber-300 text-orange-900 tracking-wider mt-4">
            <p className="font-bold pb-1">投稿前にご確認ください</p>
            <ul className="pl-3 text-sm">
              <li>・個人情報は投稿しないでください</li>
              <li>・建設的な議論につながる内容を心がけてください</li>
            </ul>
          </div>

          {/* 確認ボタン */}
          <div className="text-center mt-6">
            <Button type="submit" variant="secondary" size="sm">
              確認する
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
