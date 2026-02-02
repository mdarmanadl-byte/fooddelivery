"use client";

import { Search, Utensils, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
export default function HomeClient({
    restaurants,
    popularDishes,
}: any) {
    const [showLogin, setShowLogin] = useState(false);

    const placeholderImages = [
        "/images/res1.jpg",
        "/images/res2.jpg",
        "/images/res3.jpg",
        "/images/res4.jpg",
        "/images/res5.jpg",
    ];

    const getLocalImage = (id: string) => {
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = id.charCodeAt(i) + ((hash << 5) - hash);
        }
        return placeholderImages[Math.abs(hash) % placeholderImages.length];
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] pb-20">

            {/* HERO */}
            <div className="min-h-screen bg-[#0a0a0a] pb-20">
                {/* 1. Hero Section with Search */}
                <section className="relative h-[40vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 to-transparent" />
                    <h1 className="text-white text-4xl md:text-6xl font-black mb-4 z-10 tracking-tight">
                        Cravings satisfied in <span className="text-amber-500">India</span>
                    </h1>
                    <div className="w-full max-w-2xl relative z-10">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                        <input

                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setShowLogin(true);
                                }
                            }}

                            type="text"
                            placeholder="Search for 'Biryani', 'Pizza', or 'Manav Hotel'..."
                            className="w-full bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:ring-2 ring-amber-500 transition-all"
                        />
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-6 space-y-12">
                    {/* 2. Category Scroller (Visual Pills) */}
                    <section>
                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                            {['Pizza', 'Burgers', 'Rolls', 'Biryani', 'Thali', 'Chinese'].map((cat) => (
                                <button key={cat} className="flex flex-col items-center gap-2 group min-w-[80px]">
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-amber-500 group-hover:border-amber-500 transition-all"
                                        onClick={() => setShowLogin(true)}

                                    >
                                        <Utensils className="text-white group-hover:text-black" size={24} />
                                    </div>
                                    <span className="text-white/60 text-xs font-medium group-hover:text-white">{cat}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* 3. Global Dishes Row (New Section) */}
                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <Zap className="text-amber-500 fill-amber-500" size={20} />
                            <h2 className="text-white text-2xl font-bold">Trending Dishes</h2>
                        </div>
                        <div className="flex flex-nowrap gap-5 overflow-x-auto no-scrollbar snap-x pb-4">
                            {popularDishes.map((food: any) => (
                                <div key={food.id} className="min-w-[200px] bg-white/5 rounded-3xl p-3 border border-white/10 snap-start hover:bg-white/10 transition-all group">

                                    {/* 1. FIXED ASPECT RATIO CONTAINER */}
                                    <div className="relative aspect-square rounded-2xl bg-zinc-800 mb-3 overflow-hidden">
                                        {food.image ? (
                                            <img
                                                src={food.image}
                                                alt={food.name}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            /* 2. PLACEHOLDER FALLBACK */
                                            <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-white/20 text-xs italic">
                                                No Image
                                            </div>
                                        )}
                                    </div>

                                    {/* 3. TEXT CONTENT */}
                                    <p className="text-white font-bold leading-tight truncate capitalize">{food.name}</p>
                                    <p className="text-white/40 text-[10px] mb-2 uppercase truncate">
                                        {food.restaurantName}
                                    </p>

                                    {/* 4. PRICE & BUTTON */}
                                    <div className="flex justify-between items-center">
                                        <span className="text-amber-500 font-bold">₹{food.price}</span>
                                        <button className="bg-white text-black text-[10px] px-3 py-1 rounded-full font-bold hover:bg-amber-500 transition-colors"
                                            onClick={() => setShowLogin(true)}

                                        >
                                            ADD
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 4. Top Restaurants Row */}
                    <section>
                        <h2 className="text-white text-2xl font-bold mb-6">Top Restaurants</h2>
                        <div className="flex flex-nowrap gap-5 overflow-x-auto no-scrollbar pb-4 snap-x">
                            {restaurants.map((res: any) => (
                                <div className="group min-w-[320px] snap-start" key={res.id}>
                                    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/10">
                                        <img
                                            src={getLocalImage(res.id)}
                                            alt={res.name}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                        <div className="absolute bottom-4 left-4">
                                            <p className="text-white text-xl font-black capitalize">{res.name}</p>
                                            <p className="text-white/60 text-xs flex items-center gap-1">
                                                <Utensils size={12} className="text-amber-500" /> {res._count.foods} items
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                {/* {login pop up} */}

            </div>
            {/* 🔐 LOGIN POPUP */}
            {showLogin && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-zinc-900 p-6 rounded-xl w-[90%] max-w-sm">
                        <h2 className="text-xl font-bold mb-2 text-white">
                            Login required
                        </h2>
                        <p className="text-white/60 mb-4">
                            Please login to add items to your cart
                        </p>

                        <div className="flex gap-3">
                            <Link
                                href="/user"
                                className="flex-1 bg-amber-500 text-black py-2 rounded text-center font-bold"
                            >
                                Login
                            </Link>
                            <button
                                onClick={() => setShowLogin(false)}
                                className="flex-1 border border-white/20 py-2 rounded text-white"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
