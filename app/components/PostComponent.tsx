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
    <div className="bg-white border border-gray-300 shadow-md p-6 rounded-2xl text-gray-700 flex flex-col justify-between min-h-[250px]">
      {/* 上段：カテゴリ・日付 */}

      <div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <div style={style} className="px-4 py-2 rounded-full text-sm">
              <p>{category.name}</p>
            </div>
            <p className="text-stone-600">{prefecture.name}</p>
          </div>
          <p className="text-sm text-stone-400">{date}</p>
        </div>
        {/* タイトル・内容 */}
        <h2 className="font-bold text-stone-700 text-lg mt-3">{title}</h2>
        <h3 className="text-sm my-3 text-stone-600">{displayContent}</h3>
      </div>

      {/* 下段：ユーザー名・ボタン */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-stone-400 text-xs">{username}</p>
        <div className="flex space-x-2">
          {isOwner && (
            <Link href={`/posts/${id}/edit`}>
              <Button size="sm" shape="square" variant="gray">
                編集
              </Button>
            </Link>
          )}
          {showButton && href && (
            <Link href={`/posts/${id}`}>
              <Button size="sm" shape="square" variant="white">
                詳しく見る
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
