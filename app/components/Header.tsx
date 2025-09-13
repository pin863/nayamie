import { createClient } from "@/app/utils/server";
import Navigation from "./Navigation";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <header className="flex justify-between items-center py-3">
      <div className="flex space-x-3 justify-between items-center tracking-widest">
        <h1>ナヤミエ</h1>
        <h2>地域の悩みや声をシェアできる掲示板</h2>
      </div>
      <Navigation session={session} />
    </header>
  );
}
