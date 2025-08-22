import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Accordion from "../components/Accordion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import Head from "next/head";
gsap.registerPlugin(ScrollTrigger);

export default function QA() {
  const { t } = useTranslation("common");
  return (
    <div className="bg-[#f7f7f9] flex justify-center items-center flex-col py-20">
      <Head>
        <title>{t("qaSEO.title")}</title>
        <meta name="description" content={t("qaSEO.description")} />
      </Head>

      <section className="w-[90%] mx-auto text-gray-800">
        <Accordion />
      </section>
    </div>
  );
}

// ✅ 正確的 JavaScript 寫法（不要加型別）
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW", ["common"])),
    },
  };
}
