"use client";

import { createContext, useContext, useState, ReactNode } from "react";
// 入力フォームのContext
interface PostContextType {
  label: string;
  context: string;
}

interface PostContextValue {
  data: PostContextType[];
  setData: (data: PostContextType[]) => void;
}

// 初期値
const defaultValue: PostContextValue = {
  data: [],
  setData: () => {},
};

const PostContext = createContext<PostContextValue>(defaultValue);

export function usePostContext() {
  return useContext(PostContext);
}

interface PostsLayoutProps {
  children: ReactNode;
}
export default function PostsLayout({ children }: PostsLayoutProps) {
  const [data, setData] = useState<PostContextType[]>([]);

  return (
    <PostContext.Provider value={{ data, setData }}>
      {children}
    </PostContext.Provider>
  );
}
