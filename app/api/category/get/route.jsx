import connectToDatabase from "@/app/lib/connect";
import Category from "@/app/lib/schema/CategorySchema";

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const category = await Category.findById(id);
      if (!category) {
        return new Response(
          JSON.stringify({ message: "Category not found", success: false }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }
      return new Response(JSON.stringify({ category, success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const categories = await Category.find();
    return new Response(JSON.stringify({ categories, success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch categories", success: false }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
