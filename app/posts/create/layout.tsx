"use client";

import { ReactNode } from "react";
import { PostsContextProvider } from "./context.tsx";

interface PostsLayoutProps {
  children: ReactNode;
}

export default function PostsLayout({ children }: PostsLayoutProps) {
  return (
    <PostsContextProvider>
      {children}
    </PostsContextProvider>
  );
}