import Searchbar from "./components/Searchbar";
import PostComponent from "./components/PostComponent";

export default function Home() {
  const dummy = {
    category: "ごみ問題",
    title: "タイトルですタイトルです",
    content: "本文です本文です本文です本文です本文です本文です本文です",
    prefecture: "東京都",
    date: "2025年8月1日",
    username: "田中たろう",
    showButton: true,
    href: "/posts/1",
  };
  return (
    <main>
      <Searchbar />
      <div className="space-y-4 mt-5">
        <h3>最近の投稿</h3>
        <div className="grid grid-cols-3 gap-4 ">
          <PostComponent
            category={dummy.category}
            prefecture={dummy.prefecture}
            date={dummy.date}
            title={dummy.title}
            content={dummy.content}
            username={dummy.username}
            showButton={dummy.showButton}
            href={dummy.href}
          />
          <PostComponent
            category={dummy.category}
            prefecture={dummy.prefecture}
            date={dummy.date}
            title={dummy.title}
            content={dummy.content}
            username={dummy.username}
            showButton={dummy.showButton}
            href={dummy.href}
          />
          <PostComponent
            category={dummy.category}
            prefecture={dummy.prefecture}
            date={dummy.date}
            title={dummy.title}
            content={dummy.content}
            username={dummy.username}
            showButton={dummy.showButton}
            href={dummy.href}
          />
        </div>
      </div>
    </main>
  );
}
