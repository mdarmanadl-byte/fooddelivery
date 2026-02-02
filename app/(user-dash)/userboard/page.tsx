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

  // 1. Fetch filtered restaurants and their food items
  const restaurants = await prisma.restaurant.findMany({
    where: query ? {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { city: { contains: query, mode: 'insensitive' } },
      ],
    } : {}, // Empty object returns all if no search
    include: {
      foods: true,
    },
  });

  // 2. Extract filtered food items for the second row
  // We filter the global food list based on the query as well
  const allFoods = restaurants.flatMap(res => res.foods).filter(food => 
    !query || food.name.toLowerCase().includes(query.toLowerCase())
  );

  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { city: true, name: true }
  });
  
  const userCity = user?.city || "Patna";

  return (
    <div className="space-y-12 ml-4 mr-4 py-8">
      {/* If searching, show a "Results for..." header */}
      {query && (
        <div className="mb-4">
          <p className="text-white/40 text-sm">Showing results for</p>
          <h1 className="text-white text-3xl font-black">"{query}"</h1>
        </div>
      )}

      {/* Section 1: Restaurants */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-bold tracking-tight">
            {query ? "Matching Restaurants" : `Top Restaurants in ${capitalize(userCity)}`}
          </h2>
        </div>
        
        <div className="flex flex-nowrap gap-5 overflow-x-auto no-scrollbar snap-x pb-4 px-4 pt-4">
          {restaurants.length > 0 ? (
            restaurants.map((res) => (
              <FoodCard key={res.id} type="restaurant" data={res} />
            ))
          ) : (
            <p className="text-white/20 italic p-4">No restaurants found...</p>
          )}
        </div>
      </section>

      {/* Section 2: Popular Dishes */}
      <section>
        <h2 className="text-white text-2xl font-bold mb-6 tracking-tight">
          {query ? "Matching Dishes" : "Popular Dishes"}
        </h2>
        <div className="flex flex-nowrap gap-5 overflow-x-auto no-scrollbar snap-x pb-4 pt-4">
          {allFoods.length > 0 ? (
            allFoods.slice(0, 15).map((food) => (
              <FoodCard key={food.id} type="food" data={food} />
            ))
          ) : (
            <p className="text-white/20 italic p-4">No dishes found matching your search.</p>
          )}
        </div>
      </section>
    </div>
  );
}