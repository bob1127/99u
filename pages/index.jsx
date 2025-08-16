"use client";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useEffect, useState } from "react";
import Hero from "../components/hero";
import Image from "next/image.js";
import { useRef } from "react";
import Card from "../components/FullCardScroll.jsx";
import ReactLenis from "@studio-freight/react-lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"; // ✅ 使用 dist 裡的版本（專為 Webpack 編譯環境設計）
import { usePathname } from "next/navigation";
import LocalizedMarquee from "../components/LocalizedMarquee";
import Link from "next/link";
import { ShinyButton } from "../components/magicui/shiny-button";
import { useRouter } from "next/router";

import { cn } from "../src/lib/utils";
import BlogCarousel from "../components/EmblaCarousel01/index.jsx";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);
const backgroundImage = "/images/S__23085150.png";
const myLoader = ({ src, width, quality, placeholder }) => {
  return `https://www.dot-st.com/static/docs/nikoand/pages/2022_city_creek_v2/assets/images/${src}?w=${width}?p=${placeholder}`;
};
const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 bg-white cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};
const siteUrl = "https://99-u-01.vercel.app"; // ✅ 替換為正式網址
export default function HomePage({ locale }) {
  const { locale: routerLocale, asPath } = useRouter();
  const fullUrl = `${siteUrl}${asPath}`;

  const ogImage = `${siteUrl}/images/solt-machine/card-img01.png`;
  const reviews = [
    {
      name: "Jack",
      username: "@jack",
      body: "I've never ",
      img: "/images/marquee/bounty_hunters_banner-large-B73mts04.webp",
    },
    {
      name: "Jack",
      username: "@jack",
      body: "I've never ",
      img: "/images/marquee/ac564398d6bb2a2fcbb41e30c402a0b8e8a1c0f4.webp",
    },
    {
      name: "Jack",
      username: "@jack",
      body: "I've never ",
      img: "/images/marquee/chinese-zodiac-banner-large-BufpSDK4.webp",
    },
    {
      name: "Jack",
      username: "@jack",
      body: "I've never ",
      img: "/images/marquee/daily_guarantees_banner-large-CIqZ2Mwl.webp",
    },
    {
      name: "Jack",
      username: "@jack",
      body: "I've never ",
      img: "/images/marquee/first_depositors_freeroll_banner-large-zEpXA4G7.webp",
    },
    {
      name: "Jack",
      username: "@jack",
      body: "I've never ",
      img: "/images/marquee/freerolls_banner-large-3B-cI9o_.webp",
    },
    {
      name: "Jack",
      username: "@jack",
      body: "I've never ",
      img: "/images/marquee/high_rollers_banner-large-CGhm3sFk.webp",
    },
    {
      name: "Jack",
      username: "@jack",
      body: "I've never ",
      img: "/images/marquee/hourly_freerolls_banner-large-QCN7ZTCE.webp",
    },
  ];

  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);
  const cardImages = [
    {
      src: "/images/index/匿名快速、無須個資.webp",
      alt: "匿名快速",
    },
    {
      src: "/images/index/存提款快速.webp",
      alt: "快速提款",
    },
    {
      src: "/images/index/全球玩家皆可玩.webp",
      alt: "全球皆可玩",
    },
    {
      src: "/images/index/24小時客服服務.webp",
      alt: "線上客服",
    },
    {
      src: "/images/index/輕鬆支付.webp",
      alt: "快速支付",
    },
    {
      src: "/images/index/值得信賴的合法運營商.webp",
      alt: "合法運營商",
    },
  ];

  const ReviewCard = ({ img, name, username, body }) => {
    return (
      <figure
        className={cn(
          "relative h-full w-[350px] cursor-pointer !bg-white  overflow-hidden rounded-xl border p-4",
          // light styles
          "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
          // dark styles
          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
        )}
      >
        <div className="flex flex-row items-center gap-2">
          <img
            className="rounded-[10px] w-full"
            width="64"
            height="64"
            alt=""
            src={img}
          />
        </div>
        <blockquote className="mt-2 text-sm">{body}</blockquote>
      </figure>
    );
  };
  const [isLoading, setIsLoading] = useState(true);
  const container = useRef(null);
  const cardRefs = useRef([]);
  useGSAP(
    () => {
      const cards = cardRefs.current;
      const totalScrollHeight = window.innerHeight * 3;
      const positions = [14, 38, 62, 86];
      const rotations = [-15, -7.5, 7.5, 15];

      // pin cards section
      ScrollTrigger.create({
        trigger: container.current.querySelector(".cards"),
        start: "top top",
        end: () => `+=${totalScrollHeight}`,
        pin: true,
        pinSpacing: true,
      });

      // spread cards
      cards.forEach((card, index) => {
        gsap.to(card, {
          left: `${positions[index]}%`,
          rotation: `${rotations[index]}`,
          ease: "none",
          scrollTrigger: {
            trigger: container.current.querySelector(".cards"),
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: 0.5,
            id: `spread-${index}`,
          },
        });
      });

      // flip cards and reset rotation with staggered effect
      cards.forEach((card, index) => {
        // const frontEl = card.querySelector(".flip-card-front");
        // const backEl = card.querySelector(".flip-card-back");

        const staggerOffset = index * 0.05;
        const startOffset = 1 / 3 + staggerOffset;
        const endOffset = 2 / 3 + staggerOffset;

        ScrollTrigger.create({
          trigger: container.current.querySelector(".cards"),
          start: "top top",
          end: () => `+=${totalScrollHeight}`,
          scrub: 1,
          id: `rotate-flip-${index}`,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress >= startOffset && progress <= endOffset) {
              const animationProgress = (progress - startOffset) / (1 / 3);
              const frontRotation = -180 * animationProgress;
              const backRotation = 180 - 180 * animationProgress;
              const cardRotation = rotations[index] * (1 - animationProgress);

              gsap.to(frontEl, { rotateY: frontRotation, ease: "power1.out" });
              gsap.to(backEl, { rotateY: backRotation, ease: "power1.out" });
              gsap.to(card, {
                xPercent: -50,
                yPercent: -50,
                rotate: cardRotation,
                ease: "power1.out",
              });
            }
          },
        });
      });
    },
    { scope: container }
  );
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  const [isHovered, setIsHovered] = useState(false);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const imageAnimation = (index) => ({
    y: hoveredIndex === index ? -10 : 0,
    scale: hoveredIndex === index ? 1.05 : 1,
    opacity: hoveredIndex === index ? 1 : 0.95,
  });

  //動態多語系文字內容
  const { t } = useTranslation("common");

  const cardItems = t("sectionCardItem.items", { returnObjects: true });
  const sectionGrid = t("sectionGrid", { returnObjects: true });
  const sectionBlog = t("sectionBlog", { returnObjects: true });
  const gridItems = sectionGrid.items;
  const cards = [
    {
      img: "/images/百家樂.png",
      alt: "Ace Card",
      link: "https://example.com/ace",
    },
    {
      img: "/images/老虎機.png",
      alt: "King Card",
      link: "https://example.com/king",
    },
    {
      img: "/images/棋牌遊戲.png",
      alt: "Queen Card",
      link: "https://example.com/queen",
    },
    {
      img: "/images/線上投注.png",
      alt: "Joker Card",
      link: "https://example.com/joker",
    },
  ];
  // 自訂每個 index 對應的圖片（想換圖直接改這裡）
  const imagesByIndex = {
    3: {
      src: "/images/index/充滿刺激的遊戲選擇.webp",
      alt: "充滿刺激的遊戲選擇",
    },
    4: { src: "/images/index/全民代理日結日領.webp", alt: "全民代理日結日領" },
  };

  // 沒設定到的 index 走這個預設圖
  const fallbackImage = {
    src: "/images/index/充滿刺激的遊戲選擇.webp",
    alt: "grid 預設圖",
  };

  return (
    <>
      <Head>
        {/* SEO Meta Tags */}
        <title>{t("99uSEO.meta.title")}</title>
        <meta name="description" content={t("99uSEO.meta.description")} />
        <meta name="keywords" content={t("99uSEO.meta.keywords")} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={fullUrl} />
        <meta name="author" content="99U Entertainment" />
        <meta name="publisher" content="99U Entertainment" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={routerLocale} />

        <meta property="og:title" content={t("99uSEO.meta.title")} />
        <meta
          property="og:description"
          content={t("99uSEO.meta.description")}
        />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:site_name" content={t("site.name")} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("99uSEO.meta.title")} />
        <meta
          name="twitter:description"
          content={t("99uSEO.meta.description")}
        />
        <meta name="twitter:image" content={ogImage} />

        {/* Hreflang 多語系設定 */}
        <link
          rel="alternate"
          hrefLang="zh-Hant"
          href={`${siteUrl}/zh-Hant${asPath}`}
        />
        <link
          rel="alternate"
          hrefLang="zh-CN"
          href={`${siteUrl}/zh-CN${asPath}`}
        />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/en${asPath}`} />
        <link rel="alternate" hrefLang="th" href={`${siteUrl}/th${asPath}`} />
        <link rel="alternate" hrefLang="vi" href={`${siteUrl}/vi${asPath}`} />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${siteUrl}${asPath}`}
        />
      </Head>
      <div className=" bg-black overflow-hidden" ref={container}>
        <div className="fixed inset-0 z-0 blur-[100px]">
          <div className="absolute inset-0 m-auto w-screen h-screen min-w-[1000px] rounded-full overflow-hidden bg-black scale-[0.8]">
            <div className="absolute inset-0 w-screen h-screen m-auto animate-spinBlob bg-[conic-gradient(from_0deg,_#111111,_#1e3a8a,_#6366f1,_#9333ea,_#3b82f6,_#1e40af,_#7c3aed,_#111111)]"></div>
          </div>
        </div>
        <div className="overflow-hidden">
          <Hero />
        </div>
        <section className="section-card-item z-20 py-10 flex flex-col items-center justify-center">
          <div className="title flex flex-col justify-center items-center max-w-[1920px] w-[85%]  mx-auto">
            <h2 className="text-white text-[7vmin]">
              {t("sectionCardItem.title")}
            </h2>
            <p className="text-center text-md text-white w-full sm:w-1/2">
              {t("sectionCardItem.description")}
            </p>
          </div>
          <div className="grid mt-20 px-4 sm:grid-cols-2 grid-cols-2 xl:grid-cols-3 justify-items-center max-w-[1520px] w-[100%] md:w-[85%]   2xl:w-[65%] mx-auto">
            {t("sectionCardItem.items", { returnObjects: true }).map(
              (item, index) => (
                <div
                  key={index}
                  className="card bg-white relative group w-[98%] xl:w-[370px] mt-20 sm:mt-[150px] xl:mt-[100px] h-[62vmin] sm:h-[430px] xl:h-[400px] rounded-xl"
                >
                  <div className="top h-1/3 overflow-hidden">
                    <Image
                      src={cardImages[index % cardImages.length].src}
                      alt={cardImages[index % cardImages.length].alt}
                      placeholder="empty"
                      loading="lazy"
                      width={500}
                      height={300}
                      className="w-[90%] absolute scale-95 group-hover:scale-100 transition duration-500 left-1/2 -translate-x-1/2 top-[-26%] sm:top-[-10%] md:top-[-25%] xl:top-[-20%] mx-auto rounded-xl border-3 border-white"
                    />
                  </div>

                  {/* ✅ 手機左對齊、平板以上置中；加 padding 與較舒適的行高 */}
                  <div className="bottom px-4 sm:px-3 absolute top-[36%] sm:bottom-10 left-1/2 -translate-x-1/2 w-full sm:w-2/3 h-1/2 mt-2 flex flex-col justify-end items-center sm:items-center">
                    <h3 className="text-[15px] text-center md:text-xl font-bold group-hover:text-[#e84fdc]  sm:text-center">
                      {item.title}
                    </h3>
                    <p className="block text-[13px] sm:text-sm font-normal text-black mt-3 sm:mt-6 text-left sm:text-center leading-relaxed break-words whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* <section className="section-card hidden md:block cards relative h-screen z-20 w-screen overflow-hidden">
          {cards.map((card, index) => (
            <Card
              key={index}
              id={`card-${index + 1}`}
              frontImageSrc={card.img}
              frontAlt={card.alt}
              backText={`第 ${index + 1} 張牌`}
              linkUrl={card.link} // ✅ 傳入連結
              ref={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </section> */}
        <section className=" section-active  flex w-full flex-col items-start sm:items-center justify-start p-0 sm:justify-center  ">
          <LocalizedMarquee />
        </section>
        <section className="seciton-grid relative z-50 py-2 sm:py-20 max-w-[1520px] w-[90%] mx-auto">
          <div className="title mb-6 sm:mb-10 text-center">
            <h2 className="text-white text-3xl sm:text-5xl">
              {sectionGrid.title}
            </h2>
            <p className="text-white text-sm sm:text-lg">
              {sectionGrid.description}
            </p>
          </div>

          {/* 第一排 */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* 左側 */}
            <div
              className="w-full lg:w-[60%] min-h-[300px] sm:min-h-[400px] overflow-hidden rounded-[20px] sm:rounded-[35px] bg-black/60 backdrop-blur-md border border-white/20 shadow-xl text-white flex flex-col sm:flex-row relative"
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* 文字（手機版 padding 縮小） */}
              <div className="w-full sm:w-1/2 z-10 relative flex flex-col justify-center px-4 py-4 sm:px-6 sm:py-8">
                <h3 className="text-white text-xl sm:text-3xl mb-2">
                  {gridItems[0]?.title}
                </h3>
                <p className="text-white text-sm sm:text-base lg:text-lg">
                  {gridItems[0]?.description}
                </p>
              </div>

              {/* 圖片（手機版寬 95%） */}
              <div className="w-full sm:w-1/2 relative z-0">
                <motion.div
                  animate={imageAnimation(0)}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                    mass: 0.6,
                  }}
                  className="absolute inset-0 grid place-items-center"
                >
                  {/* 讓 Image 用 wrapper 控制寬度：手機 95%，sm 以上填滿 */}
                  <div className="relative w-[95%] sm:w-full aspect-[4/3] sm:aspect-auto sm:h-full">
                    <Image
                      src="/images/index/多國法幣存款和提款.webp"
                      alt="grid-img"
                      fill
                      className="object-contain rounded-2xl"
                      sizes="(min-width:1024px) 50vw, (min-width:640px) 50vw, 95vw"
                      placeholder="empty"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* 右側 */}
            <div
              className="w-full lg:w-[40%] min-h-[300px] sm:min-h-[400px] overflow-hidden rounded-[20px] sm:rounded-[35px] bg-white/20 backdrop-blur-md border border-white/20 shadow-xl text-white flex flex-col sm:flex-row relative"
              onMouseEnter={() => setHoveredIndex(1)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="w-full sm:w-1/2 z-10 relative flex flex-col justify-center px-4 py-4 sm:px-6 sm:py-8">
                <h3 className="text-white text-xl sm:text-3xl mb-2">
                  {gridItems[1]?.title}
                </h3>
                <p className="text-white text-sm sm:text-base lg:text-lg">
                  {gridItems[1]?.description}
                </p>
              </div>

              <div className="w-full sm:w-1/2 relative z-0">
                <motion.div
                  animate={imageAnimation(1)}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                    mass: 0.6,
                  }}
                  className="absolute inset-0 grid place-items-center"
                >
                  <div className="relative w-[95%] sm:w-full aspect-[4/3] sm:aspect-auto sm:h-full">
                    <Image
                      src="/images/index/區塊鏈專屬遊戲.webp"
                      alt="grid-img"
                      fill
                      className="object-contain rounded-2xl"
                      sizes="(min-width:1024px) 40vw, (min-width:640px) 50vw, 95vw"
                      placeholder="empty"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* 第二排 */}
          <div className="flex flex-col lg:flex-row gap-4 mt-6">
            {/* 左側 */}
            <div
              className="w-full lg:w-[40%] min-h-[320px] sm:min-h-[500px] overflow-hidden rounded-[20px] sm:rounded-[35px] bg-black/60 backdrop-blur-md border border-white/20 shadow-xl text-white flex flex-col sm:flex-row relative"
              onMouseEnter={() => setHoveredIndex(2)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="w-full sm:w-1/2 z-10 relative flex flex-col justify-center px-4 py-4 sm:px-6 sm:py-8">
                <h3 className="text-white text-xl sm:text-3xl mb-2">
                  {gridItems[2]?.title}
                </h3>
                <p className="text-white text-sm sm:text-base lg:text-lg">
                  {gridItems[2]?.description}
                </p>
              </div>

              <div className="w-full sm:w-1/2 relative z-0">
                <motion.div
                  animate={imageAnimation(2)}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                    mass: 0.6,
                  }}
                  className="absolute inset-0 grid place-items-center"
                >
                  <div className="relative w-[95%] sm:w-full aspect-[4/3] sm:aspect-auto sm:h-full">
                    <Image
                      src="/images/index/VIP等級制度.webp"
                      alt="grid-img"
                      fill
                      className="object-contain rounded-2xl"
                      sizes="(min-width:1024px) 50vw, (min-width:640px) 50vw, 95vw"
                      placeholder="empty"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* 右側上下兩格 */}
            <div className="w-full lg:w-[60%] flex flex-col gap-4">
              {[3, 4].map((index) => {
                const img = imagesByIndex[index] || fallbackImage;
                return (
                  <div
                    key={index}
                    className="w-full min-h-[320px] sm:min-h-[350px] overflow-hidden rounded-[20px] sm:rounded-[35px] bg-black/60 backdrop-blur-md border border-white/20 shadow-xl text-white flex flex-col sm:flex-row relative"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="w-full sm:w-1/2 z-10 relative flex flex-col justify-center px-4 py-4 sm:px-6 sm:py-8">
                      <h3 className="text-white text-xl sm:text-3xl mb-2">
                        {gridItems[index]?.title}
                      </h3>
                      <p className="text-white text-sm sm:text-base lg:text-lg">
                        {gridItems[index]?.description}
                      </p>
                    </div>

                    <div className="w-full sm:w-1/2 relative z-0">
                      <motion.div
                        animate={imageAnimation(index)}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 10,
                          mass: 0.6,
                        }}
                        className="absolute inset-0 grid place-items-center"
                      >
                        <div className="relative w-[95%] sm:w-full aspect-[4/3] sm:aspect-auto sm:h-full">
                          <Image
                            src={img.src}
                            alt={img.alt || "grid-img"}
                            fill
                            className="object-contain rounded-2xl"
                            sizes="(min-width:1024px) 50vw, (min-width:640px) 50vw, 95vw"
                            placeholder="empty"
                            loading="lazy"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-blog-carousel-item z-50 relative">
          <div className="title flex max-w-[1920px] mx-auto w-[85%] flex-col justify-center items-center">
            <h2 className="text-[6vmin] text-white max-w-[800px] text-center">
              {sectionBlog.title}
            </h2>
            <p className="text-white tetx-md mb-8 text-center max-w-[600px]">
              {sectionBlog.description}
            </p>
            <Link href="https://www.99ubit.com/#/?superid=eric60">
              {" "}
              <ShinyButton>
                <span className="text-white">{sectionBlog.register}</span>
              </ShinyButton>
            </Link>
          </div>
          <BlogCarousel />
        </section>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW", ["common", "hero"])),
    },
    revalidate: 60,
  };
}
