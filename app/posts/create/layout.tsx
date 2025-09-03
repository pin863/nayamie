"use client";

import { createContext, useContext, ReactNode } from "react";

interface FormContextType {
  label: string;
  context: string;
}
const contextValue: FormContextType[] = [
  {
    label: "タイトル",
    context: "〇〇公園のポイ捨て",
  },
  {
    label: "詳細内容",
    context: "〇〇公園にゴミが散乱しています。",
  },
  {
    label: "カテゴリ",
    context: "ごみ問題",
  },
  {
    label: "都道府県",
    context: "東京都",
  },
];

const FormContext = createContext<FormContextType[]>(contextValue);

//コンポーネント内でContextを使用するためのカスタムhookを定義
export function useFormContext() {
  return useContext(FormContext);
}

interface PostsLayoutProps {
  children: ReactNode;
}
export default function PostsLayout({ children }: PostsLayoutProps) {
  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
}
