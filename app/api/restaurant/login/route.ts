import { prisma } from "@/lib/db";
import { cookies } from "next/headers"; //
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
        }

        const restaurant = await prisma.restaurant.findUnique({
            where: { email }
        });

        if (!restaurant) {
            return NextResponse.json({ message: "Restaurant not found" }, { status: 404 })
        }

        // IMPORTANT: In production, use bcrypt.compare(password, restaurant.password)
        if (restaurant.password !== password) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 })
        }

        // --- SETTING THE COOKIE ---
        const cookieStore = await cookies();
        cookieStore.set("restaurant_id", restaurant.id, {
            httpOnly: true,    // Prevents JavaScript from stealing the cookie
            secure: process.env.NODE_ENV === "production", // Only over HTTPS in production
            path: "/",         // Available across the whole site
            maxAge: 60 * 60 * 24 * 7, // Expires in 7 days
        });

        return NextResponse.json({ success: true, message: "Logged in successfully" }, { status: 200 })

    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}