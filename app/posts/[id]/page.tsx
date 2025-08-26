import PostComponent from "../../components/PostComponent";

export default function Home() {
  const damy = {
    category: "ごみ問題",
    title: "タイトルですタイトルです",
    content: "本文です本文です本文です本文です本文です本文です本文です",
    prefecture: "東京都",
    date: "2025年8月1日",
    username: "田中たろう",
    showButton: false,
  };
  return (
    <main>
      <div className="space-y-4 mt-5">
        <div className="w-1/2 mx-auto">
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
