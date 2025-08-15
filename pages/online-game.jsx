// pages/online-game.jsx
import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import BlogCardGridWithFetch from "@/components/BlogCardGridWithFetch";

gsap.registerPlugin(ScrollTrigger);

export default function OnlineGamePage() {
  const { t } = useTranslation("common");

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const tagImages = {
    baccarat: "/images/online-game/a-quoi-jouer-au-casino.jpg",
    blackjack: "/images/online-game/21點-1221-第三張.jpg",
    roulette: "/images/online-game/roulette-1253622_1280.webp",
    casino: "/images/online-game/roulette-1253622_1280.webp",
  };

  return (
    <>
      <Head>
        <title>{t("OnlineGame.title")}</title>
        <meta name="description" content={t("OnlineGame.description")} />
      </Head>

      <div className="bg-black">
        {/* HERO VIDEO SECTION */}
        <section className="section-hero-video relative w-full h-[80vh] overflow-hidden">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            src="/video/135618-762107386.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
          <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              {t("OnlineGame.hero.title")}
            </h1>
          </div>
        </section>

        {/* 類別卡片（普通 card） */}
        <section className="section-category w-[90%] mx-auto py-12 px-4">
          <div className="title flex mx-auto w-[95%] my-8 flex-col justify-center items-center max-w-[500px] ">
            <h2 className="text-white text-5xl">
              {t("OnlineGame.category.title")}
            </h2>
            <p className="text-center text-gray-100 mt-4">
              {t("OnlineGame.category.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-6 max-w-[1300px] mx-auto">
            <GameCard
              image={tagImages.roulette}
              title={t("OnlineGame.tag.roulette")}
              description={t("OnlineGame.tagDesc.roulette")}
            />
            <GameCard
              image={tagImages.blackjack}
              title={t("OnlineGame.tag.blackjack")}
              description={t("OnlineGame.tagDesc.blackjack")}
            />
            <GameCard
              image={tagImages.baccarat}
              title={t("OnlineGame.tag.baccarat")}
              description={t("OnlineGame.tagDesc.baccarat")}
            />
            <GameCard
              image={tagImages.casino}
              title={t("OnlineGame.tag.casino")}
              description={t("OnlineGame.tagDesc.casino")}
            />
          </div>
        </section>

        {/* 文章區塊 */}
        <section className="section-article p-0 max-w-[1920px] w-[80%] mx-auto z-50 relative">
          <div className="py-4 md:py-20 px-0 sm:px-6 text-white z-50">
            <div className="title max-w-screen-2xl mx-auto mb-6">
              <h2 className="text-[30px] md:text-5xl font-bold !bg-gradient-to-r !from-[#ff9b18] to-[#ff5e8e] bg-clip-text text-transparent">
                {t("OnlineGame.article.title")}
              </h2>
              <p className="text-[16px] w-[80%] md:text-xl font-bold text-white bg-clip-text text-transparent">
                {t("OnlineGame.article.subtitle")}
              </p>
            </div>

            <BlogCardGridWithFetch
              apiUrl="https://wordpress-861686-5705144.cloudwaysapps.com/wp-json/wp/v2/posts"
              tabs={{
                poker: t("OnlineGame.tag.baccarat"),
                Roulette: t("OnlineGame.tag.roulette"),
                21: t("OnlineGame.tag.blackjack"),
                casino: t("OnlineGame.tag.casino"),
              }}
              defaultTab="poker"
            />
          </div>
        </section>
      </div>
    </>
  );
}

/** 普通卡片：無點擊、無彈窗 **/
function GameCard({ image, title, description }) {
  return (
    <div className="rounded-2xl bg-white overflow-hidden shadow-md border border-neutral-200">
      <div className="relative w-full aspect-[4/2.2]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          placeholder="empty"
        />
      </div>
      <div className="p-6 text-black">
        <div className="inline-block px-3 py-1 rounded-full mb-3 text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_10px_rgba(125,90,255,0.6)]">
          {title}
        </div>
        <p className="text-sm text-black/80">{description}</p>
      </div>
    </div>
  );
}

// ✅ 多語系 ISR 設定（.jsx 版）
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW", ["common"])),
    },
    revalidate: 60,
  };
}
