import Contact from "@/app/lib/schema/ContactSchema";
import connectToDatabase from "@/app/lib/connect";

// Helper function to limit the message to 50 words
const limitMessageLength = (message) => {
  const words = message.split(" ");
  if (words.length > 50) {
    return words.slice(0, 50).join(" ") + "..."; // Trim to 50 words and add ellipsis
  }
  return message;
};

export async function POST(request) {
  try {
    await connectToDatabase();
    const { name, email, message } = await request.json();

    // Limit the message length to 50 words
    const limitedMessage = limitMessageLength(message);

    const newContact = new Contact({
      name,
      email,
      message: limitedMessage, // Use the trimmed message
    });

    await newContact.save();

    return new Response(
      JSON.stringify({
        message: "Contact added successfully!",
        success: true,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error adding contact:", error);
    return new Response(
      JSON.stringify({ message: "Failed to add contact", success: false }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
