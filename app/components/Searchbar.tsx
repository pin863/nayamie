export default function Searchbar() {
  return (
    <div className="flex bg-white items-center justify-center">
      <p>地域の悩みを検索</p>
      <div className="flex border border-gray-300 rounded-full  p-2 ">
        <p>カテゴリ</p>
        <p>都道府県</p>
        <p>キーワード</p>
      </div>
    </div>
  );
}
