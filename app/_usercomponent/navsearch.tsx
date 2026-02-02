"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function NavbarSearch({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (v: string) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set("query", value);
    else params.delete("query");

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <input
      type="text"
      value={search}
      onChange={(e) => {
        const value = e.target.value;
        setSearch(value);
        handleSearch(value);
      }}
      placeholder="Search for 'Biryani' or 'Rolls'..."
      className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder:text-white/20"
    />
  );
}
