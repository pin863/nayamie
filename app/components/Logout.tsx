"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import Button from "./Button";

export default function Logout() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        setMessage("エラーが発生しました。" + error.message);
        return;
      }

      router.push("/login");
    } catch (error) {
      setMessage("エラーが発生しました。" + error);
    }
  };

  return (
    <main className="flex justify-center">
      <div className="px-16 py-10 space-y-6 w-1/3 mt-15 bg-white shadow-md rounded-xl">
        <h3 className="text-2xl tracking-wider text-center text-gray-600">
          ログアウトしますか？
        </h3>

        <div className="text-center space-y-4">
          <form onSubmit={onSubmit}>
            <Button size="md" type="submit">
              ログアウト
            </Button>
          </form>
          {message && <p className="text-red-500">{message}</p>}
        </div>
      </div>
    </main>
  );
}
