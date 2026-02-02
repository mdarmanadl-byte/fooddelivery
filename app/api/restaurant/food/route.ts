import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. Get the restaurant ID from the secure cookie
    const cookieStore = await cookies();
    const restaurantId = cookieStore.get("restaurant_id")?.value;

    if (!restaurantId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse the food data from the request body
    const body = await req.json();
    const { name, price, image, description } = body;

    // 3. Basic Validation
    if (!name || !price || !image) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // 4. Create the food item linked to this restaurant
    const newFood = await prisma.food.create({
      data: {
        name,
        price: parseFloat(price), // Ensure price is a number
        image,
        description,
        restaurantId, // The link to your Restaurant model
      },
    });

    return NextResponse.json({ success: true, food: newFood }, { status: 201 });

  } catch (error) {
    console.error("Error adding food:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// Optional: GET route to fetch all food for this restaurant
export async function GET() {
  const cookieStore = await cookies();
  const restaurantId = cookieStore.get("restaurant_id")?.value;

  if (!restaurantId) return NextResponse.json([], { status: 401 });

  const foods = await prisma.food.findMany({
    where: { restaurantId },
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json(foods);
}