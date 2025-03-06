// api/question/create/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import Question from "@/app/lib/schema/QuestionSchema";
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

    const { question, answer, options, category } = await request.json();

    const newQuestion = new Question({
      question,
      answer,
      options,
      category,
    });

    await newQuestion.save();

    return new Response(
      JSON.stringify({
        message: "Question added successfully!",
        success: true,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error adding question:", error);
    return new Response(
      JSON.stringify({ message: "Failed to add question", success: false }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
