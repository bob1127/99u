"use client";

import { useState, useRef, useLayoutEffect, useCallback, memo } from "react";
import { useTranslation } from "next-i18next";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Head from "next/head";
import { ShinyButton } from "../components/magicui/shiny-button";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
/** 單一手風琴項目（優化：數字高度動畫、memo、initial={false}） */
const AccordionItem = memo(function AccordionItem({ q, a, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [measured, setMeasured] = useState(0);

  useLayoutEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    const prev = el.style.height;
    el.style.height = "auto";
    const h = el.scrollHeight;
    el.style.height = prev;
    setMeasured(h);
  }, [q, a, isOpen]);

  return (
    <motion.div
      layout
      initial={false}
      className={`rounded-xl shadow transition-colors duration-200 will-change-transform ${
        isOpen
          ? // 開啟時：粉→紫漸層，無邊框
            "bg-gradient-to-r from-[#FF6AA9] to-[#8B6CFF] border border-transparent"
          : // 關閉時：白底，灰邊
            "bg-white border border-gray-300"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex justify-between items-center px-5 py-4 text-left select-none"
      >
        <span
          className={`font-semibold ${isOpen ? "text-white" : "text-gray-900"}`}
        >
          {q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "tween", duration: 0.18 }}
        >
          <ChevronDown
            className={`w-5 h-5 ${isOpen ? "text-white" : "text-gray-500"}`}
          />
        </motion.div>
      </button>

      {/* 高度用數字動畫（避免 auto 卡頓） */}
      <motion.div
        ref={contentRef}
        initial={false}
        animate={{
          height: isOpen ? measured : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          height: { duration: 0.22, ease: [0.33, 1, 0.68, 1] },
          opacity: { duration: 0.15 },
        }}
        style={{ overflow: "hidden", willChange: "height" }}
      >
        <div
          className={`px-5 pb-4 whitespace-pre-line ${
            isOpen ? "text-white/90" : "text-gray-700"
          }`}
        >
          {a}
        </div>
      </motion.div>
    </motion.div>
  );
});

export default function BonusFAQPage() {
  const { t } = useTranslation("common");
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: t("AccordionBonus.items.account.howToQualify.question"),
      a: t("AccordionBonus.items.account.howToQualify.answer"),
    },
    {
      q: t("AccordionBonus.items.account.doubleClaim.question"),
      a: t("AccordionBonus.items.account.doubleClaim.answer"),
    },
    {
      q: t("AccordionBonus.items.account.validBet.question"),
      a: t("AccordionBonus.items.account.validBet.answer"),
    },
    {
      q: t("AccordionBonus.items.account.rebateTime.question"),
      a: t("AccordionBonus.items.account.rebateTime.answer"),
    },
    {
      q: t("AccordionBonus.items.account.earlyWithdraw.question"),
      a: t("AccordionBonus.items.account.earlyWithdraw.answer"),
    },
  ];

  const handleToggle = useCallback((index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const hero = {
    title1: t("Bonus.hero.title1"),
    title2: t("Bonus.hero.title2"),
    banner: {
      title1: t("Bonus.hero.banner.title1"),
      title2: t("Bonus.hero.banner.title2"),
      desc: t("Bonus.hero.banner.desc"),
      cta: t("Bonus.hero.banner.cta"),
    },
  };

  const cards = [
    {
      img: "/images/bonus/優惠活動2.webp",
      title: t("Bonus.cards.card1.title"),
      desc: t("Bonus.cards.card1.desc"),
    },
    {
      img: "/images/bonus/優惠活動.webp",
      title: t("Bonus.cards.card2.title"),
      desc: t("Bonus.cards.card2.desc"),
    },
    {
      img: "/images/bonus/優惠活動4.webp",
      title: t("Bonus.cards.card3.title"),
      desc: t("Bonus.cards.card3.desc"),
    },
  ];

  return (
    <div className="bg-black">
      <div className="mx-auto px-0 sm:px-6 lg:px-8 py-12">
        <Head>
          <title>{t("AccordionBonus.meta.title")}</title>
          <meta
            name="description"
            content={t("AccordionBonus.meta.description")}
          />
        </Head>

        <LazyMotion features={domAnimation}>
          {/* Section 1：主標 + Banner */}
          <section className="mx-auto max-w-[1200px] w-[90%] px-4 sm:px-6 lg:px-0 pt-10 pb-16">
            <div className="title flex flex-col items-center justify-center text-center mb-8">
              <h2 className="text-white text-[32px] sm:text-[38px] md:text-[45px] font-bold">
                {hero.title1}
              </h2>
              <h2 className="text-white text-[32px] sm:text-[38px] md:text-[45px] font-bold">
                {hero.title2}
              </h2>
            </div>

            <div className="banner flex flex-col lg:flex-row rounded-[35px] overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
              {/* Left */}
              <div className="left w-full lg:w-1/2 flex justify-center items-center p-6">
                <Image
                  src="/images/bonus/優惠活動3.webp"
                  className="w-full max-w-[400px] h-auto"
                  width={600}
                  height={600}
                  alt="bonus-hero"
                  placeholder="empty"
                  loading="lazy"
                />
              </div>

              {/* Right */}
              <div className="right w-full lg:w-1/2 bg-[#841dc9] flex flex-col justify-center items-center p-6 sm:p-10 rounded-b-[35px] lg:rounded-b-none lg:rounded-r-[35px] text-center">
                <h2 className="text-white text-[20px] sm:text-[23px] font-bold mb-2">
                  {hero.banner.title1}
                </h2>
                <h2 className="text-white text-[20px] sm:text-[23px] font-bold mb-4">
                  {hero.banner.title2}
                </h2>
                <p className="text-[15px] text-white mb-6 w-full sm:w-3/4 leading-relaxed">
                  {hero.banner.desc}
                </p>
                <Link href="https://www.99ubit.com/#/?superid=eric60">
                  {" "}
                  <ShinyButton>
                    {" "}
                    <span className="text-white"> {hero.banner.cta}</span>
                  </ShinyButton>
                </Link>
              </div>
            </div>
          </section>

          {/* Section 2：活動卡片 */}
          <section className="mx-auto max-w-[1200px] w-[90%] py-3 lg:py-16">
            <h2 className="text-white text-[32px] md:text-[38px] lg:text-[45px] mb-10 text-center">
              {t("Bonus.cards.sectionTitle")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
              {cards.map((c, i) => (
                <div
                  key={i}
                  className="card relative w-full mb-[90px] max-w-[330px] p-1 group bg-white/10 backdrop-blur-sm border border-white/20 rounded-[23px] shadow-xl"
                >
                  <div className="img bg-[#0f103a] rounded-[20px] overflow-hidden">
                    <Image
                      src={c.img}
                      alt={`bonus-card-${i + 1}`}
                      placeholder="empty"
                      loading="lazy"
                      width={400}
                      height={300}
                      className="w-full rounded-[20px] group-hover:scale-105 scale-100 transition duration-400"
                    />
                  </div>
                  <div className="txt group-hover:bottom-[25px] xl:group-hover:bottom-[-70px] transition-all duration-400 p-6 sm:p-8 w-[95%] absolute left-1/2 -translate-x-1/2 rounded-[22px] bg-white/10 backdrop-blur-md border sm:bottom-[-110px] border-white/20 shadow-xl bottom-[-90px] lg:bottom-[-180px] xl:bottom-[-170px]">
                    <b className="text-[18px] text-white">{c.title}</b>
                    <p className="text-[15px] text-white mt-2">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ 區塊（漸層主題的 Accordion） */}
          <section className="mx-auto max-w-[1200px] mt-[50px] lg:mt-[100px] xl:mt-[200px] pt-0 w-[80%]">
            <div className="max-w-[800px] mx-auto">
              <h2 className="text-white text-[32px] sm:text-[38px] text-center my-5 md:text-[45px] font-bold">
                {t("AccordionBonus.title")}
              </h2>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    q={faq.q}
                    a={faq.a}
                    isOpen={index === openIndex}
                    onToggle={() => handleToggle(index)}
                  />
                ))}
              </div>
            </div>
          </section>
        </LazyMotion>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW", ["common"])),
    },
    revalidate: 60,
  };
}
