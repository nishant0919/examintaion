import connectToDatabase from "@/app/lib/connect";
import Question from "@/app/lib/schema/QuestionSchema";
import Category from "@/app/lib/schema/CategorySchema"; // Import Category schema to join category info

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // Question ID
    const categoryId = searchParams.get("categoryId"); // Category ID filter

    if (id) {
      // Fetch single question by ID
      const question = await Question.findById(id).populate("category"); // Populating category info
      if (!question) {
        return new Response(
          JSON.stringify({ message: "Question not found", success: false }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }
      return new Response(JSON.stringify({ question, success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (categoryId) {
      // Fetch questions by category
      const questions = await Question.find({ category: categoryId }).populate(
        "category"
      );
      return new Response(JSON.stringify({ questions, success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch all questions
    const questions = await Question.find().populate("category");
    return new Response(JSON.stringify({ questions, success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch questions", success: false }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
