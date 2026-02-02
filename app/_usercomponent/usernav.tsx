'use client'

import { useCart } from "@/app/(user-dash)/userboard/cart/cardcontext";
import { capitalize } from "@/lib/utils";
import { ChevronDown, MapPin, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function UserNavbar() {
  // 2. Access cartItems from the context
  const { cartItems } = useCart();
  const [displayCity, setDisplayCity] = useState("Boring Road, Patna");
  const [users, setuser] = useState<string>("xyz")
  const [search, setSearch] = useState("");

  const pathname = usePathname()
  useEffect(() => {
    // Fetch user profile data to get the saved city
    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/user/profile'); // Create a simple GET route for this
        if (res.ok) {
          const user = await res.json();
          if (user.city) setDisplayCity(`${user.city}, India`);
          if (user.name) setuser(`${user.name}`)
        }
      } catch (err) {
        // Fallback stays as Boring Road
      }
    };
    fetchUserData();
  }, []);
  // 3. Calculate total quantity (e.g., if user adds 2 of the same item)
  const cartCount = cartItems.reduce((total: number, item: any) => total + item.quantity, 0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathsname = usePathname();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    // Updates the URL to /userboard?query=biryani without a full page reload
    router.replace(`${pathsname}?${params.toString()}`);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Left: Branding & Location */}
        <div className="flex items-center gap-8">
          <Link href="/userboard" className="text-white font-black text-2xl tracking-tighter">
            FOOD<span className="text-amber-500">DASH</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 text-white/70 text-sm hover:text-white cursor-pointer transition-all">
            <MapPin size={16} className="text-amber-500" />
            <span className="font-medium">{capitalize(displayCity)}</span>
            <ChevronDown size={14} />
          </div>
        </div>

        {/* Center: Search Bar */}
        {pathname === "/userboard" && (
          <div className="hidden lg:flex flex-1 max-w-md mx-10">
            <div className="relative w-full">
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

              <Search className="absolute left-3 top-2.5 text-white/30" size={16} />
            </div>
          </div>)
        }


        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          {/* Cart Icon */}
          <Link href="/userboard/cart" className="relative text-white/80 hover:text-white transition-colors">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Profile Button */}
          <Link
            href="/userboard/profile"
            className="flex items-center gap-2 bg-white/5 border border-white/10 p-1 pr-3 rounded-full hover:bg-white/10 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-black font-bold text-xs">
              {users[0].toUpperCase()}
            </div>
            <span className="text-white text-xs font-medium hidden sm:inline">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}