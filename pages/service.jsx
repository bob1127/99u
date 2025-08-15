"use client";

import { useTranslation } from "next-i18next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW", ["common"])),
    },
  };
}

export default function AboutPage() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("About.hero.title")}</title>
        <meta name="description" content={t("About.cta.p1")} />
      </Head>

      <div className="px-6 py-20 max-w-4xl mx-auto text-left text-gray-800 space-y-12">
        {/* Hero Title */}
        <h1 className="text-4xl font-bold">{t("About.hero.title")}</h1>

        {/* Vision */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{t("About.vision.title")}</h2>
          <p>{t("About.vision.paragraph1")}</p>
          <p>{t("About.vision.paragraph2")}</p>
        </div>

        {/* Story */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{t("About.story.title")}</h2>
          <p>{t("About.story.paragraph1")}</p>
          <p>{t("About.story.paragraph2")}</p>
          <p>{t("About.story.paragraph3")}</p>
        </div>

        {/* Mission */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{t("About.mission.title")}</h2>
          <p>{t("About.mission.p1")}</p>
          <p>{t("About.mission.p2")}</p>
          <p>{t("About.mission.p3")}</p>

          <h3 className="text-lg font-bold">{t("About.mission.statement")}</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>{t("About.mission.list.0")}</li>
            <li>{t("About.mission.list.1")}</li>
            <li>{t("About.mission.list.2")}</li>
          </ul>

          <p>{t("About.mission.p4")}</p>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{t("About.cta.title")}</h2>
          <p>{t("About.cta.p1")}</p>
          <p>{t("About.cta.p2")}</p>
        </div>
      </div>
    </>
  );
}
