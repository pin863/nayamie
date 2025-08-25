"use client";
import Link from "next/link";
import { useState } from "react";
import Button from "./Button";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const handleMenuOpen = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div>
      <header className="flex justify-between items-center py-3">
        {/* ロゴとサブテキスト */}
        <div className="flex space-x-3">
          <Link href="/" className="hover:text-gray-700">
            <h1 className="text-xl font-bold">ロゴ</h1>
          </Link>
          <h2>地域の悩みや声をシェアできる掲示板</h2>
        </div>

        {/* PC用メニュー（md以上） */}
        <nav className="hidden md:flex space-x-6 font-semibold ">
          <Link href="/login" className="hover:text-gray-700">
            <Button variant="primary" size="sm">
              ログイン
            </Button>
          </Link>

          <Link href="/signup" className="hover:text-gray-700">
            <Button variant="gray" size="sm">
              新規登録
            </Button>
          </Link>
        </nav>

        {/* ハンバーガーボタン（md未満） */}
        <button
          onClick={handleMenuOpen}
          type="button"
          className="md:hidden flex flex-col justify-center items-center space-y-1 z-20 fixed right-6 top-6"
          aria-label="メニューを開く"
        >
          <div
            className={
              openMenu
                ? "w-8 h-0.5 bg-gray-600 translate-y-2.5 rotate-45 transition duration-300 ease-in-out"
                : "w-8 h-0.5 bg-gray-600 transition duration-300 ease-in-out"
            }
          />
          <div
            className={
              openMenu
                ? "opacity-0 transition duration-300 ease-in-out"
                : "w-8 h-0.5 bg-gray-600 transition duration-300 ease-in-out"
            }
          />
          <div
            className={
              openMenu
                ? "w-8 h-0.5 bg-gray-600 -rotate-45 transition duration-300 ease-in-out"
                : "w-8 h-0.5 bg-gray-600 transition duration-300 ease-in-out"
            }
          />
        </button>

        {/* オーバーレイ（メニュー開いてるときだけ表示） */}
        {openMenu && (
          <div
            onClick={() => setOpenMenu(false)}
            className="fixed top-0 left-0 w-full h-full bg-black/50 z-0 "
          />
        )}

        {/* スマホ用メニュー */}
        <nav
          className={`
    fixed top-0 right-0 w-8/12 h-full bg-slate-50 shadow-lg flex flex-col pt-16 px-6
    transition-transform duration-300 ease-in-out z-10
    ${openMenu ? "translate-x-0" : "translate-x-full"}
  `}
        >
          <Link
            href="/"
            className="py-3 border-b border-gray-300"
            onClick={() => setOpenMenu(false)}
          >
            ホーム
          </Link>
          <Link
            href="/login"
            className="py-3 border-b border-gray-300"
            onClick={() => setOpenMenu(false)}
          >
            ログイン
          </Link>
          <Link
            href="/signup"
            className="py-3 border-b border-gray-300"
            onClick={() => setOpenMenu(false)}
          >
            新規登録
          </Link>
        </nav>
      </header>
    </div>
  );
}
