import FoodCard from "@/app/_usercomponent/foodcard";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id:  (await params).id },
    include: { foods: true },
  });

  if (!restaurant) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Restaurant Header */}
      <div className="glass-card mb-10 flex flex-col md:flex-row justify-between items-end gap-4 border-b-4 border-amber-500">
        <div>
          <h1 className="text-white text-4xl font-black italic uppercase tracking-tighter">
            {restaurant.name}
          </h1>
          <p className="text-white/50 flex items-center gap-2 mt-2">
            <span className="text-amber-500">📍</span> {restaurant.address}
          </p>
        </div>
        <div className="bg-white/5 p-3 rounded-lg border border-white/10">
          <p className="text-white/40 text-[10px] uppercase font-bold">Menu Size</p>
          <p className="text-white text-xl font-bold">{restaurant.foods.length} Items</p>
        </div>
      </div>

      {/* Food Menu Grid */}
      <h2 className="text-white text-xl font-bold mb-6">Available Dishes</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {restaurant.foods.map((food) => (
          <FoodCard key={food.id} type="food" data={food} />
        ))}
      </div>
    </div>
  );
}