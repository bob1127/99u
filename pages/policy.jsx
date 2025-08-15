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

export default function PolicyPage() {
  const { t } = useTranslation("common");

  const sectionKeys = [
    "section1",
    "section2",
    "section3",
    "section4",
    "section5",
  ];

  return (
    <>
      <Head>
        <title>{t("Policy.meta.title")}</title>
        <meta name="description" content={t("Policy.meta.description")} />
      </Head>

      <div className="bg-[#f7f7f9] flex justify-center items-center flex-col py-20">
        <section className="max-w-4xl mx-auto px-4 text-gray-800">
          <div className="py-16">
            <h1 className="text-3xl font-bold mb-8">{t("Policy.title")}</h1>
            <p className="mb-8 leading-relaxed">{t("Policy.intro")}</p>

            {sectionKeys.map((key) => {
              const title = t(`Policy.${key}.title`);
              const list = t(`Policy.${key}.list`, { returnObjects: true });
              const sublist = t(`Policy.${key}.sublist`, {
                returnObjects: true,
              });
              const note = t(`Policy.${key}.note`);

              return (
                <div className="mb-10" key={key}>
                  <h2 className="text-2xl font-semibold mb-3">{title}</h2>

                  {Array.isArray(list) &&
                    list.map((item, index) => (
                      <p key={index} className="mb-2 leading-relaxed">
                        {item}
                      </p>
                    ))}

                  {Array.isArray(sublist) && sublist.length > 0 && (
                    <ul className="list-disc list-inside pl-4 mb-2 space-y-1">
                      {sublist.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {note && (
                    <p className="mt-2 text-sm text-gray-600 italic">{note}</p>
                  )}
                </div>
              );
            })}

            <p className="mt-12 text-gray-700">{t("Policy.note")}</p>
          </div>
        </section>
      </div>
    </>
  );
}
