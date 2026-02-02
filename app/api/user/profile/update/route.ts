import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export async function PATCH(req: Request) {
  try {
    const formData = await req.formData();
    const userId = (await cookies()).get("user_id")?.value;

    const name = formData.get("name") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const pincode = formData.get("pincode") as string;
    const image = formData.get("image") as File;

    // Logic for Image:
    // If you are using Cloudinary or Uploadthing, upload 'image' here 
    // and get a URL. For now, we update the text fields.
    
    const updateData: any = {
      name,
      phoneNumber,
      address,
      city,
      pincode,
    };

    // Only update image if a new file was actually uploaded
    if (image && image.size > 0) {
       // updateData.image = "your_uploaded_url_here";
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData
    });

    return Response.json(updatedUser);
  } catch (error) {
    return new Response("Update failed", { status: 500 });
  }
}