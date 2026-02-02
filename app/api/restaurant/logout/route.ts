import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  // Delete the cookie by setting its expiry to the past
  cookieStore.set("restaurant_id", "", { expires: new Date(0) });
  
  return NextResponse.json({ message: "Logged out" });
}