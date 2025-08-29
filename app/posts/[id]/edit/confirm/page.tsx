"use client";

import Link from "next/link";
import Button from "../../../../components/Button";

export default function Page() {
  const postId = 30;
  const inputs = [
    {
      label: "タイトル",
      value: "texttext",
    },
    {
      label: "詳細内容",
      value: "texttexttexttexttexttexttexttexttexttexttexttexttexttext",
    },
    {
      label: "カテゴリ",
      value: "カテゴリ1",
    },
    {
      label: "都道府県",
      value: "東京都",
    },
  ];

  return (
    <main className="flex justify-center">
      <div className="px-16 py-10 space-y-6 w-1/2 my-5 bg-white shadow-md rounded-xl">
        <h3 className="text-2xl font-bold tracking-wider text-center text-gray-600">
          編集確認画面
        </h3>

        <div className="text-left tracking-wider break-words space-y-4">
          {inputs.map((input) => (
            <div key={input.label}>
              <h4 className="pb-1 border-b pl-3 mt-6 font-bold border-gray-300">
                {input.label}
              </h4>
              <p className="pl-3 pt-3">{input.value}</p>
            </div>
          ))}
        </div>

        <div className="text-center space-x-6 mt-10">
          <Link href="/posts/create">
            <Button variant="gray" size="sm">
              修正する
            </Button>
          </Link>
          <Link href={`/posts/${postId}`}>
            <Button
              variant="primary"
              size="sm"
              onClick={() => alert("編集を反映しました！")}
            >
              編集を反映する
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
