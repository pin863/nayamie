"use client";

// ==========================================================
// サインアップコンポーネント
// ==========================================================

import Link from "next/link";
import FormInput from "@/app/components/FormInput";
import Button from "@/app/components/Button";
import { useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z
  .object({
    name: z.string().min(2, { message: "2文字以上入力する必要があります。" }),
    email: z
      .string()
      .email({ message: "メールアドレスの形式ではありません。" }),
    password: z
      .string()
      .min(6, { message: "6文字以上入力する必要があります。" }),
    passwordConfirm: z
      .string()
      .min(1, { message: "確認用パスワードを入力してください。" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "パスワードが一致しません。",
  });

type Schema = z.infer<typeof schema>;

export default function Page() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    defaultValues: { name: "", email: "", password: "", passwordConfirm: "" },
    resolver: zodResolver(schema),
  });

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    try {
      // 1:Authにサインアップ
      const { data: signupData, error: errorSignup } =
        await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        });

      if (errorSignup) {
        setMessage("エラーが発生しました: " + errorSignup.message);
        return;
      }

      // 2:AuthのUUIDを使ってusersテーブルにinsert
      if (signupData.user) {
        const { error: insertError } = await supabase.from("users").insert({
          id: signupData.user.id,
          name: data.name,
          email: data.email,
        });

        if (insertError) {
          setMessage(
            "ユーザー作成時にエラーが発生しました: " + insertError.message
          );
          return;
        }
      }

      // メール確認なし→そのままログインしてトップへ
      router.push("/");

      // メール確認あり↓
      // setMessage("登録が完了しました。メールを確認してください。");
      // router.refresh();
    } catch (error) {
      setMessage("エラーが発生しました: " + String(error));
    }
  };

  return (
    <main className="lg:flex justify-center">
      <div className="px-6 lg:px-16 py-10 space-y-6 lg:w-1/3 mt-15 bg-white shadow-md rounded-xl">
        <h1 className="text-3xl font-bold tracking-wider text-center">
          新規登録
        </h1>
        <p className="text-gray-600 text-sm">
          *投稿時にユーザーネームは公開されます。
          <br />
          個人を特定できる名前の使用はお控えください。
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-left">
            <FormInput
              {...register("name")}
              label="ユーザーネーム"
              type="text"
            />
            <p className="text-red-500 text-sm pb-3">{errors.name?.message}</p>

            <FormInput
              {...register("email")}
              label="メールアドレス"
              type="email"
            />
            <p className="text-red-500 text-sm pb-3">{errors.email?.message}</p>

            <FormInput
              {...register("password")}
              label="パスワード"
              type="password"
            />
            <p className="text-red-500 text-sm pb-3">
              {errors.password?.message}
            </p>

            <FormInput
              {...register("passwordConfirm")}
              label="パスワード(確認)"
              type="password"
            />
            <p className="text-red-500 text-sm pb-3">
              {errors.passwordConfirm?.message}
            </p>
          </div>

          <div className="text-center my-3">
            {message && <p className="text-red-500 my-3">{message}</p>}
            <Button
              variant="primary"
              size="md"
              shape="square"
              className="w-full"
              type="submit"
            >
              新規登録
            </Button>
          </div>
          <div className="text-center pt-3">
            <Link href="/login">
              <Button
                variant="white"
                size="sm"
                shape="square"
                className="w-full"
              >
                <p>アカウントをお持ちの方はログイン</p>
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
