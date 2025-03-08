"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CategoryPage = ({ params }) => {
  const { id } = params;
  const [category, setCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [questionSet, setQuestionSet] = useState([]);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchCategoryAndQuestions = async () => {
      try {
        const resCategory = await fetch(`/api/category/get?id=${id}`);
        const dataCategory = await resCategory.json();

        if (dataCategory.success) {
          setCategory(dataCategory.category);
        } else {
          router.push("/404");
          return;
        }

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

  const getRandomQuestions = (allQuestions) => {
    const shuffledQuestions = [...allQuestions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledQuestions.slice(0, 5);
    const randomizedQuestions = selectedQuestions.map((question) => {
      const shuffledOptions = [...question.options].sort(
        () => 0.5 - Math.random()
      );
      return { ...question, options: shuffledOptions };
    });

    setQuestionSet(randomizedQuestions);
    setAnswerSubmitted(false);
  };

  const handleAnswerChange = (questionId, option) => {
    setAnswers((prevAnswers) => {
      if (prevAnswers[questionId] === option) return prevAnswers;
      return { ...prevAnswers, [questionId]: option };
    });
  };

  const handleOptionClick = (questionId, option) => {
    handleAnswerChange(questionId, option);
  };

  const checkAnswers = () => {
    let correctCount = 0;
    questionSet.forEach((question) => {
      if (answers[question._id] === question.answer) {
        correctCount++;
      }
    });
    setCorrectAnswersCount(correctCount);
    setShowAnswers(true);
    setAnswerSubmitted(true);
  };

  const handleNextSet = () => {
    setAnswers({});
    setShowAnswers(false);
    setCurrentQuestionIndex(0);
    getRandomQuestions(questions);
  };

  const isAllAnswered = questionSet.every((question) => answers[question._id]);

  if (loading) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-100 dark:text-white text-gray-900 flex flex-col items-center justify-center px-6 py-12 transition-all duration-300 ease-in-out">
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
                className="bg-gray-200 dark:bg-gray-700 p-5 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                <h3 className="text-xl font-semibold mb-3">
                  Question {index + 1}: {question.question}
                </h3>
                <div className="mt-4 space-y-3">
                  {question.options.map((option, idx) => (
                    <div
                      key={idx}
                      className="flex items-center group hover:bg-blue-500 p-2 rounded-lg cursor-pointer transition-all duration-200"
                      onClick={() => handleOptionClick(question._id, option)}
                    >
                      <input
                        type="radio"
                        id={`option-${idx}`}
                        name={`question-${question._id}`}
                        value={option}
                        checked={answers[question._id] === option}
                        onChange={() =>
                          handleAnswerChange(question._id, option)
                        }
                        className="mr-2 h-5 w-5 rounded-full border-gray-300 checked:bg-blue-600"
                      />
                      <label
                        htmlFor={`option-${idx}`}
                        className="group-hover:text-white transition-all duration-200"
                      >
                        {option}
                      </label>
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

        <div className="mt-8 flex gap-4 justify-center items-center">
          {!showAnswers && isAllAnswered && !answerSubmitted && (
            <button
              onClick={checkAnswers}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-all duration-200"
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
            className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg text-white transition-all duration-200"
          >
            Next Set
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
