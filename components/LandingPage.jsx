"use client";
import { motion } from "framer-motion";

const cardData = [
  {
    title: "Loksewa",
    image: "https://www.collegenp.com/uploads/2019/10/Lok-Sewa-Aayog-Logo.png",
  },
  {
    title: "CMAT",
    image:
      "https://th.bing.com/th/id/OIP.OJsZenErRiIpzjiVdRETVQHaHa?rs=1&pid=ImgDetMain",
  },
  {
    title: "BCA Entrance",
    image:
      "https://blogger.googleusercontent.com/img/a/AVvXsEiOaWAokQr-dsaa7mDvtKxqjGxhJpAeXRzcHd4Vksg8tog1eM0rNcDmYAHtbQSGsdexPM1YYrXvkRpWW6C0pwPpMuqt8J7V7RUdkW3IszcD4OlXv4HSn7C6E6g_m5UfEhE20rV0Tsc52Z3eP45TTDdCquy-bvJ4XjGKE1bc1iIFOZvVJylOFCMNAM90AFM",
  },
  {
    title: "Driving License",
    image:
      "https://th.bing.com/th/id/OIP.HQluXkHIpuP4VgM6YyxdowHaHa?rs=1&pid=ImgDetMain",
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 py-12">
      <motion.h1
        className="text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        Welcome to Examination Portal
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
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
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover group-hover:blur-sm transition-all duration-500"
              />
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-all duration-300 group-hover:bg-opacity-75">
              <motion.h2
                className="text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                whileHover={{ y: -5 }}
              >
                {card.title}
              </motion.h2>
            </div>

            <motion.div
              className="absolute inset-0 border-4 border-transparent group-hover:border-blue-500 transition-all duration-200 ease-out"
              style={{
                borderTop: "2px solid #00d4ff",
                borderBottom: "2px solid #fffff",
                borderLeft: "2px solid #00d4ff",
                borderRight: "2px solid #00d4ff",
              }}
            ></motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
