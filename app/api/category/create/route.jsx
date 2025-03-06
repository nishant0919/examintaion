import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import Category from "@/app/lib/schema/CategorySchema";
import connectToDatabase from "@/app/lib/connect";

export async function POST(request) {
  try {
    await connectToDatabase();

    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(
        JSON.stringify({ message: "Unauthorized", success: false }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const { name, image } = await request.json();

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return new Response(
        JSON.stringify({ message: "Category already exists", success: false }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    const newCategory = new Category({ name, image });
    await newCategory.save();

    return new Response(
      JSON.stringify({
        message: "Category created successfully",
        success: true,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return new Response(
      JSON.stringify({ message: "Category creation failed", success: false }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
