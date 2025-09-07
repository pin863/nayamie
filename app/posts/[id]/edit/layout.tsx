"use client";
import { PostContext, PostContextType } from "@/app/context/postcontext";
import { useState, ReactNode } from "react";

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
