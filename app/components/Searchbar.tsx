import { FaSearch } from "react-icons/fa";

export default function Searchbar() {
  return (
    <div className="flex items-center mx-auto space-x-4 w-1/2">
      <p className="tracking-widest">地域の悩みを検索</p>
      <div className="flex items-center border border-gray-300 rounded-full px-6 py-3 bg-white flex-1 min-w-0 shadow-md">
        {/* カテゴリ */}
        <div className="flex items-center space-x-2 px-2">
          <select className="outline-none bg-transparent text-sm">
            <option value="" disabled hidden>
              カテゴリ
            </option>
            <option value="ごみ問題">ごみ問題</option>
          </select>
        </div>

        <div className="border-l border-gray-300 h-6"></div>

        {/* 都道府県 */}
        <div className="flex items-center space-x-2 px-2">
          <select className="outline-none bg-transparent text-sm">
            <option value="" disabled hidden>
              都道府県
            </option>
            <option value="北海道">北海道</option>
          </select>
        </div>

        <div className="border-l border-gray-300 h-6"></div>

        {/* キーワード */}
        <div className="flex items-center space-x-2 px-2 flex-1 min-w-0">
          <input
            type="text"
            placeholder="キーワードを入力"
            className="outline-none bg-transparent text-sm w-full min-w-0"
          />
          <button
            type="submit"
            className="p-2 bg-orange-400 text-white rounded-full hover:bg-orange-600 transition"
          >
            <FaSearch className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
