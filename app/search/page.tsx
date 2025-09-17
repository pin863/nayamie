"use client";

import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";

export default function Page() {
  return (
    <Suspense fallback={<p>読み込み中...</p>}>
      <SearchPageClient />
    </Suspense>
  );
}
