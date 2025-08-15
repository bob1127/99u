"use client";

import Link from "next/link";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  FaGlobe,
  FaChevronDown,
  FaInfoCircle,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const locales = [
  { code: "zh-TW", label: "繁體中文" },
  { code: "zh-CN", label: "简体中文" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "th", label: "ภาษาไทย" },
  { code: "en", label: "English" },
];

export default function Navbar() {
  const { t } = useTranslation("common");
  const menuItems = [
    { title: t("navbar.home"), href: "/" },
    { title: t("navbar.slots"), href: "/SlotMachine" },
    { title: t("navbar.bonus"), href: "/bonus" },
    { title: t("navbar.tableGames"), href: "/online-game" },
    { title: t("navbar.blog"), href: "/blog" },
    { title: t("navbar.about"), href: "/about" },
  ];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { locale: currentLocale, pathname, query, asPath } = router;

  const handleLanguageChange = async (targetLocale: string) => {
    setLangOpen(false);
    setMobileMenuOpen(false);

    // 如果語系沒變就不動作
    if (targetLocale === currentLocale) return;

    // 檢查是否為文章頁：/[lang]/blog/[slug]
    const pathParts = asPath.split("/").filter(Boolean); // e.g., ['vi', 'blog', 'trx-coin']
    const isBlogPage = pathParts.length === 3 && pathParts[1] === "blog";

    if (isBlogPage) {
      const currentSlug = pathParts[2]; // e.g., 'trx-coin'

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_WP_API_BASE_URL}/wp-json/wp/v2/posts?acf_slug=${currentSlug}&acf_lang=${targetLocale}`
        );
        const posts = await res.json();

        if (posts.length > 0) {
          const newSlug = posts[0].slug;

          // 預設語言（zh-TW）不需要語系前綴
          const isDefault = targetLocale === "zh-TW";
          const href = isDefault
            ? `/blog/${newSlug}`
            : `/${targetLocale}/blog/${newSlug}`;

          router.push(href);
        } else {
          console.warn("❗ 未找到對應語系文章，跳回首頁");
          const fallbackPath =
            targetLocale === "zh-TW" ? "/" : `/${targetLocale}`;
          router.push(fallbackPath);
        }
      } catch (error) {
        console.error("語系切換錯誤：", error);
      }
    } else {
      // 非文章頁 → 正常切語系（維持目前路徑但加上 locale）
      router.push({ pathname, query }, asPath, {
        locale: targetLocale,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-[9999999] backdrop-blur-md bg-black/20 text-white shadow-md">
      <div className="max-w-[1440px] mx-auto px-6 py-3 flex items-center justify-between relative">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Image
              src="/images/logo/99u_logo.webp"
              alt="Logo"
              width={120}
              height={40}
              className="w-[90px]"
              priority
            />
          </Link>
        </div>

        {/* 中間選單 (桌面版) */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center space-x-6">
          {menuItems.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`text-sm transition duration-200 ${
                hoveredIndex === index ? "text-pink-400" : "text-white"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* 右側 ICON + CTA (桌面版) */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((prev) => !prev)}
              className="flex items-center space-x-1 text-white hover:text-pink-400 transition"
            >
              <FaGlobe size={18} />
              <FaChevronDown size={12} />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg overflow-hidden z-50"
                >
                  {locales.map(({ code, label }) => (
                    <li
                      key={code}
                      className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${
                        code === currentLocale
                          ? "bg-gray-100 font-semibold"
                          : ""
                      }`}
                      onClick={() => handleLanguageChange(code)}
                    >
                      {label}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <Link href="https://www.99ubit.com/#/?superid=eric60">
            {" "}
            <FaUserCircle
              className="text-white hover:text-pink-400 cursor-pointer"
              size={18}
            />
          </Link>

          <span className="text-pink-500 text-sm font-medium">
            {locales.find((loc) => loc.code === currentLocale)?.label ||
              "繁體中文"}
          </span>

          <Link
            href="https://www.99ubit.com/#/?superid=eric60"
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:opacity-90"
          >
            {t("navbar.register")}
          </Link>
        </div>

        {/* 手機版漢堡選單 */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <FaTimes size={24} className="text-white" />
            ) : (
              <FaBars size={24} className="text-white" />
            )}
          </button>
        </div>

        {/* 手機版選單內容 */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, originX: 1, originY: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="absolute top-[50px] w-[95%] right-3 z-[9999999] rounded-[20px] bg-slate-100 text-white px-6 py-4 flex flex-col space-y-4 md:hidden"
            >
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-900 text-base"
                >
                  {item.title}
                </Link>
              ))}

              <hr className="border-gray-700" />
              {locales.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  className={`text-left ${
                    code === currentLocale
                      ? "text-pink-400 font-bold"
                      : "text-gray-800"
                  }`}
                >
                  {label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
