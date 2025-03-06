"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CategoryPage = ({ params }) => {
  const { id } = params; // Get category ID from the URL
  const [category, setCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch category details and questions related to the category
    const fetchCategoryAndQuestions = async () => {
      try {
        const resCategory = await fetch(`/api/category/get?id=${id}`);
        const dataCategory = await resCategory.json();

        if (dataCategory.success) {
          setCategory(dataCategory.category);
        } else {
          router.push("/404"); // Redirect to 404 if category not found
          return;
        }

        // Fetch questions for this category
        const resQuestions = await fetch(`/api/question/get?categoryId=${id}`); // Updated the URL
        const dataQuestions = await resQuestions.json();

        if (dataQuestions.success) {
          setQuestions(dataQuestions.questions);
        }
      } catch (error) {
        console.error("Error fetching category or questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndQuestions();
  }, [id, router]);

  if (loading) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-bold mb-10">{category?.name}</h1>
      <img
        src={category?.image}
        alt={category?.name}
        className="w-64 h-64 rounded-lg"
      />
      <p className="mt-5">
        {category?.description || "No description available."}
      </p>

      <div className="mt-10 w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-center mb-5">Questions</h2>
        {questions.length === 0 ? (
          <p className="text-center text-gray-400">
            No questions available for this category.
          </p>
        ) : (
          <div className="space-y-6">
            {questions.map((question) => (
              <div
                key={question._id}
                className="bg-gray-800 p-5 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold">{question.question}</h3>
                <div className="mt-4 space-y-3">
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name={`question-${question._id}`}
                        className="mr-2"
                      />
                      <label htmlFor={`option-${index}`}>{option}</label>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-gray-400">Answer: {question.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
