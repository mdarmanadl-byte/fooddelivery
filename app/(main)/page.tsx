// app/(user-dash)/userboard/page.tsx

// app/(user-dash)/userboard/page.tsx
import { prisma } from "@/lib/db";
import HomeClient from "./HomeClient";

export default async function Page() {
  const restaurants = await prisma.restaurant.findMany({
    include: { foods: true, _count: { select: { foods: true } } },
    take: 10,
  });

  const popularDishes = restaurants
    .flatMap((res) =>
      res.foods.map((food) => ({
        ...food,
        restaurantName: res.name,
      }))
    )
    .slice(0, 10);

  return (
    <HomeClient
      restaurants={restaurants}
      popularDishes={popularDishes}
    />
  );
}
