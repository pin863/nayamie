// ==========================================================
// Supabaseサーバーサイドクライアントを生成
// ==========================================================


import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function createClient<T = unknown>() {
  const cookieStore = await cookies();

  return createServerClient<T>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          }  catch (err) {
            console.error("エラー:", err);
          }
        },
      },
    },
  );
}