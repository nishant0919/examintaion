"use client";
import { useState } from "react";
import {
  FaSearch,
  FaRegLightbulb,
  FaClipboardList,
  FaRegPlayCircle,
} from "react-icons/fa";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center">
      <div className="flex flex-col items-center md:flex-row  justify-between px-6 py-12 md:px-20">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            Welcome to <span className="text-blue-500">PrepNepal</span>
          </h1>
          <p className="text-lg md:text-2xl font-medium text-gray-400">
            Prepare with confidence. Prepare for every exam with our high-level
            MCQs.
          </p>
          <div className="flex items-center mt-4">
            <div
              className={`relative flex items-center p-1 rounded-lg border-2 transition-all duration-300 ${
                isFocused ? "border-blue-500" : "border-gray-500"
              } shadow-lg`}
            >
              <input
                type="text"
                value={searchText}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search for a subject..."
                className="p-4 rounded-l-lg w-[400px] text-white focus:outline-none bg-transparent"
              />
              <button className="p-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
                <FaSearch className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:justify-end w-full md:w-1/2">
          <img
            src="https://i.ibb.co/84mPnj84/College-Student-PNG-Image-HD-1.png"
            alt="Student with books"
            className="rounded-lg z-10 relative w-[420px] h-[470px] mx-auto"
          />
        </div>
      </div>

      <div className="bg-gray-900 py-16">
        <div className="px-6 md:px-20">
          <h2 className="text-4xl font-semibold text-white">What We Offer</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8 pt-10 px-6 md:px-20">
          <div className="w-72 bg-gray-700 p-6 rounded-xl text-center shadow-lg hover:shadow-2xl transition duration-300">
            <FaRegPlayCircle className="mx-auto text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-white">Live Tests</h3>
            <p className="text-gray-400 mt-2">
              Take live tests and gauge your performance in real-time. Challenge
              yourself and improve!
            </p>
          </div>

          <div className="w-72 bg-gray-700 p-6 rounded-xl text-center shadow-lg hover:shadow-2xl transition duration-300">
            <FaClipboardList className="mx-auto text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-white">
              High Yield Questions
            </h3>
            <p className="text-gray-400 mt-2">
              Access high-yield MCQs that help you focus on what matters most
              for your exams.
            </p>
          </div>

          <div className="w-72 bg-gray-700 p-6 rounded-xl text-center shadow-lg hover:shadow-2xl transition duration-300">
            <FaRegLightbulb className="mx-auto text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-white">
              Insightful Analysis
            </h3>
            <p className="text-gray-400 mt-2">
              Get detailed insights and performance analysis to help you track
              your progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
