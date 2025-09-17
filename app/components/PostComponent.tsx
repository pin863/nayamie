// ==========================================================
// 投稿情報のコンポーネント
// ==========================================================

import type { Post } from "@/types/type";
import Button from "./Button";
import { getCategoryStyle } from "../utils/getCategoryStyle";
import { truncateContent } from "../utils/truncateContent";
import Link from "next/link";

export default function PostComponent({
  id,
  title,
  category,
  prefecture,
  date,
  content,
  username,
  showButton,
  href,
  isOwner,
  truncate = false,
}: Post & { truncate?: boolean }) {
  // カテゴリによって色を変更
  const style = getCategoryStyle(category.name) as React.CSSProperties;
  // contentが50文字以上なら省略する
  const displayContent = truncateContent(content, 50, truncate);

  return (
    <div className="bg-white border border-gray-300 shadow-md p-6 rounded-2xl text-gray-700 space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 justify-center items-center">
          {/* カテゴリ、都道府県、日付 */}
          <div style={style} className="px-4 py-2 rounded-full text-sm">
            <p>{category.name}</p>
          </div>
          <p className="">{prefecture.name}</p>
        </div>
        <p className="text-sm text-gray-400">{date}</p>
      </div>
      {/* タイトル、内容、ユーザー名 */}
      <h2 className="font-bold text-lg">{title}</h2>
      <h3 className="text-sm text-gray-500">{displayContent}</h3>
      <div className="flex justify-between items-center mt-6">
        <p className="text-gray-500 text-xs">{username}</p>

        {/* 編集ボタン */}
        {isOwner && (
          <Link href={`/posts/${id}/edit`}>
            <Button size="sm" shape="square" variant="gray">
              編集
            </Button>
          </Link>
        )}

        {/* 詳しく見るボタン */}
        {showButton && href && (
          <Link href={`/posts/${id}`}>
            <Button size="sm" shape="square" variant="white">
              詳しく見る
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
