import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function BrowseRestaurantsPage() {
  const restaurants = await prisma.restaurant.findMany({
    include: { _count: { select: { foods: true } } }
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <header className="mb-10">
        <h1 className="text-white text-3xl font-bold">Hungry?</h1>
        <p className="text-white/50">Discover the best food in Patna</p>
      </header>

      <section>
        <h2 className="text-white text-lg font-semibold mb-4">Top Restaurants</h2>
        <div className="flex flex-nowrap gap-4 overflow-x-auto no-scrollbar pb-4 snap-x">
          {restaurants.map((res) => (
            <Link href={`/restaurant/${res.id}`} key={res.id}>
              <div className="min-w-[280px] aspect-video glass-card !p-0 overflow-hidden snap-start hover:scale-105 transition-all">
                {/* Placeholder for restaurant banner */}
                <div className="w-full h-full bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center">
                  <span className="text-white font-black text-2xl italic uppercase">
                    {res.name}
                  </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <p className="text-white font-bold">{res.name}</p>
                  <p className="text-white/60 text-xs">{res._count.foods} Items available</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}