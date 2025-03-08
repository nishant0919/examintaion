"use client";
import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Helper function to count words in the message
  const countWords = (message) => {
    return message.trim().split(/\s+/).length;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check word count and limit the message to 50 words
    if (name === "message") {
      const wordCount = countWords(value);
      if (wordCount <= 50) {
        setFormData({ ...formData, [name]: value });
        setErrorMessage(""); // Clear error if under limit
      } else {
        setErrorMessage("Message exceeds word limit (50 words max).");
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.username,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage("Your message has been sent successfully!");
        setFormData({
          username: "",
          email: "",
          message: "",
        });
      } else {
        setSuccessMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex justify-center items-center py-12">
      <div className="flex w-full max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg space-x-8">
        {/* Left Side Form */}
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
            Contact Us
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="username" className="block text-lg font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="mt-2 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-lg font-medium">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-lg font-medium">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="mt-2 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message here"
              ></textarea>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="mt-4 text-lg text-red-500">{errorMessage}</p>
            )}

            {/* Success/Error Message */}
            {successMessage && (
              <p
                className={`mt-4 text-lg ${
                  successMessage.includes("successfully")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {successMessage}
              </p>
            )}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting || errorMessage}
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side Image and Message */}
        <div className="w-full max-w-md space-y-6 flex flex-col items-center justify-center text-center">
          <img
            src="https://www.striven.com/wp-content/uploads/CustomerServiceBlogArticlePhoto-e1652971996937.png"
            alt="Contact Us"
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <p className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
            Contact us anytime if you have any issues or problems filling up the
            form.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
