"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// Inner component that actually uses the search hook
function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [text, setText] = useState(searchParams.get("query") || "");

useEffect(() => {
  const timer = setTimeout(() => {
    const params = new URLSearchParams(searchParams.toString());
    const currentQuery = searchParams.get("query") || "";

    // ONLY update the router if the text is actually different from the current URL
    if (text !== currentQuery) {
      if (text) params.set("query", text);
      else params.delete("query");

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, 300);

  return () => clearTimeout(timer);
}, [text, pathname, router, searchParams]);

  return (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Search for 'Biryani'..."
      className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
    />
  );
}

// Default export wrapped in Suspense for Vercel
export default function NavbarSearch() {
  return (
    <Suspense fallback={<div className="w-full h-10 bg-white/5 animate-pulse rounded-full" />}>
      <SearchInput />
    </Suspense>
  );
}