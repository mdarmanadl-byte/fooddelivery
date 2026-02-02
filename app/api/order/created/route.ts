import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { restaurantId, totalAmount } = body;

    // Await the cookie store (required in newer Next.js versions)
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized: No User ID found" }, { status: 401 });
    }

    if (!restaurantId) {
      return NextResponse.json({ error: "Missing restaurantId" }, { status: 400 });
    }

    const order = await prisma.$transaction(async (tx) => {
      // 1. Get Cart
      const userCart = await tx.cart.findUnique({
        where: { userId },
        include: { items: true },
      });

      if (!userCart || userCart.items.length === 0) {
        throw new Error("Cart is empty");
      }

      // 2. Create Order
      const newOrder = await tx.order.create({
        data: {
          userId,
          restaurantId,
          totalAmount: parseFloat(totalAmount), // Ensure it's a number
          status: "PREPARING",
          items: {
            create: userCart.items.map((item) => ({
              foodId: item.foodId,
              quantity: item.quantity,
            })),
          },
        },
      });

      // 3. Clear Cart
      await tx.cartItem.deleteMany({ 
        where: { cartId: userCart.id } 
      });

      return newOrder;
    });

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("ORDER_API_ERROR:", error.message);
    // Return JSON error instead of letting Next.js throw an HTML error
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}