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
      setIsOpen(false);
      setName("");
      setImage(null);
      setImageUrl("");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="p-6">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-700 transition-all"
        onClick={() => setIsOpen(true)}
      >
        + Add New Category
      </button>

      {categories.length === 0 ? (
        <div className="mt-6 text-center text-gray-600">
          <p className="text-lg">Category is empty</p>
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={() => setIsOpen(true)}
          >
            Add Category
          </button>
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
                borderColor: "#00d4ff",
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
                  className="text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                  whileHover={{ y: -5 }}
                >
                  {category.name}
                </motion.h2>
              </div>

              <motion.div
                className="absolute inset-0 border-4 border-transparent group-hover:border-blue-500 transition-all duration-200 ease-out"
                style={{
                  borderTop: "2px solid #00d4ff",
                  borderBottom: "2px solid #00d4ff",
                  borderLeft: "2px solid #00d4ff",
                  borderRight: "2px solid #00d4ff",
                }}
              ></motion.div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;
