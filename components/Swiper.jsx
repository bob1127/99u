"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const images = [
  "https://www.natural8.com/vite/assets/first_deposit_bonus_banner-large-pGmE-3ud.webp",
  "https://www.natural8.com/vite/assets/instant_deposit_bonus_banner-large-279kK3IU.webp",
  "https://www.natural8.com/vite/assets/honeymoon_for_newcomers_banner-large-DvCYANxs.webp",
  "https://www.natural8.com/vite/assets/first_depositors_freeroll_banner-large-zEpXA4G7.webp",
];

const swipeVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.96,
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 25,
    },
  }),
};

export default function SwiperMotion() {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = ((page % images.length) + images.length) % images.length;

  const swipeTo = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      swipeTo(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [page]);

  return (
    <div className="relative w-[80%] max-w-[1300px] h-[700px] mx-auto overflow-hidden rounded-xl">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={swipeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute w-full h-full"
        >
          <Image
            key={images[imageIndex]}
            src={images[imageIndex]}
            alt=""
            fill
            unoptimized
            className="object-cover rounded-xl bg-black"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Prev/Next Buttons */}
      <div className="absolute top-1/2 left-0 w-full flex justify-between px-4 -translate-y-1/2 z-10">
        <button
          onClick={() => swipeTo(-1)}
          className="bg-white/70 hover:bg-white/90 rounded-full px-3 py-2 text-black"
        >
          ‹
        </button>
        <button
          onClick={() => swipeTo(1)}
          className="bg-white/70 hover:bg-white/90 rounded-full px-3 py-2 text-black"
        >
          ›
        </button>
      </div>
    </div>
  );
}
