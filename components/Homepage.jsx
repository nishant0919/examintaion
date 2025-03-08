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
    <div className="min-h-screen flex flex-col justify-center bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-500">
      {/* Hero Section */}
      <div className="flex flex-col items-center md:flex-row justify-between px-6 py-12 md:px-20">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            Welcome to <span className="text-blue-500">PrepNepal</span>
          </h1>
          <p className="text-lg md:text-2xl font-medium text-gray-700 dark:text-gray-400">
            Prepare with confidence. Prepare for every exam with our high-level
            MCQs.
          </p>
          {/* Search Bar */}
          <div className="flex items-center mt-4">
            <div
              className={`relative flex items-center p-1 rounded-lg border-2 transition-all duration-300 ${
                isFocused
                  ? "border-blue-500 scale-105 shadow-lg"
                  : "border-gray-500"
              }`}
            >
              <input
                type="text"
                value={searchText}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search for a subject..."
                className="p-4 rounded-l-lg w-[400px] text-gray-900 dark:text-white bg-transparent focus:outline-none"
              />
              <button className="p-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition">
                <FaSearch className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center md:justify-end w-full md:w-1/2">
          <img
            src="https://i.ibb.co/84mPnj84/College-Student-PNG-Image-HD-1.png"
            alt="Student with books"
            className="rounded-lg z-10 relative w-[420px] h-[470px] mx-auto transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="py-16 bg-gray-100 dark:bg-gray-800 transition-colors duration-500">
        <div className="px-6 md:px-20">
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-white text-center">
            What We Offer
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8 pt-10 px-6 md:px-20">
          {/* Feature Cards */}
          {[
            {
              icon: (
                <FaRegPlayCircle className="mx-auto text-4xl text-blue-500 mb-4" />
              ),
              title: "Live Tests",
              description:
                "Take live tests and gauge your performance in real-time. Challenge yourself and improve!",
            },
            {
              icon: (
                <FaClipboardList className="mx-auto text-4xl text-blue-500 mb-4" />
              ),
              title: "High Yield Questions",
              description:
                "Access high-yield MCQs that help you focus on what matters most for your exams.",
            },
            {
              icon: (
                <FaRegLightbulb className="mx-auto text-4xl text-blue-500 mb-4" />
              ),
              title: "Insightful Analysis",
              description:
                "Get detailed insights and performance analysis to help you track your progress.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="w-72 bg-white dark:bg-gray-700 p-6 rounded-xl text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {item.icon}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
