"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import Navigation from "./Navigation";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";

export default function Header() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // 現在のセッション取得
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    // 認証状態の監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // クリーンアップ
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="flex justify-between items-center py-3">
      <div className="flex space-x-3 justify-between items-center tracking-widest">
        <Link href="/" className="hover:text-gray-700">
          <h1 className="text-xl font-bold">ナヤミエ</h1>
        </Link>
        <h2 className="text-sm">
          地域の悩みや声を
          <br />
          シェアできる掲示板
        </h2>
      </div>
      <Navigation session={session} />
    </header>
  );
}
