import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/app/lib/schema/userSchema";
import connectToDatabase from "@/app/lib/connect";

export async function POST(request) {
  try {
    await connectToDatabase();

    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    const email = session.user.email;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json(
        { message: "User already exists", success: true },
        { status: 200 }
      );
    }

    let username = email.split("@")[0];

    let isUnique = false;
    while (!isUnique) {
      const checkUsername = await User.findOne({ username });
      if (!checkUsername) {
        isUnique = true;
      } else {
        username = `${email.split("@")[0]}${Math.floor(Math.random() * 1000)}`;
      }
    }

    const newUser = new User({
      username,
      email,
      name: session.user.name,
      image: session.user.image,
    });

    await newUser.save();

    return Response.json(
      { message: "User created successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json(
      { message: "User creation failed", success: false },
      { status: 500 }
    );
  }
}
