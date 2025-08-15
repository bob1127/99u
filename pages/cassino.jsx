"use client";

import { useTranslation } from "next-i18next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW", ["common"])),
    },
  };
}

export default function CasinoPage() {
  const { t } = useTranslation("common");

  const section1List = t("Casino.section1.list", { returnObjects: true });
  const section2List = t("Casino.section2.list", { returnObjects: true });

  return (
    <>
      <Head>
        <title>{t("Casino.title")}</title>
        <meta name="description" content={t("Casino.meta.description")} />
      </Head>

      <div className="px-6 py-20 max-w-4xl mx-auto text-left text-gray-800 space-y-12">
        {/* Hero Title */}
        <h1 className="text-4xl font-bold">{t("Casino.title")}</h1>

        {/* Intro */}
        <p className="leading-relaxed">{t("Casino.intro")}</p>

        {/* Section 1 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {t("Casino.section1.title")}
          </h2>
          <p>{t("Casino.section1.intro")}</p>
          <ul className="list-disc list-inside space-y-1">
            {Array.isArray(section1List) &&
              section1List.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {t("Casino.section2.title")}
          </h2>
          <p>{t("Casino.section2.intro")}</p>
          <ul className="list-disc list-inside space-y-1">
            {Array.isArray(section2List) &&
              section2List.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div>

        {/* Section 3 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {t("Casino.section3.title")}
          </h2>
          <p>{t("Casino.section3.p1")}</p>
          <p>
            {t("Casino.section3.p2")}
            <br />
            <a
              href="https://www.cyberpatrol.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {t("Casino.section3.linkText")}
            </a>
          </p>
        </div>

        {/* Conclusion */}
        <div>
          <p className="leading-relaxed">{t("Casino.conclusion")}</p>
        </div>
      </div>
    </>
  );
}
