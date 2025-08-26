"use client";

import Link from "next/link";
import FormInput from "../components/field/FormInput";
import Button from "../components/Button";

export default function page() {
  //FormInputの要素
  const inputs = [
    { label: "メールアドレス", placeholder: "メールアドレス" },
    { label: "パスワード", placeholder: "パスワード" },
  ];

  return (
    <>
      <main className="flex justify-center">
        <div className="px-16 py-10 space-y-6 w-1/3 mt-15 bg-white shadow-md rounded-xl">
          <h1 className="text-3xl font-bold tracking-wider text-center text-gray-600">
            ログイン
          </h1>
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
              onClick={() => alert("ログイン")}
            >
              ログイン
            </Button>
          </div>
          <div className="text-center">
            <Link href="/signup">
              <Button
                variant="white"
                size="sm"
                shape="square"
                className="w-full"
              >
                <p className="">アカウントをお持ちでない方は新規登録</p>
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
