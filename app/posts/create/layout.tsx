"use client";

import { createContext, useContext, ReactNode } from "react";

interface MyContextType {
  info: string;
  context: string;
}
const contextValue: MyContextType = {
  info: "コンテキストの読み込みに成功しました",
  context: "コンテキストはMyContextです",
};

const MyContext = createContext<MyContextType>(contextValue);

//コンポーネント内でContextを使用するためのカスタムHookを定義
export function useMyContext() {
  return useContext(MyContext);
}

interface PostsLayoutProps {
  children: ReactNode;
}
export default function PostsLayout({ children }: PostsLayoutProps) {
  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
}
