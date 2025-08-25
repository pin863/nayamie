import { FaSearch } from "react-icons/fa";

export default function Searchbar() {
  return (
    <div className="flex items-center border border-gray-300 rounded-full px-6 py-3 max-w-3xl mx-auto bg-white">
      {/* カテゴリ */}
      <div className="flex items-center space-x-2 px-2">
        <label htmlFor="category" className="sr-only">
          カテゴリ
        </label>
        <select
          id="category"
          className="outline-none bg-transparent text-sm"
          defaultValue=""
        >
          <option value="" disabled hidden>
            カテゴリ
          </option>
          <option value="ごみ問題">ごみ問題</option>
          <option value="騒音">騒音</option>
          <option value="外国人">外国人</option>
          <option value="自然・環境">自然・環境</option>
          <option value="子育て">子育て</option>
          <option value="その他">その他</option>
        </select>
      </div>

      {/* 縦線 */}
      <div className="border-l border-gray-300 h-6"></div>

      {/* 都道府県 */}
      <div className="flex items-center space-x-2 px-2">
        <label htmlFor="prefecture" className="sr-only">
          都道府県
        </label>
        <select
          id="prefecture"
          className="outline-none bg-transparent text-sm"
          defaultValue=""
        >
          <option value="" disabled hidden>
            都道府県
          </option>
          <option value="北海道">北海道</option>
          <option value="東京都">東京都</option>
          <option value="大阪府">大阪府</option>
        </select>
      </div>

      {/* 縦線 */}
      <div className="border-l border-gray-300 h-6"></div>

      {/* キーワード */}
      <div className="flex items-center space-x-2 px-2 flex-grow">
        <label htmlFor="keyword" className="sr-only">
          キーワード
        </label>
        <input
          id="keyword"
          type="text"
          placeholder="キーワードを入力"
          className="outline-none bg-transparent text-sm w-full"
        />
        <button
          type="submit"
          className="p-2 bg-orange-400 text-white rounded-full hover:bg-orange-600 transition"
        >
          <FaSearch className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
