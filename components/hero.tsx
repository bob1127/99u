import { useTranslation } from "next-i18next";
import { AuroraText } from "../src/components/magicui/aurora-text";
import Link from "next/link";
import { ShinyButton } from "../src/components/magicui/shiny-button";
import Image from "next/image";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import CoinsAnimation from "../public/lottie/Coins.json";

const Hero = () => {
  const { t } = useTranslation("common");

  return (
    <div className="relative py-6 md:py-20 sm:py-[200px] max-w-[1320px] mx-auto w-[95%] xl:w-[65%] 2xl:w-[65%] z-20 flex flex-col-reverse md:flex-row items-center justify-between h-full px-4 md:px-10">
      {/* 左側：文字區塊 */}
      <div className="z-50 flex flex-col items-center sm:items-start w-full md:w-1/2 gap-6 text-left">
        <div className="text-white text-center  sm:text-left font-bold text-2xl sm:text-3xl md:text-4xl">
          {t("hero.title1")} <br />
          {t("hero.title2")}
        </div>
        <div className="flex ">
          <h1 className="text-7xl font-extrabold tracking-tighter drop-shadow-[1px_2px_3px_rgba(0,0,0,0.5)]">
            {/* 99U：紫→白漸層 + 英文字體 + 斜切；只作用在這段 */}
            <span
              className="font-ethnocentric  skew-x-6
               bg-gradient-to-r from-purple-600 via-purple-400 to-white
               bg-clip-text text-transparent text-outline-white-1"
            >
              99U
            </span>

            {/* 中文：金→白漸層 + CJK 字體；不要 italic / 不要 skew */}
            <span className="relative inline-block ml-2 font-cjk not-italic text-7xl">
              {/* 底層：白描邊 + 單色，避免透明 */}
              <span className="absolute inset-0 text-purple-700 text-outline-white-1">
                {t("hero.title3")}
              </span>

              {/* 上層：紫 → 金 → 白 漸層填色 */}
              <span
                className="relative bg-gradient-to-r from-purple-600 via-amber-400 to-white
               bg-clip-text text-transparent"
              >
                {t("hero.title3")}
              </span>
            </span>
          </h1>
        </div>
        <div className="info rounded-[35px] bg-white/20 backdrop-blur-md border border-white/20 shadow-xl p-6 sm:p-10 text-white w-full max-w-[500px]">
          <h2 className="text-xl text-center sm:text-left sm:text-2xl text-[#ff219b] font-semibold mb-4">
            {t("hero.bonusTitle")}
          </h2>
          <p className="text-center sm:text-left text-sm sm:text-base">
            {t("hero.bonusDesc")}
          </p>

          <div className="cta-button items-center flex flex-row sm:flex-row justify-center sm:space-x-4 gap-4 sm:gap-0 pt-5">
            <Link
              href="https://www.99ubit.com/#/?superid=eric60"
              className=" mx-auto"
              rel="nofollow noopener"
            >
              {" "}
              <ShinyButton>
                <span className="text-white">{t("hero.register")}</span>
              </ShinyButton>
            </Link>
          </div>
        </div>
      </div>

      {/* 右側：圖與動畫 */}
      <div className="relative w-full md:w-1/2 flex justify-center items-center mb-10 md:mb-0">
        {/* 主圖片 */}
        <div className="relative z-20">
          <Image
            src="/images/hero-img.png"
            alt="hero-img"
            placeholder="empty"
            loading="lazy"
            width={1000}
            height={1000}
            className="w-full max-w-[600px] object-contain"
          />
        </div>

        {/* Lottie 動畫 */}
        <div className="absolute z-10 left-4 sm:left-10 bottom-[40%] w-[200px] sm:w-[280px] md:w-[350px]">
          <Lottie animationData={CoinsAnimation} loop autoplay />
        </div>
      </div>
    </div>
  );
};

export default Hero;
