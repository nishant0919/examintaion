"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Category() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("/api/category/get");
    const data = await res.json();
    if (data.success) {
      setCategories(data.categories);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=778daab3daa3451c9e62b3369f735580`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.success) {
        setImageUrl(data.data.url);
      }
    }
  };

  const handleSubmit = async () => {
    if (!name || !imageUrl) {
      alert("Field should not be empty.");
      return;
    }

    const res = await fetch("/api/category/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image: imageUrl }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Category added successfully!");
      fetchCategories();
      setIsOpen(false); // Close modal after submitting
      setName("");
      setImage(null);
      setImageUrl("");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="p-6 mb-10">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-700 transition-all"
        onClick={() => setIsOpen(true)}
      >
        + Add New Category
      </button>

      {categories.length === 0 ? (
        <div className="mt-6 text-center text-gray-600 dark:text-gray-300">
          <p className="text-lg">Category is empty</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
          {categories.map((category, index) => (
            <motion.div
              key={category._id}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group border-4 border-transparent transition-all duration-100"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                borderColor: "blue", // Set the border color to white on hover
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 1,
                transition: { duration: 0.2 },
              }}
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
                  className="text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 text-white" // Ensure text is visible in light mode
                  whileHover={{ y: -5 }}
                >
                  {category.name}
                </motion.h2>
              </div>

              <motion.div
                className="absolute inset-0 border-4 border-transparent group-hover:border-white transition-all duration-200 ease-out" // Border color will be white on hover
                style={{
                  borderTop: "2px solid #ffffff", // Ensure border is white
                  borderBottom: "2px solid #ffffff", // Ensure border is white
                  borderLeft: "2px solid #ffffff", // Ensure border is white
                  borderRight: "2px solid #ffffff", // Ensure border is white
                }}
              ></motion.div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal for Adding Category */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-gray-900 text-white p-6 rounded-lg shadow-xl w-96"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicked inside
            >
              <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
              <input
                type="text"
                placeholder="Category Name"
                className="border rounded-md w-full p-2 mb-4 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file:border file:border-blue-500 file:bg-blue-500 file:text-white file:px-4 file:py-2 rounded-md mb-4"
              />
              {image && (
                <div className="mt-4">
                  <img
                    src={image}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    className="mt-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    onClick={() => {
                      setImage(null);
                      setImageUrl("");
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}

              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Category;
