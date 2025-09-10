import Searchbar from "../components/Searchbar";
import PostComponent from "../components/PostComponent";

export default function Home() {
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
        <div className="grid grid-cols-3 gap-4 ">
          {[1, 2, 3].map((_, i) => (
            <PostComponent
              key={i}
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
          ))}
        </div>
      </div>
    </main>
  );
}
