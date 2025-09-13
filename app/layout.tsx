import type { Metadata } from "next";
import "@/app/globals.css";
import SupabaseListener from "@/app/components/Supabase-listener";

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
      <body className="bg-basecolor text-gray-700 mx-30 tracking-wide">
        <SupabaseListener />
        {children}
      </body>
    </html>
  );
}
