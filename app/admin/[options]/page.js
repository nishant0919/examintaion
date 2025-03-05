import React from "react";
import OptionFile from "./OptionFile";

async function Page({ params }) {
  const { options } = params;
  const optionFile = ["category", "questions"];

  if (!optionFile.includes(options)) {
    return <div className="w-full">404 Not Found</div>;
  }
  return <OptionFile option={options} />;
}

export default Page;
