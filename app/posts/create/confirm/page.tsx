"use client";

import Link from "next/link";
import Button from "../../../components/Button";
import { useFormContext } from "../layout";

export default function Page() {
  const data = useFormContext();

  const postId = 30;

  return (
    <main className="flex justify-center">
      <div className="px-16 py-10 space-y-6 w-1/2 my-5 bg-white shadow-md rounded-xl">
        <h3 className="text-2xl font-bold tracking-wider text-center text-gray-600">
          投稿確認画面
        </h3>

        <div className="text-left tracking-wider break-words space-y-4">
          {data.map((item, index) => (
            <div key={index}>
              <h4 className="pb-1 border-b pl-3 mt-6 font-bold border-gray-300">
                {item.label}
              </h4>
              <p className="pl-3 pt-3">{item.context}</p>
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
              onClick={() => alert("投稿しました！")}
            >
              投稿する
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
