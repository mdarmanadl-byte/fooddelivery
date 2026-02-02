"use client";

import { useCart } from "@/app/(user-dash)/userboard/cart/cardcontext";
import { capitalize } from "@/lib/utils";
import { ChevronDown, Clock, MapPin, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import NavbarSearch from "./navsearch";

export default function UserNavbar() {
  const { cartItems } = useCart();
  const [displayCity, setDisplayCity] = useState("Boring Road, Patna");
  const [user, setUser] = useState("X");
  // REMOVED: const [search, setSearch] = useState(""); <-- Handled by navsearch now
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
      } catch { }
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

        {/* CENTER SEARCH */}
        {pathname === "/userboard" && (
          <div className="hidden lg:flex flex-1 max-w-md mx-10">
            <div className="relative w-full">
              {/* IMPORTANT: NavbarSearch now handles its own Suspense inside its file or here */}
              <Suspense fallback={<div className="h-9 w-full bg-white/5 rounded-full animate-pulse" />}>
                <NavbarSearch /> 
              </Suspense>
              <Search className="absolute left-3 top-2.5 text-white/30" size={16} />
            </div>
          </div>
        )}

        {/* RIGHT */}
        <div className="flex items-center gap-6 ">
          {/* Orders */}
          <Link
            href="/userboard/order"
            className="group flex flex-row items-center gap-1 text-white/60 hover:text-amber-500 transition-all "
          >
            <div className="relative">
              <Clock size={22} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Orders</span>
          </Link>

          {/* Cart */}
          <Link href="/userboard/cart" className="relative text-white hover:text-amber-500 transition-all">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Profile */}
          <Link
            href="/userboard/profile"
            className="group flex items-center gap-2 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-amber-500 text-black flex items-center border-2 border-amber-50 justify-center font-bold shrink-0 transition-all group-hover:border-amber-500">
              {user[0]?.toUpperCase()}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 transition-colors group-hover:text-amber-500">
              Profile
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}