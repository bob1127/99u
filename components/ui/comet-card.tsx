"use client";
import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import Image from "next/image";
import { cn } from "../../src/lib/utils";

export const CometCard = ({
  rotateDepth = 17.5,
  translateDepth = 20,
  className,
  children,
}: {
  rotateDepth?: number;
  translateDepth?: number;
  className?: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`-${rotateDepth}deg`, `${rotateDepth}deg`]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`${rotateDepth}deg`, `-${rotateDepth}deg`]
  );

  const translateX = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${translateDepth}px`, `${translateDepth}px`]
  );
  const translateY = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${translateDepth}px`, `-${translateDepth}px`]
  );

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.75) 20%, rgba(255, 255, 255, 0) 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div className={cn("perspective-distant transform-3d", className)}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
        }}
        initial={{ scale: 1, z: 0 }}
        whileHover={{
          scale: 1.05,
          z: 50,
          transition: { duration: 0.2 },
        }}
        className="relative w-full h-full cursor-pointer [transform-style:preserve-3d]"
      >
        {/* 卡片翻轉容器 */}
        <motion.div
          className="relative w-full h-full transition-transform duration-500 ease-in-out"
          animate={{ rotateY: flipped ? 180 : 0 }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* 卡片反面（預設） */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden z-10"
            style={{ backfaceVisibility: "hidden" }}
          >
            <Image
              width={400}
              height={720}
              src="/card-front.png"
              alt="Card Back"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* 卡片正面（點擊後顯示） */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-white z-20 flex items-center justify-center"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <Image
              width={400}
              height={720}
              src="/images/istockphoto-1226658740-612x612.png"
              alt="Card Back"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </motion.div>

        {/* 光暈效果 */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 h-full w-full rounded-[16px] mix-blend-overlay"
          style={{
            background: glareBackground,
            opacity: 0.6,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </div>
  );
};
