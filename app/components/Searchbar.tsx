"use client";

// ==========================================================
// 検索バー
// ==========================================================

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function Searchbar() {
  const categoryMap = {
    1: "ごみ問題",
    2: "騒音",
    3: "外国人",
    4: "交通",
    5: "子育て",
    6: "その他",
  };

  const prefectureMap = {
    1: "北海道",
    2: "青森県",
    3: "岩手県",
    4: "宮城県",
    5: "秋田県",
    6: "山形県",
    7: "福島県",
    8: "茨城県",
    9: "栃木県",
    10: "群馬県",
    11: "埼玉県",
    12: "千葉県",
    13: "東京都",
    14: "神奈川県",
    15: "新潟県",
    16: "富山県",
    17: "石川県",
    18: "福井県",
    19: "山梨県",
    20: "長野県",
    21: "岐阜県",
    22: "静岡県",
    23: "愛知県",
    24: "三重県",
    25: "滋賀県",
    26: "京都府",
    27: "大阪府",
    28: "兵庫県",
    29: "奈良県",
    30: "和歌山県",
    31: "鳥取県",
    32: "島根県",
    33: "岡山県",
    34: "広島県",
    35: "山口県",
    36: "徳島県",
    37: "香川県",
    38: "愛媛県",
    39: "高知県",
    40: "福岡県",
    41: "佐賀県",
    42: "長崎県",
    43: "熊本県",
    44: "大分県",
    45: "宮崎県",
    46: "鹿児島県",
    47: "沖縄県",
  };

  const router = useRouter();
  const [category, setCategory] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    // 空文字なら all に変換
    params.append("category", category || "all");
    params.append("prefecture", prefecture || "all");
    if (keyword) params.append("keyword", keyword);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-center mx-auto space-y-4 md:space-y-0 md:space-x-4 w-full md:w-1/2">
      {/* 説明テキスト */}
      <p className="tracking-widest">地域の悩みを検索</p>

      <div className="flex flex-col md:flex-row items-center border border-gray-300 rounded-md lg:rounded-full px-4 py-3 bg-white flex-1 min-w-0 shadow-md space-y-2 md:space-y-0 md:space-x-2">
        {/* カテゴリ */}
        <div className="flex items-center space-x-2 px-2 w-full md:w-auto">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-auto outline-none bg-transparent text-sm"
          >
            <option value="" disabled hidden>
              カテゴリ
            </option>

            <option value="all">すべて</option>

            {Object.entries(categoryMap).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="border-l border-gray-300 h-6 hidden md:block"></div>

        {/* 都道府県 */}
        <div className="flex items-center space-x-2 px-2 w-full md:w-auto">
          <select
            value={prefecture}
            onChange={(e) => setPrefecture(e.target.value)}
            className="w-full md:w-auto outline-none bg-transparent text-sm"
          >
            <option value="" disabled hidden>
              都道府県
            </option>

            <option value="all">すべて</option>

            {Object.entries(prefectureMap).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="border-l border-gray-300 h-6 hidden md:block"></div>

        {/* キーワード */}
        <div className="flex items-center space-x-2 px-2 flex-1 min-w-0 w-full">
          <input
            type="text"
            placeholder="キーワードを入力"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="outline-none bg-transparent text-sm w-full min-w-0"
          />
          <button
            type="submit"
            onClick={handleSearch}
            className="p-2 bg-orange-400 text-white rounded-full hover:bg-orange-600 transition"
          >
            <FaSearch className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
