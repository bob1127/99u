import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Accordion from "../components/Accordion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function QA() {
  return (
    <div className="bg-[#f7f7f9] flex justify-center items-center flex-col py-20">
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
