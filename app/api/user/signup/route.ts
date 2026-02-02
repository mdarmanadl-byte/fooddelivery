// signup/route.ts
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. Parse the JSON body from your fetch call
    const body = await req.json();
    const { name, email, password, } = body;

    // 2. Server-side validation (Never trust client data!)
    if (!name || !email || !password ) {
      return NextResponse.json(
        { message: "All fields are required" }, 
        { status: 400 }
      );
    }

    // 3. Check if the name already exists in Neon
    const existinguser = await prisma.user.findUnique({
      where: { email },
    });

    if (existinguser) {
      return NextResponse.json(
        { message: "A user with this email already exists" }, 
        { status: 409 }
      );
    }

    // 4. Hash the password before saving
   

    // 5. Create the new record in your Postgres database
    const newuser = await prisma.user.create({
      data: {
        name: name,
        email,
        password,
    
      },
    });
    const cookieStore = await cookies();
            cookieStore.set("user_id", newuser.id, {
                httpOnly: true,    // Prevents JavaScript from stealing the cookie
                secure: process.env.NODE_ENV === "production", // Only over HTTPS in production
                path: "/",         // Available across the whole site
                maxAge: 60 * 60 * 24 * 7, // Expires in 7 days
            });
    // 6. Return success (but don't return the password!)
    return NextResponse.json(
      { message: "user created successfully", id: newuser.id,success:true }, 
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