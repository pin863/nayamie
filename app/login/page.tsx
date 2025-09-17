// ==========================================================
// ログインページ
// ==========================================================

import Login from "@/app/components/Login";
import { createClient } from "@/app/utils/server";
import { redirect } from "next/navigation";
import type { Database } from "@/types/database.types";

export default async function Page() {
  const supabase = await createClient<Database>();

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 認証している場合、リダイレクト
  if (session) {
    redirect("/");
  }

  return (
    <>
      <Login />
    </>
  );
}
