"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";
import dynamic from "next/dynamic";

const ICON_COUNT = 13;
const ICON_PATH = "/images/solt-machine/solt-machine-icon/";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import CoinsAnimation from "../public/lottie/Coins.json";

export default function SlotMachine() {
  const [spinning, setSpinning] = useState(false);
  const columns = useRef([]);

  // 建立圖示陣列（01~13）
  const ICONS = Array.from({ length: ICON_COUNT }, (_, i) => {
    const index = String(i + 1).padStart(2, "0");
    return `${ICON_PATH}solt-machine-${index}.webp`;
  });

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    columns.current.forEach((col, idx) => {
      const totalItems = ICONS.length;
      const loops = 3;
      const randomIndex = Math.floor(Math.random() * totalItems);
      const translateY = (totalItems * loops + randomIndex) * 200;
      const duration = 1000 + idx * 300;

      col.style.transition = `transform ${duration}ms ease-out`;
      col.style.transform = `translateY(-${translateY}px)`;

      setTimeout(() => {
        col.style.transition = "none";
        col.style.transform = `translateY(-${randomIndex * 200}px)`;
        setSpinning(false);
      }, duration + 100);
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center pr-10 py-0 sm:py-10">
      <div className="max-w-[300px] mb-4">
        <Image
          src="https://i.ibb.co/R3cf4Gw/7639633.png"
          alt="Slot Machine"
          width={210}
          height={100}
          className="w-full"
        />
      </div>

      <div className="relative max-w-[400px] mx-auto">
        <div className="absolute flex overflow-hidden h-[200px] w-[93%] bottom-5 px-[25px] ml-[22px] bg-white z-10">
          {[...Array(3)].map((_, colIdx) => (
            <div
              key={colIdx}
              className="w-[200px] h-[200px] text-[75px] text-center"
              style={{ overflow: "hidden" }}
            >
              <div
                ref={(el) => (columns.current[colIdx] = el)}
                className="flex flex-col"
              >
                {ICONS.concat(ICONS).map((img, i) => (
                  <div
                    key={i}
                    className="h-[200px] flex items-center justify-center"
                  >
                    <Image
                      src={img}
                      alt={`icon-${i}`}
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="absolute z-0 left-4 sm:left-0 bottom-[40%] w-[380px] sm:w-[450px] md:w-[450px]">
          <Lottie animationData={CoinsAnimation} loop autoplay />
        </div>

        <Image
          src="https://i.ibb.co/MfSZ71p/7670530.png"
          alt="Frame"
          width={400}
          height={200}
          className="relative -right-5 w-full"
        />

        <button
          type="button"
          onClick={spin}
          className={clsx(
            "absolute top-1/2 -right-[70px] transform -translate-y-1/2 mt-[70px] w-[80px]",
            spinning && "pointer-events-none opacity-50"
          )}
        >
          <Image
            src="https://i.ibb.co/0VTc2LZ/spin-btn.png"
            alt="Spin"
            width={80}
            height={80}
            className="w-full select-none transition-all hover:drop-shadow-[2px_4px_6px_yellow]"
          />
        </button>
      </div>
    </div>
  );
}
