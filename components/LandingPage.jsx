"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category/get");
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start px-6 py-12">
      <motion.h1
        className="text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        Welcome to Exam Preparation Portal
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
        {categories.map((category, index) => (
          <motion.div
            key={category._id}
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group border-4 border-transparent transition-all duration-100"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.2 }}
            whileHover={{
              scale: 1.05,
              borderColor: "#00d4ff",
              transition: { duration: 0.2 },
            }}
            whileTap={{
              scale: 1,
              transition: { duration: 0.2 },
            }}
            onClick={() => router.push(`/category/${category._id}`)}
          >
            <div className="relative w-full h-60">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:blur-sm transition-all duration-500"
              />
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-all duration-300 group-hover:bg-opacity-75">
              <motion.h2
                className="text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                whileHover={{ y: -5 }}
              >
                {category.name}
              </motion.h2>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
