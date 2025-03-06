"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaThLarge, FaUsers } from "react-icons/fa"; // Category icon and Users icon
import { CgLogOut } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

function Sidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-screen sticky top-0 left-0 p-5 w-64 bg-gray-900 text-white border-r border-gray-700 shadow-lg">
        <div className="mb-6 flex justify-center">
          <Link href="/">
            <h1 className="text-red-500 font-bold text-[30px]">PrepNep</h1>
          </Link>
        </div>

        <ul className="space-y-4">
          {/* Category Menu */}
          <li
            className={`${
              pathname === "/admin/category" ? "bg-gray-800" : ""
            } hover:bg-gray-800 rounded-lg`}
          >
            <Link
              href="/admin/category"
              className="flex items-center p-3 space-x-3 text-gray-300 hover:text-white"
            >
              <FaThLarge className="w-6 h-6" />
              <span className="text-lg">Category</span>
            </Link>
          </li>

          {/* Questions Menu */}
          <li
            className={`${
              pathname === "/admin/questions" ? "bg-gray-800" : ""
            } hover:bg-gray-800 rounded-lg`}
          >
            <Link
              href="/admin/questions"
              className="flex items-center p-3 space-x-3 text-gray-300 hover:text-white"
            >
              <FaUsers className="w-6 h-6" />
              <span className="text-lg">Questions</span>
            </Link>
          </li>

          {/* Logout Button */}
          <li className="hover:bg-red-700 rounded-lg">
            <button
              onClick={handleLogout}
              className="flex items-center p-3 space-x-3 w-full text-left text-gray-300 hover:text-white"
            >
              <CgLogOut className="w-6 h-6" />
              <span className="text-lg">Log Out</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-3 flex justify-around text-white">
        {/* Category Link */}
        <Link
          href="/admin/category"
          className={`${
            pathname === "/admin/category" ? "text-blue-400" : "text-gray-400"
          } hover:text-blue-400`}
        >
          <FaThLarge className="w-6 h-6" />
        </Link>

        {/* Questions Link */}
        <Link
          href="/admin/questions"
          className={`${
            pathname === "/admin/questions" ? "text-blue-400" : "text-gray-400"
          } hover:text-blue-400`}
        >
          <FaUsers className="w-6 h-6" />
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="text-gray-400 hover:text-red-500"
        >
          <CgLogOut className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}

export default Sidebar;
