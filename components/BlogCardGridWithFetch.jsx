"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { usePathname } from "next/navigation";

export default function BlogCardGridWithFetch({
  apiUrl,
  tabs,
  defaultTab = "",
  onlyTabKey = "",
  hideTabsOnPaths = [], // 可選：外部加自訂隱藏路徑
}) {
  const { t, i18n } = useTranslation("common");
  const locale = i18n.language;
  const pathnameRaw = usePathname() || "";

  // --- 路徑判斷更穩健：移除常見語系前綴並轉小寫 ---
  const stripLocale = (p) =>
    p.replace(/^\/(zh(-tw)?|en|ja|ko|vi|th)(?=\/|$)/i, "");
  const pathname = stripLocale(pathnameRaw).toLowerCase();

  // 內建要隱藏 Tabs 的路徑樣式
  const defaultHidePatterns = [
    /\/slot(\/|$)/,
    /\/slots(\/|$)/,
    /\/slot-machine(\/|$)/,
    /\/slotmachine(\/|$)/, // ✅ 新增：支援 /SlotMachine/
    /\/老虎機(\/|$)/,
  ];
  // 允許從 props 傳入字串或正則，合併成判斷規則
  const extraPatterns = hideTabsOnPaths.map((p) =>
    p instanceof RegExp ? p : new RegExp(`${p.replace(/\/$/, "")}(\\/|$)`, "i")
  );
  const shouldHideTabs = [...defaultHidePatterns, ...extraPatterns].some((re) =>
    re.test(pathname)
  );

  const [activeTab, setActiveTab] = useState(
    defaultTab || Object.keys(tabs)[0]
  );
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ 決定要顯示哪些 Tabs（若限定單一 key）
  const shownTabs = onlyTabKey
    ? Object.entries(tabs).filter(([key]) => key === onlyTabKey)
    : Object.entries(tabs);

  useEffect(() => {
    if (!apiUrl || !locale) return;

    const fetchPosts = async () => {
      try {
        const res = await fetch(`${apiUrl}?per_page=100&_embed`);
        const data = await res.json();

        const filtered = (Array.isArray(data) ? data : [])
          .filter((post) => post?.acf?.lang === locale)
          .filter((post) => post?.acf?.related_keywords?.includes(activeTab));

        setPosts(filtered);
      } catch (err) {
        console.error("文章抓取失敗", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [apiUrl, locale, activeTab]);

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-1">
      {/* Tabs → 老虎機相關頁面不顯示 */}
      {!shouldHideTabs && (
        <div className="flex flex-wrap gap-2 mb-6">
          {shownTabs.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-full border text-sm md:text-base font-medium transition ${
                key === activeTab
                  ? "bg-white text-black"
                  : "bg-transparent border-white text-white hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Posts */}
      {loading ? (
        <div className="text-white py-10">{t("blogCardGrid.loading")}</div>
      ) : posts.length === 0 ? (
        <div className="text-white py-10">{t("blogCardGrid.noPosts")}</div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => {
            const featuredImage =
              post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

            return (
              <div
                key={post.id}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300 flex flex-col"
              >
                {featuredImage && (
                  <Link href={`/blog/${post.acf.acf_slug}`} locale={locale}>
                    <div className="aspect-[16/9] overflow-hidden">
                      <Image
                        src={featuredImage}
                        alt={post.title?.rendered || "post image"}
                        width={800}
                        height={450}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        placeholder="empty"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                )}
                <div className="flex flex-col justify-between flex-1 p-5">
                  <Link
                    href={`/blog/${post.acf.acf_slug}`}
                    locale={locale}
                    className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition"
                  >
                    <div className="min-h-[3rem] line-clamp-2">
                      {post.title?.rendered}
                    </div>
                  </Link>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                    {(() => {
                      const plainText =
                        post?.excerpt?.rendered?.replace(/<[^>]+>/g, "") ||
                        t("blogCardGrid.noExcerpt");

                      const isChinese = /[\u4e00-\u9fff]/.test(plainText);
                      const limit = isChinese ? 45 : 55;
                      const shouldTruncate = plainText.length > limit;
                      const displayedText = plainText.slice(0, limit);

                      return shouldTruncate ? (
                        <>
                          {displayedText}
                          {"... "}
                          <Link
                            href={`/blog/${post.acf.acf_slug}`}
                            locale={locale}
                            className="text-blue-500 hover:underline ml-1 inline-block"
                          >
                            {t("blogCardGrid.readMore")}
                          </Link>
                        </>
                      ) : (
                        plainText
                      );
                    })()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
