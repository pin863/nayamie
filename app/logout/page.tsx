// ==========================================================
// ログアウトページ
// ==========================================================

// import { cookies } from "next/headers";
// import { createClient } from "@/app/utils/server";
// import { redirect } from "next/navigation";
// import type { Database } from "@/types/database.types";
import Logout from "@/app/components/Logout";

export default async function LogoutPage() {
  // const supabase = await createClient<Database>();

  // // セッションの取得
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // 未認証の場合、リダイレクト
  // if (!session) {
  //   redirect("/login");
  // }

  return (
    <>
      <Logout />
    </>
  );
}
