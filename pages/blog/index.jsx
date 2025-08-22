// BlogIndex.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const TAB_LABELS = {
  "Slot Machine": "\u8001\u864e\u6a5f",
  poker: "\u5361\u724c\u904a\u6232",
  21: "21\u9ede",
  Roulette: "\u8f2a\u76e4",
};
const siteUrl = "https://99-u-01.vercel.app";
export default function BlogIndex({ posts }) {
  const { locale: routerLocale, asPath } = useRouter();
  const fullUrl = `${siteUrl}${asPath}`;
  const ogImage = `${siteUrl}/images/solt-machine/card-img01.png`;
  const { t } = useTranslation("common"); // 假設翻譯檔放在 common.json
  const TAB_KEYS = ["Slot Machine", "poker", "21", "Roulette", "casino"];

  const TAB_LABELS = {
    "Slot Machine": t("tab.slot"),
    poker: t("tab.poker"),
    21: t("tab.blackjack"),
    Roulette: t("tab.roulette"),
    casino: t("tab.casino"),
  };
  const { locale } = useRouter();
  const [activeTab, setActiveTab] = useState("Slot Machine");

  const categorizedPosts = Object.keys(TAB_LABELS).reduce((acc, key) => {
    acc[key] = posts.filter((post) =>
      post.acf?.related_keywords?.includes(key)
    );
    return acc;
  }, {});

  const hotPosts = [...posts]
    .filter((post) => post.acf?.lang === locale)
    .sort(
      (a, b) =>
        parseInt(b.post_views_count || "0") -
        parseInt(a.post_views_count || "0")
    )
    .slice(0, 4);

  return (
    <div className=" py-4 md:py-[60px] bg-gray-900 text-white px-4">
      <Head>
        {/* SEO Meta Tags */}
        <title>{t("blogSEO.title")}</title>
        <meta name="description" content={t("blogSEO.description")} />
        <meta name="keywords" content={t("blogSEO.keywords")} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={fullUrl} />
        <meta name="author" content="99U Entertainment" />
        <meta name="publisher" content="99U Entertainment" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={routerLocale} />

        <meta property="og:title" content={t("blogSEO.title")} />
        <meta property="og:description" content={t("blogSEO.description")} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:site_name" content={t("site.name")} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("blogSEO.title")} />
        <meta name="twitter:description" content={t("blogSEO.description")} />
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
      <div className="max-w-[1920px] w-[96%]  sm:w-[80%] mx-auto">
        <section className="section-hot-blog flex bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex-col shadow-md p-2 sm:p-8 my-10">
          <div className="title">
            <h2 className="text-3xl md:text-5xl text-center sm:text-left my-5 text-white">
              {t("hotArticles")}
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* 主打文章 */}
            {hotPosts[0] && (
              <Link
                href={`/blog/${hotPosts[0].acf?.acf_slug}`}
                className="left transition duration-300 group hover:bg-white rounded-[13px] w-full lg:w-1/2 overflow-hidden"
              >
                <div className="hot-hero-item p-2 flex flex-col h-full">
                  <Image
                    src={
                      hotPosts[0]._embedded?.["wp:featuredmedia"]?.[0]
                        ?.source_url || "/placeholder.jpg"
                    }
                    alt="hot-blog-hero-img"
                    width={1000}
                    height={700}
                    className="w-full object-cover rounded-xl"
                  />
                  <div className="info sm:p-6 p-2">
                    <div className="flex justify-between flex-wrap items-center">
                      <b className="text-white text-[14px] group-hover:text-black transition">
                        {t("updatedAt")}：
                      </b>
                      <div className="tag py-3">
                        <span className="bg-[#ff3923] group-hover:text-black transition duration-300 text-white text-[13px] rounded-[20px] px-4 py-2">
                          {hotPosts[0].acf?.related_keywords?.[0] || "熱門"}
                        </span>
                      </div>
                    </div>
                    <div className="description mt-2">
                      <h2 className="text-white text-[18px] sm:text-[22px] group-hover:text-black transition duration-300 font-bold">
                        {hotPosts[0].title.rendered}
                      </h2>
                      <p className="text-gray-200 font-normal group-hover:text-gray-700 transition duration-300 text-[14px]">
                        {hotPosts[0].excerpt?.rendered
                          ?.replace(/<[^>]+>/g, "")
                          ?.slice(0, 100) || "這篇文章沒有摘要內容"}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* 熱門文章列表 */}
            <div className="right w-full lg:w-1/2 px-0 lg:px-8">
              <div className="hot-blog flex flex-col">
                {hotPosts.slice(1).map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.acf?.acf_slug}`}
                    className="item hover:bg-white p-2 group rounded-[10px] transition duration-300 flex flex-col sm:flex-row mb-4 gap-4"
                  >
                    <div className="right w-full sm:w-1/3">
                      <Image
                        src={
                          post._embedded?.["wp:featuredmedia"]?.[0]
                            ?.source_url || "/placeholder.jpg"
                        }
                        alt="hot-blog-img"
                        width={400}
                        height={300}
                        className="w-full aspect-[4/3] object-cover rounded-[9px]"
                      />
                    </div>
                    <div className="left w-full sm:w-2/3">
                      <div className="txt px-2 sm:px-8">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {[]
                            .concat(post.acf?.related_keywords || [])
                            .map((tag, idx) => (
                              <span
                                key={idx}
                                className="rounded-[14px] font-bold mr-3 py-1 text-[14px] text-[#ff3826]"
                              >
                                {tag}
                              </span>
                            ))}
                        </div>
                        <h2 className="text-[18px] group-hover:text-black transition duration-300 font-bold text-white">
                          {post.title.rendered}
                        </h2>
                        <p className="text-[12px] transition duration-300 group-hover:text-gray-700 text-gray-100">
                          {post.excerpt?.rendered
                            ?.replace(/<[^>]+>/g, "")
                            ?.slice(0, 100) || "這篇文章沒有摘要內容"}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {TAB_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={` px-1 sm:px-6 w-[140px] py-2 rounded-full font-semibold transition ${
                activeTab === key
                  ? "bg-white text-black"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {t(`tab.${key}`)}
            </button>
          ))}
        </div>

        {/* 文章列表 */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categorizedPosts[activeTab]?.map((post) => {
            const featuredImage =
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

            return (
              <div
                key={post.id}
                className="bg-gray-800 border border-[#877b7b] rounded-xl max-w-[400px] overflow-hidden shadow hover:shadow-lg transition duration-300"
              >
                {featuredImage && (
                  <Link href={`/blog/${post.acf.acf_slug}`} locale={locale}>
                    <Image
                      src={featuredImage}
                      alt={post.title.rendered}
                      width={800}
                      height={500}
                      className="w-full aspect-[16/9] object-cover"
                    />
                  </Link>
                )}

                <div className="p-5">
                  <Link
                    href={`/blog/${post.acf.acf_slug}`}
                    locale={locale}
                    className="text-xl font-semibold hover:text-blue-400 transition"
                  >
                    {post.title.rendered}
                  </Link>
                  <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                    {post.excerpt?.rendered
                      ?.replace(/<[^>]+>/g, "")
                      ?.slice(0, 100) || "這篇文章沒有摘要內容"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  const res = await fetch(
    `https://wordpress-861686-5705144.cloudwaysapps.com/wp-json/wp/v2/posts?per_page=100&_embed`
  );
  const allPosts = await res.json();

  const posts = allPosts.filter((post) => post.acf?.lang === locale);

  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60,
  };
}
