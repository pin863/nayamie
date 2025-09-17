"use client";

// ==========================================================
// 投稿作成画面-カテゴリ選択エリア
// ==========================================================

import React from "react";

const categories = ["ごみ問題", "騒音", "外国人", "交通", "子育て", "その他"];

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function CategorySelector({ value, onChange }: Props) {
  return (
    <div className="py-5">
      <label
        htmlFor="category"
        className="-mt-6 text-sm font-bold tracking-widest text-gray-500 mb-2 block"
      >
        カテゴリ
        <span className="text-red-500">*</span>
      </label>

      <div className="grid grid-cols-3 gap-3 justify-items-center">
        {categories.map((cat) => {
          const isActive = value === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onChange(cat)}
              className={`px-6 py-3 rounded-lg font-bold transition-colors w-full border border-gray-300 shadow-sm
                ${isActive ? "bg-primary text-white" : "bg-white text-gray-700"}
                hover:opacity-75 hover:cursor-pointer`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
