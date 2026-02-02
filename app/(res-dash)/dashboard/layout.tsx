import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RestaurantDashboardLayout from "./RestaurantDashboardLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore =await cookies();
  const resId = cookieStore.get("restaurant_id")?.value;

  if (!resId) redirect("/restaurant");

  const restaurant = await prisma.restaurant.findUnique({
    where: { id: resId },
    select: { name: true },
  });

  if (!restaurant) redirect("/restaurant");

  return (
    <RestaurantDashboardLayout restaurantName={restaurant.name}>
      {children}
    </RestaurantDashboardLayout>
  );
}
