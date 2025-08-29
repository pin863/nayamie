"use client";

import Link from "next/link";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";
import CategorySelector from "../../components/CategorySelector";
import PrefectureSelect from "@/app/components/PrefectureSelect";

export default function page() {
  //FormInputの要素
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

  return (
    <>
      <main className="flex justify-center">
        <div className="px-16 py-10 space-y-6 w-1/2 mt-15 bg-white shadow-md rounded-xl">
          <h3 className="text-2xl font-bold tracking-wider text-center text-gray-600">
            投稿画面
          </h3>
          <div className="text-left">
            {/* タイトルと詳細内容入力エリア */}
            {inputs.map((input) => (
              <FormInput
                key={input.label}
                label={input.label}
                labelShow={input.labelShow}
                placeholder={input.placeholder}
                as={input.as}
                postScreen={input.postScreen}
              />
            ))}
          </div>
          {/* カテゴリ選択 */}
          <CategorySelector />
          {/* 都道府県選択 */}
          <PrefectureSelect />
          <div className="text-center">
            <Link href="/posts/create/confirm">
              <Button variant="secondary" size="sm" shape="square">
                確認する
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
