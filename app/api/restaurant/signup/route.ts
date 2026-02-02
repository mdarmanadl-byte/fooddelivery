import { prisma } from "@/lib/db"; // Point to your Prisma singleton
import { cookies } from "next/headers"; //
import { NextResponse } from "next/server";
// Essential for security
export async function GET(req: Request) {
  try {
    const restaurants = await prisma.restaurant.findMany();
    return NextResponse.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return NextResponse.json(
      { message: "Internal server error" }, 
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    // 1. Parse the JSON body from your fetch call
    const body = await req.json();
    const { restaurant, email, password, address } = body;

    // 2. Server-side validation (Never trust client data!)
    if (!restaurant || !email || !password || !address) {
      return NextResponse.json(
        { message: "All fields are required" }, 
        { status: 400 }
      );
    }

    // 3. Check if the restaurant already exists in Neon
    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { email },
    });

    if (existingRestaurant) {
      return NextResponse.json(
        { message: "A restaurant with this email already exists" }, 
        { status: 409 }
      );
    }

    // 4. Hash the password before saving
   

    // 5. Create the new record in your Postgres database
    const newRestaurant = await prisma.restaurant.create({
      data: {
        name: restaurant,
        email,
        password,
        address,
      },
    });
    const cookieStore = await cookies();
            cookieStore.set("restaurant_id", newRestaurant.id, {
                httpOnly: true,    // Prevents JavaScript from stealing the cookie
                secure: process.env.NODE_ENV === "production", // Only over HTTPS in production
                path: "/",         // Available across the whole site
                maxAge: 60 * 60 * 24 * 7, // Expires in 7 days
            });
    // 6. Return success (but don't return the password!)
    return NextResponse.json(
      { message: "Restaurant created successfully", id: newRestaurant.id }, 
      { status: 201 }
    );

  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { message: "Internal server error" }, 
      { status: 500 }
    );
  }
}