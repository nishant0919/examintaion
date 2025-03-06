"use client";
import Category from "@/components/Admin/Category";
import Questions from "@/components/Admin/Questions";
import React, { useEffect } from "react";

function OptionFile({ option }) {
  const [loading, setLoading] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);

  async function fetchRole() {
    try {
      const res = await fetch("/api/user/role");
      const data = await res.json();
      console.log("Fetched Role:", data);
      if (data.role === "admin") {
        setIsAdmin(true);
        setLoading(false);
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      setIsAdmin(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRole();
  }, []); // Will trigger when option changes

  if (loading) {
    return <div className="w-full text-center">Loading...</div>;
  }

  if (!isAdmin) {
    return <div className="w-full text-center">Unauthorized</div>;
  }

  return (
    <div className="w-full">
      {option === "category" && <Category />}
      {option === "questions" && <Questions />}
    </div>
  );
}

export default OptionFile;
