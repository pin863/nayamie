"use client";
import React, { useState } from "react";

const categories = [
  "カテゴリ1",
  "カテゴリ2",
  "カテゴリ3",
  "カテゴリ4",
  "カテゴリ5",
  "カテゴリ6",
];

export default function CategorySelector() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <label
        htmlFor="category"
        className="-mt-6 text-sm font-bold tracking-widest text-gray-500 mb-2 block"
      >
        カテゴリ
        <span className="text-red-500">*</span>
      </label>

      {/* ボタングリッド */}
      <div className="grid grid-cols-3 gap-3 justify-items-center">
        {categories.map((cat) => {
          const isActive = selected === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
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
