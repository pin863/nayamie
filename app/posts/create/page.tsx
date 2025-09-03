"use client";

import React, { useState } from "react";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";
import CategorySelector from "../../components/CategorySelector";
import PrefectureSelect from "@/app/components/PrefectureSelect";
import { useRouter } from "next/navigation";
import { useFormContext } from "./layout";

export default function Page() {
  const { setData } = useFormContext();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [prefecture, setPrefecture] = useState("");

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
    <main className="flex justify-center">
      <div className="px-16 py-10 space-y-6 w-1/2 my-5 bg-white shadow-md rounded-xl">
        <h3 className="text-2xl font-bold tracking-wider text-center text-gray-600">
          投稿画面
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="text-left">
            {inputs.map((input) => {
              let inputValue = "";
              let inputOnChange: React.ChangeEventHandler<
                HTMLInputElement | HTMLTextAreaElement
              > = () => {};

              if (input.label === "タイトル") {
                inputValue = title;
                inputOnChange = (e) => setTitle(e.target.value);
              } else if (input.label === "詳細内容") {
                inputValue = content;
                inputOnChange = (e) => setContent(e.target.value);
              }

              return (
                <FormInput
                  key={input.label}
                  label={input.label}
                  labelShow={input.labelShow}
                  placeholder={input.placeholder}
                  as={input.as}
                  postScreen={input.postScreen}
                  value={inputValue}
                  onChange={inputOnChange}
                />
              );
            })}
          </div>

          {/* カテゴリ選択 */}
          <CategorySelector value={category} onChange={setCategory} />

          {/* 都道府県選択 */}
          <PrefectureSelect value={prefecture} onChange={setPrefecture} />

          <div className="bg-amber-100 rounded-xl p-4 border border-amber-300 text-orange-900 tracking-wider mt-4">
            <p className="font-bold pb-1">投稿前にご確認ください</p>
            <ul className="pl-3 text-sm">
              <li>・個人情報は投稿しないでください</li>
              <li>・建設的な議論につながる内容を心がけてください</li>
            </ul>
          </div>

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
