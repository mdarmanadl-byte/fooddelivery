"use client";

import DashNavbar from "@/app/_components/Dashbar";
import Link from "next/link";
import { useState } from "react";
export default function RestaurantDashboardLayout({
  children,
  restaurantName,
}: {
  children: React.ReactNode;
  restaurantName: string;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="h-screen overflow-hidden">
      {/* NAVBAR (logo + menu icon + logout) */}
      <DashNavbar
        onToggleSidebar={() => setOpen(!open)}
        restaurantName={restaurantName}
      />

      <div className="flex relative h-screen">
        {/* SIDEBAR (UNCHANGED) */}
       <aside
  className={`absolute  top-20 relative transition-all duration-300 ease-in-out
    ${open ? "w-35" : "w-0 p-0 h-0 overflow-hidden"}
    glass-card sticky top-20 ml-0 mt-0 h-screen border-none rounded-none `}
>
  <div
    className={`transition-opacity duration-200
      ${open ? "opacity-100 p-2" : "opacity-0 pointer-events-none"}`}
  >
    <nav className="absolute left-3  flex flex-col gap-0.5 top-2">
      <h2 className="text-white/60 text-[10px] uppercase font-bold">
        Management
      </h2>
        <Link
        href="/dashboard"
        className="flex items-center gap-3 text-white/90 hover:bg-white/10 p-2.5 rounded-lg transition-colors text-sm"
      >
        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
        Home
      </Link>

      <Link
        href="/dashboard/order"
        className="flex items-center gap-3 text-white/90 hover:bg-white/10 p-2.5 rounded-lg transition-colors text-sm"
      >
        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
        Orders
      </Link>

      <Link
        href="/dashboard/additem"
        className="flex items-center gap-3 text-white/90 hover:bg-white/10 p-2.5 rounded-lg transition-colors text-sm"
      >
        <span>+</span>
        Add Item
      </Link>
    </nav>
  </div>
</aside>


        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 custom-scrollbar pb-10 pt-10">
          {children}
        </main>
      </div>
    </div>
  );
}
