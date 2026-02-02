import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Get the logged-in user's ID from cookies
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) {
      return NextResponse.json({ items: [] }, { status: 401 });
    }

    // 2. Fetch the cart and include the food details
    const cart = await prisma.cart.findUnique({
      where: { userId: userId },
      include: {
        items: {
          include: {
            food: true, // This allows us to see the name, price, and image
          },
        },
      },
    });

    // 3. Return the items (if cart is empty, return an empty array)
    return NextResponse.json(cart || { items: [] });
  } catch (error) {
    console.error("Cart Fetch Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}