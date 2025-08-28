import Searchbar from "../components/Searchbar";
import PostComponent from "../components/PostComponent";

export default function Home() {
  const dummy = {
    category: "ごみ問題",
    title: "タイトルですタイトルです",
    content: "本文です本文です本文です本文です本文です本文です本文です",
    prefecture: "東京都",
    date: "2025年8月1日",
    username: "田中たろう",
    showButton: true,
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
          <PostComponent
            category={dummy.category}
            prefecture={dummy.prefecture}
            date={dummy.date}
            title={dummy.title}
            content={dummy.content}
            username={dummy.username}
            showButton={dummy.showButton}
          />
          <PostComponent
            category={dummy.category}
            prefecture={dummy.prefecture}
            date={dummy.date}
            title={dummy.title}
            content={dummy.content}
            username={dummy.username}
            showButton={dummy.showButton}
          />
          <PostComponent
            category={dummy.category}
            prefecture={dummy.prefecture}
            date={dummy.date}
            title={dummy.title}
            content={dummy.content}
            username={dummy.username}
            showButton={dummy.showButton}
          />
        </div>
      </div>
    </main>
  );
}
