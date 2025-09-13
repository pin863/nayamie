import { createClient } from "@/app/utils/server";
import Navigation from "./Navigation";
import Link from "next/link";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <header className="flex justify-between items-center py-3">
      {/* ロゴとサブテキスト */}
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
