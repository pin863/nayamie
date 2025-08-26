"use client";

import Link from "next/link";
import FormInput from "../components/field/FormInput";
import Button from "../components/Button";

export default function page() {
  //FormInputの要素
  const inputs = [
    { label: "ユーザーネーム", placeholder: "ユーザーネーム" },
    { label: "メールアドレス", placeholder: "メールアドレス" },
    { label: "パスワード", placeholder: "パスワード" },
    { label: "パスワード(確認)", placeholder: "パスワード(確認)" },
  ];

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
