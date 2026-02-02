"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashNavbar({
  onToggleSidebar,
  restaurantName,
}: {
  onToggleSidebar: () => void;
  restaurantName: string;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/restaurant/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="glass-nav flex items-center justify-between px-4 h-10">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* MENU ICON */}
        <button
          onClick={onToggleSidebar}
          className="text-white hover:bg-white/10 p-2 rounded"
        >
          ☰
        </button>

        {/* LOGO */}
        <Link href="/dashboard" className="text-white font-bold text-xl">
          FOOD<span className="text-amber-400">Dash</span>
        </Link>

        {/* RESTAURANT NAME */}
        <span className="text-white/60 text-sm">
          Wellcome,  {restaurantName}
        </span>
      </div>

      {/* RIGHT */}

      <div className="flex gap-6 items-center">
        <span className="text-white/70 text-sm italic">Admin Panel</span>
        <button
        onClick={handleLogout}
        className="bg-red-500/80 hover:bg-red-500 text-white px-4 py-1 rounded-lg text-sm"
      >
        Logout
      </button>
      </div>
    </nav>
  );
}
