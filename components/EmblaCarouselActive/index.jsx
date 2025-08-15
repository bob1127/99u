import React, { useEffect } from "react";
import EmblaCarousel from "./EmblaCarousel";
import { useTranslation } from "next-i18next";

const OPTIONS = { dragFree: true, loop: true };

const CarouselWrapper = () => {
  const { t, i18n } = useTranslation("common");
  const slides = t("slides", { returnObjects: true }) || [];

  useEffect(() => {
    console.log("🌐 當前語系:", i18n.language);
    console.log("🎞️ 取得的 slides:", slides);
  }, [slides, i18n.language]);

  if (!Array.isArray(slides)) {
    console.warn("⚠️ slides 不是陣列：", slides);
    return (
      <div className="text-red-500 p-10 text-center">
        🚫 無法正確讀取輪播內容，請檢查 common.json 格式
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="text-yellow-300 p-10 text-center">
        ⚠️ 目前此語系未提供任何輪播資料。
      </div>
    );
  }

  return (
    <div className="relative z-10">
      <EmblaCarousel slides={slides} options={OPTIONS} />
    </div>
  );
};

export default CarouselWrapper;
