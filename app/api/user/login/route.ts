import { prisma } from "@/lib/db"
import { error } from "console"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req:Request){
    try{
        const response= await req.json()
        const {email , password}=response
        if (!email || !password){
          return  NextResponse.json({message:"email or password not found"}, {status:400})
        }
        const user= await prisma.user.findUnique({
            where:{email}
        })
        if(!user){
            return NextResponse.json({massage:"user not found"},{status:404})
        }
        if (password===!user.password){
            return NextResponse.json({massage:"Invalid password" }, {status:401})
        }
        const cookieStore=await cookies()
        cookieStore.set( "userid" ,user.id, {
                httpOnly: true,
                secure: process.env.NODE_ENV==="production",
                path: "/",
                maxAge: 60 * 60 * 24 * 7
        })
        return NextResponse.json({massage:"login successfully" ,success:true }, {status:200} )

    }
    catch{
        console.error("Error during login ", error)
        return NextResponse.json({massage:"error during login"},{status:500})
    }
}