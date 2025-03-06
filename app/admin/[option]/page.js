import React from "react";
import OptionFile from "./OptionFile";

async function Page({ params }) {
  const { option } = params;
  const optionFile = ["category", "questions"];

  if (!optionFile.includes(option)) {
    return <div className="w-full">404 Not Found</div>;
  }
  return <OptionFile option={option} />;
}

export default Page;
