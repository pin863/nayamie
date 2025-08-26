import Searchbar from "../components/Searchbar";
import PostComponent from "../components/PostComponent";

export default function Home() {
  const damy = {
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
            category={damy.category}
            prefecture={damy.prefecture}
            date={damy.date}
            title={damy.title}
            content={damy.content}
            username={damy.username}
            showButton={damy.showButton}
          />
          <PostComponent
            category={damy.category}
            prefecture={damy.prefecture}
            date={damy.date}
            title={damy.title}
            content={damy.content}
            username={damy.username}
            showButton={damy.showButton}
          />
          <PostComponent
            category={damy.category}
            prefecture={damy.prefecture}
            date={damy.date}
            title={damy.title}
            content={damy.content}
            username={damy.username}
            showButton={damy.showButton}
          />
        </div>
      </div>
    </main>
  );
}
