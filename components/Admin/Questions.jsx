"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "animate.css";

function Questions() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/category/get");
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      }
    };

    fetchCategories();
  }, []);

  // Dynamically set the theme based on the user's preference
  useEffect(() => {
    const handleThemeChange = (e) => {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleThemeChange);

    // Initial theme set
    if (mediaQuery.matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  // Handle input for each option dynamically
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  // Check if all fields are filled
  const validateForm = () => {
    if (!question || !answer || !categoryId || options.some((opt) => !opt)) {
      alert("Please fill all fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const newQuestion = {
      question,
      answer,
      options,
      category: categoryId,
    };

    try {
      const res = await fetch("/api/question/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });
      const data = await res.json();

      if (data.success) {
        alert("Question added successfully!");
        // Reset form after submission
        setQuestion("");
        setAnswer("");
        setOptions(["", "", "", ""]);
        setCategoryId("");
      } else {
        alert("Failed to add question");
      }
    } catch (error) {
      console.error("Error adding question:", error);
      alert("An error occurred while adding the question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-xl space-y-8 animate__animated animate__fadeIn dark:bg-gray-800 dark:text-white">
      <h2 className="text-3xl font-bold text-gray-800 text-center dark:text-gray-100">
        Add a New Question
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6 rounded-lg shadow-md bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100"
      >
        {/* Question Field */}
        <div className="space-y-2">
          <label
            htmlFor="question"
            className="text-lg font-semibold text-gray-800 dark:text-gray-200"
          >
            Question:
          </label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
            placeholder="Enter the question"
          />
        </div>

        {/* Answer Field */}
        <div className="space-y-2">
          <label
            htmlFor="answer"
            className="text-lg font-semibold text-gray-800 dark:text-gray-200"
          >
            Correct Answer:
          </label>
          <input
            type="text"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
            placeholder="Enter the correct answer"
          />
        </div>

        {/* Options */}
        <div className="space-y-2">
          <label className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Options:
          </label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>

        {/* Category Selector */}
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="text-lg font-semibold text-gray-800 dark:text-gray-200"
          >
            Select Category:
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition duration-300 ${
              loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Submitting..." : "Add Question"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Questions;
