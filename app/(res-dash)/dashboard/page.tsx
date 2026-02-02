import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const resId = cookieStore.get("restaurant_id")?.value;

  if (!resId) {
    redirect("/restaurant");
  }

  // ✅ DIRECT DB FETCH (no API, no fetch)
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: resId },
    select: {
      name: true,
      email: true,
      address: true,
      foods: true
    },
  });

  if (!restaurant) {
    redirect("/restaurant");
  }

  return (
    <div className="min-h-screen w-full px-4">
  <h2 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
    <span className="w-1 h-6 bg-amber-500 rounded-full"></span>
    Your Menu Items
  </h2>

  {/* FoodCard Row: flex-nowrap + overflow-x-auto is the key */}
  <div className="flex flex-nowrap gap-4 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory">
    {restaurant.foods.length > 0 ? (
      restaurant.foods.map((food) => (
       <div
  key={food.id}
  className="group relative min-w-[140px] md:min-w-[180px] aspect-[2/3]
             glass-card overflow-hidden snap-start"
>
  {/* IMAGE */}
  <img
    src={food.image}
    alt={food.name}
    className="absolute inset-0 w-full h-full object-cover
               transition-transform duration-300
               group-hover:scale-110"
  />

  {/* OVERLAY */}
  <div className="absolute inset-0 p-3 flex flex-col justify-end
                  bg-gradient-to-t from-black via-black/40 to-transparent">
    <h3 className="text-white font-bold text-sm truncate">
      {food.name}
    </h3>

    <div className="flex justify-between items-center mt-1">
      <span className="text-amber-400 text-xs font-bold">
        ₹{food.price}
      </span>

      <span
        className={`text-[10px] px-2 py-0.5 rounded-full
          ${food.isAvailable
            ? "bg-green-500/20 text-green-400"
            : "bg-red-500/20 text-red-400"}`}
      >
        {food.isAvailable ? "Available" : "Sold Out"}
      </span>
    </div>

    {/* ✅ AVAILABILITY BUTTON */}
    <form
      action={async () => {
        "use server";
        await prisma.food.update({
          where: { id: food.id },
          data: { isAvailable: !food.isAvailable },
        });
      }}
    >
      <button
        type="submit"
        className={`mt-2 w-full text-[11px] py-1 rounded-full border transition
          ${food.isAvailable
            ? "border-red-400 text-red-400 hover:bg-red-400/10"
            : "border-green-400 text-green-400 hover:bg-green-400/10"}`}
            
      >
        {food.isAvailable ? "Mark Unavailable" : "Mark Available"}
        
      </button>
    </form>
  </div>
</div>

      ))
    ) : (
      <p className="text-white/50 italic">No items found.</p>
    )}
  </div>
</div>
  );
}
