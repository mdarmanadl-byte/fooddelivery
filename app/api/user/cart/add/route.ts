
// api/user/cart/add/route.ts
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { foodId,change } = await req.json();
  console.log("DEBUG: Received", { foodId, change });
  const userId = (await cookies()).get("user_id")?.value; // Get current user

  if (!userId) return new Response("Unauthorized", { status: 401 });

  const cart = await prisma.cart.upsert({
    where: { userId },
    create: { userId },
    update: {},
  });

  const cartItem = await prisma.cartItem.upsert({
    where: { cartId_foodId: { cartId: cart.id, foodId } },
    update: { quantity: { increment: change || 1} },
    create: { cartId: cart.id, foodId, quantity: 1 },
  });
  if (cartItem.quantity <= 0) {
    await prisma.cartItem.delete({
      where: { id: cartItem.id }
    });
    return Response.json({ message: "Item removed" });
  }

  return Response.json(cartItem);
}
