"use client";

import Link from "next/link";
import FormInput from "@/app/components/FormInput";
import Button from "@/app/components/Button";
import { useState } from "react";

export default function Page() {
  //FormInputの要素
  const inputs = [
    { key: "username", label: "ユーザーネーム", placeholder: "ユーザーネーム" },
    { key: "email", label: "メールアドレス", placeholder: "メールアドレス" },
    { key: "password", label: "パスワード", placeholder: "パスワード" },
    {
      key: "passwordConfirm",
      label: "パスワード(確認)",
      placeholder: "パスワード(確認)",
    },
  ];
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const handleChange = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };
  return (
    <>
      <main className="flex justify-center">
        <div className="px-16 py-10 space-y-6 w-1/3 mt-15 bg-white shadow-md rounded-xl">
          <h1 className="text-3xl font-bold tracking-wider text-center">
            新規登録
          </h1>
          <p className="text-gray-600 text-sm">
            *投稿時にユーザーネームは公開されます。
            <br />
            個人を特定できる名前の使用はお控えください。
          </p>
          <div className="text-left">
            {inputs.map((input) => (
              <FormInput
                key={input.label}
                label={input.label}
                placeholder={input.placeholder}
                value={form[input.key as keyof typeof form]}
                onChange={(e) => handleChange(input.key, e)}
              />
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="primary"
              size="md"
              shape="square"
              className="w-full"
              onClick={() => alert("サインアップ！")}
            >
              新規登録
            </Button>
          </div>
          <div className="text-center">
            <Link href="/login">
              <Button
                variant="white"
                size="sm"
                shape="square"
                className="w-full"
              >
                <p className="">アカウントをお持ちの方はログイン</p>
              </Button>{" "}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
