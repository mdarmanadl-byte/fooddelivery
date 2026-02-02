"use client";

import { useCart } from "@/app/(user-dash)/userboard/cart/cardcontext";
import { capitalize } from "@/lib/utils";
import { ChevronDown, MapPin, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import NavbarSearch from "./navsearch";

export default function UserNavbar() {
  const { cartItems } = useCart();
  const [displayCity, setDisplayCity] = useState("Boring Road, Patna");
  const [user, setUser] = useState("X");
  const [search, setSearch] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/user/profile");
        if (res.ok) {
          const data = await res.json();
          if (data.city) setDisplayCity(`${data.city}, India`);
          if (data.name) setUser(data.name);
        }
      } catch {}
    };
    fetchUserData();
  }, []);

  const cartCount = cartItems.reduce(
    (total: number, item: any) => total + item.quantity,
    0
  );

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-8">
          <Link href="/userboard" className="text-white font-black text-2xl">
            FOOD<span className="text-amber-500">DASH</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 text-white/70 text-sm">
            <MapPin size={16} className="text-amber-500" />
            <span>{capitalize(displayCity)}</span>
            <ChevronDown size={14} />
          </div>
        </div>

        {/* CENTER SEARCH (ONLY ON /userboard) */}
        {pathname === "/userboard" && (
          <div className="hidden lg:flex flex-1 max-w-md mx-10">
            <div className="relative w-full">
              <Suspense fallback={null}>
                <NavbarSearch search={search} setSearch={setSearch} />
              </Suspense>
              <Search className="absolute left-3 top-2.5 text-white/30" size={16} />
            </div>
          </div>
        )}

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          <Link href="/userboard/cart" className="relative text-white">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            href="/userboard/profile"
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold">
              {user[0]?.toUpperCase()}
            </div>
            <span className="text-white text-xs hidden sm:inline">
              Profile
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
