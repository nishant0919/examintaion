import Sidebar from "@/components/Admin/Sidebar";
import React from "react";

function layout({ children }) {
  return (
    <div className="flex gap-2 w-full">
      <Sidebar />
      <div className="p-2 w-full">{children}</div>
    </div>
  );
}

export default layout;
