"use client";

import { useTranslation } from "next-i18next";
import { Marquee } from "@/components/magicui/marquee";
import { useMemo } from "react";
import Image from "next/image";

const LocalizedMarquee = () => {
  const { t, i18n } = useTranslation("common");
  const locale = i18n.language || "zh-TW";

  // 語系圖片後綴
  const localeSuffix = useMemo(() => {
    if (locale === "en") return "-en";
    if (locale === "zh-CN") return "-zh-CN";
    return ""; // zh-TW 或預設繁中
  }, [locale]);

  const basePath = "/images/index/活動/";
  const imageList = Array.from({ length: 9 }, (_, i) => {
    const index = (i + 1).toString().padStart(2, "0");
    return `${basePath}active-${index}${localeSuffix}.webp`;
  });

  // 隨機打散
  const shuffle = (arr) => {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const rows = [
    { reverse: false, images: shuffle(imageList) },
    { reverse: true, images: shuffle(imageList) },
    { reverse: false, images: shuffle(imageList) },
  ];

  return (
    <div className="w-full overflow-hidden py-2 relative sm:py-20 z-10">
      <div className="title mx-auto max-w-[600px] z-[999999] relative py-8">
        <h2 className="text-white text-[32px] xl:text-[42px] text-center">
          {t("marquee.title")}
        </h2>
        <p className="text-center text-white w-[80%] mx-auto">
          {t("marquee.description")}
        </p>
      </div>

      {rows.map((row, rowIndex) => (
        <Marquee
          key={rowIndex}
          pauseOnHover
          reverse={row.reverse}
          className="[--duration:25s] mb-6"
        >
          {row.images.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt=""
              width={300}
              height={150}
              className="mx-4 border-5 border-white rounded-xl"
            />
          ))}
        </Marquee>
      ))}

      {/* 左右遮罩 */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent" />
    </div>
  );
};

export default LocalizedMarquee;
