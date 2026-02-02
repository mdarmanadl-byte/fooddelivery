import FoodCard from "@/app/_usercomponent/foodcard";
import { prisma } from "@/lib/db";
import { capitalize } from "@/lib/utils";
import { cookies } from "next/headers";
// app/(user-dash)/userboard/page.tsx
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;

  // 1. Fetch Restaurants (by name or city)
  const restaurants = await prisma.restaurant.findMany({
    where: query ? {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { city: { contains: query, mode: 'insensitive' } },
      ],
    } : {},
  });

  // 2. Fetch Foods DIRECTLY (This is the fix!)
  // This ensures new foods are found even if the restaurant name doesn't match
  const allFoods = await prisma.food.findMany({
    where: query ? {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        
      ],
    } : {},
    take: 15,
  });

  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { city: true }
  });
  
  const userCity = user?.city || "Patna";

  return (
    <div className="space-y-12 ml-4 mr-4 py-8">
      {/* ... (Keep your query header code) ... */}

      {/* Section 1: Restaurants */}
      <section>
        <h2 className="text-white text-2xl font-bold mb-6">
           {query ? "Matching Restaurants" : `Top Restaurants in ${capitalize(userCity)}`}
        </h2>
        <div className="flex flex-nowrap gap-5 overflow-x-auto no-scrollbar snap-x pb-4">
          {restaurants.length > 0 ? (
            restaurants.map((res) => (
              <FoodCard key={res.id} type="restaurant" data={res} />
            ))
          ) : (
            <div className="p-8 border border-dashed border-white/10 rounded-2xl w-full text-center">
               <p className="text-white/20">No restaurants match "{query}"</p>
            </div>
          )}
        </div>
      </section>

      {/* Section 2: Popular Dishes */}
      <section>
        <h2 className="text-white text-2xl font-bold mb-6">
          {query ? "Matching Dishes" : "Popular Dishes"}
        </h2>
        <div className="flex flex-nowrap gap-5 overflow-x-auto no-scrollbar snap-x pb-4">
          {allFoods.length > 0 ? (
            allFoods.map((food) => (
              <FoodCard key={food.id} type="food" data={food} />
            ))
          ) : (
            <div className="p-8 border border-dashed border-white/10 rounded-2xl w-full text-center">
               <p className="text-white/20">No dishes match "{query}"</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}