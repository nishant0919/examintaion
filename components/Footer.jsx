"use client";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-black dark:bg-gray-800 dark:text-white py-8">
      <div className="container mx-auto px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <h2 className="text-3xl font-bold text-black dark:text-blue-500">
              PrepNepal
            </h2>
            <p className="text-black dark:text-gray-400 max-w-xs">
              High-quality MCQs, live tests, and insightful analysis for your
              exam success.
            </p>
          </div>

          <div className="mt-6 md:mt-0 space-y-2">
            <h3 className="text-lg font-semibold text-black dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-6 md:mt-0 flex justify-center md:justify-start gap-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-2xl text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition duration-300" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-2xl text-gray-600 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition duration-300" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-2xl text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition duration-300" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-2xl text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-600 transition duration-300" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} PrepNepal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
