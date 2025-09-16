"use client";
import Link from "next/link";
import FormInput from "@/app/components/FormInput";
import Button from "@/app/components/Button";
import { useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
type Schema = z.infer<typeof schema>;

// 入力データの検証ルールを定義
const schema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z.string().min(4, { message: "4文字以上入力する必要があります。" }),
});

export default function Page() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // 初期値
    defaultValues: { email: "", password: "" },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    try {
      // ログイン
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      //エラーチェック
      if (error) {
        setMessage("エラーが発生しました。" + error);
        return;
      }

      // トップページに遷移
      router.push("/");
    } catch (error) {
      setMessage("エラーが発生しました。" + error);
      return;
    } finally {
      router.refresh();
    }
  };

  return (
    <main className="flex justify-center">
      <div className="px-16 py-10 space-y-6 w-1/3 mt-15 bg-white shadow-md rounded-xl">
        <h1 className="text-3xl font-bold tracking-wider text-center text-gray-600">
          ログイン
        </h1>

        <div className="text-left space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              {...register("email", { required: true })}
              type="email"
              label="メールアドレス"
            />
            <p className="text-red-500 text-sm pb-3">{errors.email?.message}</p>
            <FormInput
              {...register("password", { required: true })}
              label="パスワード"
              type="password"
            />
            <p className="text-red-500 text-sm ">{errors.password?.message}</p>

            <div className="text-center py-6">
              <Button
                variant="primary"
                size="md"
                shape="square"
                className="w-full"
                type="submit"
              >
                ログイン
              </Button>
              {message && <p className="text-red-500">{message}</p>}
            </div>

            <div className="text-center">
              <Link href="/signup">
                <Button
                  variant="white"
                  size="sm"
                  shape="square"
                  className="w-full"
                >
                  アカウントをお持ちでない方は新規登録
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
