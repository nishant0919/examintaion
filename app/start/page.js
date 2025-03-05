import React from "react";
import StartMain from "./StartMain";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return;
  }
  return (
    <div>
      <StartMain />
    </div>
  );
}

export default page;
