"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CategoryPage = ({ params }) => {
  const { id } = params; // Get category ID from the URL
  const [category, setCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({}); // Store selected answers
  const [showAnswers, setShowAnswers] = useState(false); // To toggle showing answers
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // Count correct answers
  const [questionSet, setQuestionSet] = useState([]); // Store the current set of questions
  const [answerSubmitted, setAnswerSubmitted] = useState(false); // To track if the answer was submitted
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
        const resQuestions = await fetch(`/api/question/get?categoryId=${id}`);
        const dataQuestions = await resQuestions.json();

        if (dataQuestions.success) {
          setQuestions(dataQuestions.questions);
          getRandomQuestions(dataQuestions.questions);
        }
      } catch (error) {
        console.error("Error fetching category or questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndQuestions();
  }, [id, router]);

  // Function to get random questions from the question bank
  const getRandomQuestions = (allQuestions) => {
    const shuffledQuestions = [...allQuestions].sort(() => 0.5 - Math.random()); // Shuffle questions
    const selectedQuestions = shuffledQuestions.slice(0, 5); // Take the first 5 questions

    // Randomize options for each question
    const randomizedQuestions = selectedQuestions.map((question) => {
      const shuffledOptions = [...question.options].sort(
        () => 0.5 - Math.random()
      );
      return { ...question, options: shuffledOptions };
    });

    setQuestionSet(randomizedQuestions);
    setAnswerSubmitted(false); // Reset answer submitted state for the new set
  };

  const handleAnswerChange = (questionId, option) => {
    setAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers, [questionId]: option };
      return newAnswers;
    });
  };

  const checkAnswers = () => {
    let correctCount = 0;
    questionSet.forEach((question) => {
      if (answers[question._id] === question.answer) {
        correctCount++;
      }
    });
    setCorrectAnswersCount(correctCount);
    setShowAnswers(true); // Show answers after all questions answered
    setAnswerSubmitted(true); // Track that the answer was submitted
  };

  const handleNextSet = () => {
    setAnswers({}); // Reset answers for the next set
    setShowAnswers(false); // Hide answers for the next set
    getRandomQuestions(questions); // Get a new random set of questions
  };

  // Check if all questions are answered in the current set
  const isAllAnswered = questionSet.every((question) => answers[question._id]);

  if (loading) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">
        {category
          ? `Welcome to ${category.name} Exam Preparation`
          : "Loading..."}
      </h1>
      <img
        src={category?.image}
        alt={category?.name}
        className="w-64 h-64 rounded-lg mb-5"
      />

      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-center mb-5">Questions</h2>
        {questionSet.length === 0 ? (
          <p className="text-center text-gray-400">
            No questions available for this category.
          </p>
        ) : (
          <div className="space-y-6">
            {questionSet.map((question, index) => (
              <div
                key={question._id}
                className="bg-gray-800 p-5 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold">
                  Question {index + 1}: {question.question}
                </h3>
                <div className="mt-4 space-y-3">
                  {question.options.map((option, idx) => (
                    <div key={idx} className="flex items-center">
                      <input
                        type="radio"
                        id={`option-${idx}`}
                        name={`question-${question._id}`}
                        value={option}
                        checked={answers[question._id] === option}
                        onChange={() =>
                          handleAnswerChange(question._id, option)
                        }
                        className="mr-2"
                      />
                      <label htmlFor={`option-${idx}`}>{option}</label>
                    </div>
                  ))}
                </div>
                {showAnswers && (
                  <p className="mt-4 text-gray-400">
                    Answer:{" "}
                    {question.answer === answers[question._id]
                      ? "Correct"
                      : "Incorrect"}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Display View Answer and Next Set buttons */}
        <div className="mt-8 flex gap-4 justify-center items-center  ">
          {!showAnswers && isAllAnswered && !answerSubmitted && (
            <button
              onClick={checkAnswers}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-all duration-200 "
            >
              View Answer
            </button>
          )}

          {showAnswers && (
            <p className="mt-4 text-lg text-green-500">
              You got {correctAnswersCount} out of {questionSet.length} answers
              correct!
            </p>
          )}

          <button
            onClick={handleNextSet}
            className=" px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg text-white transition-all duration-200"
          >
            Next Set
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
