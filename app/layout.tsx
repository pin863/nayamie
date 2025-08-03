import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ナヤミエ",
  description: "地域の悩みや声をシェアできる掲示板",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
