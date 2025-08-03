import Searchbar from "./components/Searchbar";
import PostComponent from "./components/PostComponent";

export default function Home() {
  const damy = {
    title:"タイトルです"
  }
  return (
    <main>
      <Searchbar />
    <PostComponent title={damy.title} />
    </main>
  );
}
