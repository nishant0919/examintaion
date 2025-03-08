"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Preparation", href: "/category" },
  { name: "Contact Us", href: "/contact" },
];

const Navbar = () => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { data: session } = useSession();
  const [hideNavbar, setHideNavbar] = useState(false);
  const path = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  let timeoutId;

  const startGlitch = () => {
    setIsGlitching(true);
    timeoutId = setTimeout(() => setIsGlitching(false), 1000);
  };

  const stopGlitch = () => {
    clearTimeout(timeoutId);
    setIsGlitching(false);
  };

  useEffect(() => {
    if (path.includes("/admin")) {
      setHideNavbar(true);
    } else {
      setHideNavbar(false);
    }
  }, [path]);

  // Check if the dark mode preference is stored in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme); // Save the theme preference

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (hideNavbar) {
    return null;
  }

  return (
    <motion.nav
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 shadow-lg transition-all duration-300 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        className="text-3xl font-bold cursor-pointer relative"
        onMouseEnter={startGlitch}
        onMouseLeave={stopGlitch}
      >
        <Link href="/" className="relative z-10">
          <span className="relative text-4xl font-bold pl-5">PrepNep</span>
        </Link>
      </motion.div>
      <div className="flex items-center gap-6 text-xl">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link href={item.href} className="nav-item">
              {item.name}
            </Link>
          </motion.div>
        ))}
        {session?.user ? (
          <div className="relative">
            <img
              src={session.user.image}
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500"
              onClick={() => setIsPopupOpen(!isPopupOpen)}
            />
            {isPopupOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 dark:bg-gray-700 shadow-lg rounded-md text-white z-50">
                <div className="p-4 text-center border-b border-gray-700">
                  <p className="font-semibold">{session.user.name}</p>
                  <p className="text-sm text-gray-400">{session.user.email}</p>
                </div>
                <button
                  className="w-full py-2 text-center hover:bg-red-500 transition-all duration-300"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              href={"/login"}
              className="px-6 py-2 text-white font-semibold rounded-md bg-blue-800 shadow-md transition-all duration-300"
            >
              Login
            </Link>
          </motion.div>
        )}
        {/* Dark Mode Toggle Button */}
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600"
          onClick={toggleTheme}
        >
          {isDarkMode ? (
            <img
              src="https://clipartcraft.com/images/moon-clipart-black-5.png"
              alt="Dark Mode"
              className="w-6 h-6"
            />
          ) : (
            <img
              src="https://static.vecteezy.com/system/resources/previews/018/887/522/original/yellow-sun-icon-png.png"
              alt="Light Mode"
              className="w-6 h-6"
            />
          )}
        </button>
      </div>
      <style jsx>{`
        .nav-item {
          font-size: 1.1rem;
          font-weight: 600;
          transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;
          padding: 8px 14px;
        }
        .nav-item:hover {
          color: #00d4ff;
          transform: translateY(-3px);
        }

        /* Remove glitch effect styles */
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
