"use server";

// import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";
// import type { Database } from "@/types/database.types";
import Navigation from "@/app/components/Navigation";
import { createClient } from "@/app/utils/server";

// 認証状態の監視
const SupabaseListener = async () => {
  // const supabase = createServerClient<Database>({ cookies });
  const supabase = await createClient();

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return <Navigation session={session} />;
};
export default SupabaseListener;
