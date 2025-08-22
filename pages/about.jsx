"use client";

import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
export default function AboutPage() {
  const { t } = useTranslation("common");
  const [missionList, setMissionList] = useState([]);

  useEffect(() => {
    const list = t("About.mission.list", { returnObjects: true });
    if (Array.isArray(list)) {
      setMissionList(list);
    }
  }, [t]);

  return (
    <div class=" w-full ">
      <Head>
        <title>{t("aboutSEO.title")}</title>
        <meta name="description" content={t("aboutSEO.description")} />
      </Head>
      <div className="px-6 py-20  max-w-3xl mx-auto text-left">
        {/* Hero Title */}
        <h1 className="text-4xl  font-bold mb-16 text-center">
          {t("About.hero.title")}
        </h1>

        {/* 品牌藍圖 */}
        <div className="mb-24">
          <h2 className="text-2xl  font-semibold mb-6">
            {t("About.vision.title")}
          </h2>
          <p className="mb-4 text-gray-800 text-justify">
            {t("About.vision.paragraph1")}
          </p>
          <p className="text-justify text-gray-800">
            {t("About.vision.paragraph2")}
          </p>
        </div>

        {/* 品牌故事 */}
        <div className="mb-24">
          <h2 className="text-2xl   font-semibold mb-6">
            {t("About.story.title")}
          </h2>
          <p className="mb-4 text-gray-800 text-justify">
            {t("About.story.paragraph1")}
          </p>
          <p className="mb-4 text-gray-800 text-justify">
            {t("About.story.paragraph2")}
          </p>
          <p className="text-justify text-gray-800">
            {t("About.story.paragraph3")}
          </p>
        </div>

        {/* 品牌理念 */}
        <div className="mb-24">
          <h2 className="text-2xl  font-semibold mb-6">
            {t("About.mission.title")}
          </h2>
          <p className="mb-4 text-justify text-gray-800">
            {t("About.mission.p1")}
          </p>
          <p className="mb-4 text-justify text-gray-800">
            {t("About.mission.p2")}
          </p>
          <p className="mb-6 text-justify text-gray-800">
            {t("About.mission.p3")}
          </p>

          <h3 className="text-lg text-gray-800 font-bold mb-3">
            {t("About.mission.statement")}
          </h3>
          <ul className="list-disc list-inside mb-6 text-left">
            {missionList?.length > 0 ? (
              missionList.map((item, index) => (
                <li key={index} className="mb-2 text-gray-800">
                  {item}
                </li>
              ))
            ) : (
              <li className="text-red-500">未載入理念列表</li>
            )}
          </ul>

          <p className="text-justify text-gray-800">{t("About.mission.p4")}</p>
        </div>

        {/* CTA */}
        <div>
          <h2 className="text-2xl  font-semibold mb-6">
            {t("About.cta.title")}
          </h2>
          <p className="mb-4 text-justify text-gray-800">{t("About.cta.p1")}</p>
          <p className="text-justify text-gray-800">{t("About.cta.p2")}</p>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW", ["common"])),
    },
  };
}
