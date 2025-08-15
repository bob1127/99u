"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import SoltMachine from "../components/SlotMachine.jsx";
import BlogCardGridWithFetch from "@/components/BlogCardGridWithFetch";

export default function HomePage() {
  const { t } = useTranslation("common");
  const { locale, asPath } = useRouter();

  const slotMachineHero = t("SoltMachineHero", { returnObjects: true });
  const slotTutorial = t("slotTutorial", { returnObjects: true });
  const cards = slotTutorial.cards;
  const sectionGrid = t("sectionGrid", { returnObjects: true });
  const sectionBlog = t("sectionBlog", { returnObjects: true });

  const siteUrl = "https://99-u-01.vercel.app"; // ✅ 替換為正式網址
  const fullUrl = `${siteUrl}${asPath}`;
  const ogImage = `${siteUrl}/images/solt-machine/card-img01.png`;

  useEffect(() => {
    // 清除 GSAP ScrollTrigger
    return () => {
      if (typeof window !== "undefined") {
        const ScrollTrigger = require("gsap/ScrollTrigger").ScrollTrigger;
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  return (
    <>
      <Head>
        {/* SEO Meta Tags */}
        <title>{t("slotSectionSEO.meta.title")}</title>
        <meta
          name="description"
          content={t("slotSectionSEO.meta.description")}
        />
        <meta name="keywords" content={t("slotSectionSEO.meta.keywords")} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={fullUrl} />
        <meta name="author" content="99U Entertainment" />
        <meta name="publisher" content="99U Entertainment" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={locale} />
        <meta property="og:title" content={t("slotSectionSEO.meta.title")} />
        <meta
          property="og:description"
          content={t("slotSectionSEO.meta.description")}
        />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:site_name" content={t("site.name")} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("slotSectionSEO.meta.title")} />
        <meta
          name="twitter:description"
          content={t("slotSectionSEO.meta.description")}
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

      <div className="bg-black">
        {/* Hero 區塊 */}
        <section className="section-slot-hero mb-0 pb-0">
          <div className="relative w-full max-w-[1920px] h-[100vh] aspect-[16/6] mx-auto overflow-hidden">
            <Image
              src="/images/solt-machine/gambling-slot-machine-casino_53876-123085.jpg"
              alt="solt-hero"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/70 z-10" />
            <div className="absolute inset-0 z-20 flex items-start lg:items-center justify-center px-4">
              <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-10">
                <div className="w-full lg:w-1/2 flex justify-center">
                  <div className="max-w-[400px] w-[90%] sm:w-full">
                    <SoltMachine />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left items-center lg:items-start">
                  <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold drop-shadow-lg">
                    {slotMachineHero.title}
                  </h1>
                  <p className="text-md sm:text-[28px] text-white mt-6 max-w-md">
                    {slotMachineHero.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-20" />
          </div>
        </section>

        {/* Slot 教學卡片區 */}
        <section className="section-solt-tutorual py-10 px-4">
          <div className="flex flex-col items-center justify-center">
            <div className="title text-center">
              <h2 className="text-white text-3xl sm:text-4xl font-bold">
                {slotTutorial.title}
              </h2>
            </div>
            <div className="py-10 w-full">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 max-w-[1300px] mx-auto">
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className="card flex flex-col lg:flex-row bg-white border border-gray-300 rounded-[20px] p-6 md:p-10 lg:p-16 transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                  >
                    <div className="img flex-shrink-0 mb-6 lg:mb-0 lg:mr-6 flex justify-center">
                      <Image
                        src={card.image}
                        width={300}
                        height={300}
                        alt={`card-${index}`}
                        className="max-w-[180px] w-full h-auto"
                        placeholder="empty"
                        loading="lazy"
                      />
                    </div>
                    <div className="txt">
                      <h3 className="text-gray-800 font-extrabold text-xl sm:text-2xl mb-2">
                        {card.title}
                      </h3>
                      <p className="text-base leading-relaxed text-gray-700">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Slot 文章推薦區 */}
        <section className="section-article m-0 p-0 max-w-[1920px] w-[100%] sm:w-[80%] mx-auto z-10 relative">
          <div className="py-0 sm:py-10 px-6 text-white">
            <div className="title max-w-screen-2xl mx-auto mb-6">
              <h2 className="text-3xl md:text-5xl font-bold !bg-gradient-to-r !from-[#ff9b18] to-[#ff5e8e] bg-clip-text text-transparent">
                {t("slotSection.title")}
              </h2>
              <p className="text-xl font-bold text-white bg-clip-text text-transparent">
                {t("slotSection.subtitle")}
              </p>
            </div>
            <BlogCardGridWithFetch
              apiUrl="https://wordpress-861686-5705144.cloudwaysapps.com/wp-json/wp/v2/posts"
              tabs={{
                "Slot Machine": t("slotSection.tabs.slot"),
                poker: t("OnlineGame.tag.baccarat"),
                Roulette: t("OnlineGame.tag.roulette"),
                21: t("OnlineGame.tag.blackjack"),
                casino: t("OnlineGame.tag.casino"),
              }}
              defaultTab="Slot Machine"
              onlyTabKey="Slot Machine" // 👈 新增
            />
          </div>
        </section>
      </div>
    </>
  );
}

// 多語系設定
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW", ["common"])),
    },
    revalidate: 60,
  };
}
