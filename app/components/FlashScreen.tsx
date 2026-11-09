import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SmartImage from "@/app/components/display/SmartImage";

const FlashScreen = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      aria-label="Welcome animation"
      role="status"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.9 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-[100] p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-black backdrop-blur-md px-4 md:px-8 rounded-2xl shadow-lg shadow-primary text-white text-center max-w-4xl w-full"
      >
        <div className="grid grid-cols-2 items-center gap-6 md:gap-10">
          {/* Left Side - Text & Loader */}
          <div className="flex flex-col h-full items-center justify-between md:justify-center gap-6">
            {/* Title */}
            {showText && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-xl md:text-4xl font-bold tracking-wide"
              >
                Welcome to My Portfolio!
              </motion.h2>
            )}

            {/* Description */}
            {showText && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="text-base md:text-lg text-gray-300"
              >
                Explore my work and experience.
              </motion.p>
            )}

            {/* Animated Loader */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex justify-center"
            >
              <div className="w-6 h-6 rounded-full bg-white animate-ping"></div>
            </motion.div>
          </div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}

            className="flex justify-center md:justify-end"
          >
            <div className="relative w-28 h-28 min-[400px]:w-40 min-[400px]:h-40 md:w-64 md:h-64 lg:w-80 lg:h-80">
              <SmartImage
                src="/images/zahidul_c.png"
                alt="Zahidul Islam"
                fill
                sizes="320px"
                className="rounded-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FlashScreen;
