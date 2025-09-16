import Searchbar from "@/app/components/Searchbar";
import PostComponent from "@/app/components/PostComponent";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";

export default function Page() {
  const dummy = {
    id: 1,
    category: { name: "ごみ問題" },
    prefecture: { name: "東京都" },
    title: "タイトルですタイトルです",
    content: "本文です本文です本文です本文です本文です本文です本文です",
    date: "2025年8月1日",
    username: "田中たろう",
    showButton: true,
    user: { name: "田中たろう" },
  };

  return (
    <main>
      <Searchbar />
      <div className="space-y-4 mt-5">
        <p className="text-gray-600 tracking-widest">
          カテゴリ|県|「XXX」の投稿が
          <span className=" font-bold text-xl">XX</span>件見つかりました。
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 flex justify-center">
            <PostComponent
              id={dummy.id}
              category={dummy.category}
              prefecture={dummy.prefecture}
              date={dummy.date}
              title={dummy.title}
              content={dummy.content}
              username={dummy.username}
              showButton={dummy.showButton}
              user={dummy.user}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
