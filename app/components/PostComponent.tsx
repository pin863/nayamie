import type { Post } from "type";
import Button from "./Button";
import { getCategoryStyle } from "../utils/getCategoryStyle";
import Link from "next/link";

export default function PostComponent({
  title,
  category,
  prefecture,
  date,
  content,
  username,
  showButton,
  href,
  isOwner,
}: Post) {
  const style = getCategoryStyle(category) as React.CSSProperties;

  return (
    <div className="bg-white border border-gray-300 shadow-md p-6 rounded-2xl text-gray-700 space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 justify-center items-center">
          <div style={style} className="px-4 py-2 rounded-2xl">
            <p>{category}</p>
          </div>
          <p className="">{prefecture}</p>
        </div>
        <p className="text-sm text-gray-400">{date}</p>
      </div>
      <h2 className="font-bold text-lg">{title}</h2>
      <h3 className="text-sm text-gray-500">{content}</h3>
      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-xs">{username}</p>

        {/* 編集ボタン */}
        {isOwner && (
          <Button size="sm" shape="square" variant="secondary">
            編集
          </Button>
        )}

        {/* 詳しく見るボタン */}
        {showButton && href && (
          <Link href={href}>
            <Button size="sm" shape="square" className="text-sm">
              詳しく見る
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
