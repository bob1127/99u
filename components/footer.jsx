"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white z-[9999999] relative text-sm text-gray-600 border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* 公司資訊 */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-black text-xl font-bold">
            <Image
              alt="footer-logo"
              placeholder="empty"
              loading="lazy"
              width={300}
              height={100}
              className="max-w-[100px]"
              src="/images/logo/99u_logo.webp"
            />
          </Link>
          <p>{t("footerSection.desc")}</p>
          <div className="flex gap-3 mt-2">
            <Image
              alt="footer-icon1"
              placeholder="empty"
              loading="lazy"
              width={30}
              height={30}
              src="/images/footer/icon1.webp"
            />
            <div className="bg-black">
              <Image
                alt="footer-icon2"
                placeholder="empty"
                loading="lazy"
                width={30}
                height={30}
                src="/images/footer/icon2.webp"
              />
            </div>
            <Image
              alt="footer-icon3"
              placeholder="empty"
              loading="lazy"
              width={50}
              height={50}
              src="/images/footer/icon3.webp"
            />
          </div>
        </div>

        {/* 熱門遊戲 */}
        <div>
          <h3 className="text-black font-semibold mb-3">
            {t("footerSection.title1")}
          </h3>
          <ul className="space-y-2">
            <li>
              <p href="#">{t("footerSection.game.slot")}</p>
            </li>
            <li>
              <p href="#">{t("footerSection.game.baccarat")}</p>
            </li>
            <li>
              <p href="#">{t("footerSection.game.sports")}</p>
            </li>
            <li>
              <p href="#">{t("footerSection.game.fish")}</p>
            </li>
            <li>
              <p href="#">{t("footerSection.game.poker")}</p>
            </li>
          </ul>
        </div>

        {/* 社群入口 */}
        <div>
          <h3 className="text-black font-semibold mb-3">
            {t("footerSection.title2")}
          </h3>
          <ul className="space-y-2">
            <li>
              <p href="#">Facebook</p>
            </li>
            <li>
              <p href="#">Youtube</p>
            </li>
            <li>
              <p href="#">Twitter</p>
            </li>
            <li>
              <p href="#">Instagram</p>
            </li>
          </ul>
        </div>

        {/* 更多資訊 */}
        <div>
          <h3 className="text-black font-semibold mb-3">
            {t("footerSection.title3")}
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about">{t("footerSection.about")}</Link>
            </li>
            <li>
              <Link href="/policy">{t("footerSection.privacy")}</Link>
            </li>
            <li>
              <Link href="/service">{t("footerSection.terms")}</Link>
            </li>
            <li>
              <Link href="/qa">{t("footerSection.faq")}</Link>
            </li>
            <li>
              <Link href="/cassino">{t("footerSection.responsible")}</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* 底部 */}
      <div className="border-t border-gray-200 py-6 text-center text-gray-500 text-xs">
        <div className="flex flex-col lg:flex-row justify-between items-center max-w-[1400px] mx-auto px-6 gap-4">
          <div className="flex gap-3">
            {["BCH", "BTC", "USDT", "XRP", "TRX"].map((coin) => (
              <Image
                key={coin}
                alt={`footer-${coin}`}
                placeholder="empty"
                loading="lazy"
                width={30}
                height={30}
                src={`/images/footer/${coin}.webp`}
              />
            ))}
          </div>
          <div>
            © 2025 LUCKY Entertainment Co. All Rights Reserved.｜
            {t("footerSection.contact")}：
            <a
              href="mailto:support@luckycasino.com"
              className="text-blue-600 hover:underline ml-1"
            >
              support@luckycasino.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
