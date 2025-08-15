import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { format } from "date-fns";
import zhTW from "date-fns/locale/zh-TW";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// === 常數：你的 WordPress 網域 ===
const WP_BASE = "https://wordpress-861686-5705144.cloudwaysapps.com";
// 若你想把 og:url 指向前端站台，改成你的前端域名即可
const SITE_ORIGIN = "https://wordpress-861686-5705144.cloudwaysapps.com";

export default function BlogPost({ post, relatedPosts }) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const postsPerPage = 3;
  const maxPage = Math.ceil((relatedPosts?.length || 0) / postsPerPage);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto py-10 text-center text-red-400">
        找不到此語系對應的文章
      </div>
    );
  }

  // ===== SEO：從 ACF → Yoast → 預設 =====
  const stripHtml = (html) => (html || "").replace(/<[^>]+>/g, "").trim();

  const seoTitle =
    post?.acf?.seo_title ||
    post?.yoast_head_json?.title ||
    post?.title?.rendered ||
    "文章標題";

  const seoDescription =
    post?.acf?.seo_description ||
    post?.yoast_head_json?.description ||
    stripHtml(post?.content)?.slice(0, 160) ||
    seoTitle;

  const keywordsStr = (post?.acf?.seo_keywords || "")
    .split(/[,，;；\n]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 10)
    .join(", ");

  const ogImage =
    post?.acf?.seo_og_image?.sizes?.medium_large ||
    post?.acf?.seo_og_image?.url ||
    post?.yoast_head_json?.og_image?.[0]?.url ||
    `${SITE_ORIGIN}/logo.png`;

  const url = `${SITE_ORIGIN}${router.asPath}`;
  const publishedAt = post.date || new Date().toISOString();
  const modifiedAt = post.modified || publishedAt;

  // ===== 顯示用 =====
  const displayTitle = post?.title?.rendered || seoTitle;
  const descriptionForCard =
    stripHtml(post?.content)?.slice(0, 160) || seoDescription;

  const formattedDate = format(new Date(modifiedAt), "yyyy年M月d日", {
    locale: zhTW,
  });

  const tags = post._embedded?.["wp:term"]?.[1] || [];

  const paginatedPosts = relatedPosts?.slice(
    page * postsPerPage,
    (page + 1) * postsPerPage
  );

  // ===== 觀看數：30 分鐘內只觸發一次 =====
  useEffect(() => {
    if (!post?.id) return;
    const key = `viewed_post_${post.id}`;
    const lastViewed = localStorage.getItem(key);
    const now = Date.now();

    if (lastViewed && now - parseInt(lastViewed, 10) < 30 * 60 * 1000) return;

    localStorage.setItem(key, now.toString());
    fetch(`${WP_BASE}/wp-json/custom/v1/increase-views/${post.id}`, {
      method: "POST",
    }).catch(() => {});
  }, [post?.id]);

  return (
    <div className="bg-gray-900 text-white px-1 sm:px-4">
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        {keywordsStr && <meta name="keywords" content={keywordsStr} />}

        <meta property="og:type" content="article" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="你的網站名稱" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={ogImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: seoTitle,
              datePublished: publishedAt,
              dateModified: modifiedAt,
              author: { "@type": "Person", name: "網站作者名稱" },
              publisher: {
                "@type": "Organization",
                name: "你的網站名稱",
                logo: {
                  "@type": "ImageObject",
                  url: `${SITE_ORIGIN}/logo.png`,
                },
              },
              description: seoDescription,
              mainEntityOfPage: { "@type": "WebPage", "@id": url },
            }),
          }}
        />
      </Head>

      {/* 背景動畫 */}
      <div className="fixed inset-0 z-0 blur-[100px]">
        <div className="absolute inset-0 m-auto w-screen h-screen min-w-[1000px] rounded-full overflow-hidden bg-black scale-[0.8]">
          <div
            className="absolute inset-0 w-screen h-screen m-auto animate-spinBlob"
            style={{
              background:
                "conic-gradient(from 0deg, #0a0a0a, #1a1a2e, #1f2937, #6366f1, #1e40af, #3b82f6, #1a1a2e, #0a0a0a)",
            }}
          />
        </div>
      </div>

      {/* 主內容區塊 */}
      <main className="py-[100px] blog-content lg:flex-row flex-col max-w-[1920px] w-[95%] xl:w-[80%] relative z-50 mx-auto flex gap-10">
        {/* 主文章 */}
        <div className="main-article w-full lg:w-[65%] pr-0 lg:pr-2">
          <h1
            className="text-3xl lg:text-4xl font-bold mb-4"
            dangerouslySetInnerHTML={{ __html: displayTitle }}
          />
          <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
            <span>最後修改：{formattedDate}</span>
            <span className="flex items-center gap-1">
              觀看文章人數：{post?.post_views_count || 0}
            </span>
          </div>

          {tags.length > 0 && (
            <div className="text-sm text-blue-300 mb-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-blue-700 px-2 py-1 rounded-full text-xs"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          <div
            className="prose bg-white sm:px-10 px-5 xl:px-20 py-8 prose-invert max-w-none prose-img:rounded-lg prose-img:my-6"
            dangerouslySetInnerHTML={{
              __html: post.content || "<p>內文載入失敗</p>",
            }}
          />
        </div>

        {/* 推薦文章 Sticky 區塊 */}
        {Array.isArray(relatedPosts) && relatedPosts.length > 0 && (
          <div className="others-article w-[100%] lg:w-[35%] bg-white p-8 lg:flex flex-col gap-6 sticky top-24 self-start">
            <h2 className="text-xl text-center mb-5 lg:text-left font-semibold ">
              猜你還會喜歡
            </h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                {paginatedPosts.map((item) => {
                  const img =
                    item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                    "/default.jpg";
                  const date = format(new Date(item.modified), "yyyy年M月d日", {
                    locale: zhTW,
                  });
                  return (
                    <Link
                      href={`/${router.locale}/blog/${item.acf?.acf_slug}`}
                      key={item.id}
                      className="backdrop-blur-lg lg:w-full sm:w-[80%] mx-auto border border-black/10 rounded-xl hover:shadow-2xl overflow-hidden transition hover:scale-[1.02]"
                    >
                      <div className="flex">
                        <img
                          src={img}
                          alt={item.title.rendered}
                          className="w-1/2 h-[180px] object-cover flex-shrink-0"
                        />
                        <div className="p-3">
                          <h3
                            className="!text-[18px] font-semibold line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: item.title.rendered,
                            }}
                          />
                          <p className="text-xs text-gray-400 mt-1">{date}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* 分頁按鈕 */}
            {maxPage > 1 && (
              <div className="flex items-center justify-center gap-4 mt-4">
                <button
                  onClick={() => setPage((p) => (p - 1 + maxPage) % maxPage)}
                  className="text-sm text-gray-900 px-3 py-1 rounded bg-black/10 hover:bg-black/20"
                >
                  ← 上一頁
                </button>
                <span className="text-xs text-gray-900">{`第 ${
                  page + 1
                } 頁 / 共 ${maxPage} 頁`}</span>
                <button
                  onClick={() => setPage((p) => (p + 1) % maxPage)}
                  className="text-sm text-gray-900 px-3 py-1 rounded bg-black/10 hover:bg黑/20"
                >
                  下一頁 →
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps({ params, locale }) {
  // 取得單篇（含 ACF，自訂端點）
  const slugRes = await fetch(
    `${WP_BASE}/wp-json/custom/v1/posts-by-acf-slug?acf_slug=${params.slug}&lang=${locale}&_embed`
  );
  const postData = await slugRes.json();
  const post = postData?.[0] || null;

  // 🔁 補抓 post_views_count + yoast_head_json（一次拿）
  if (post?.id) {
    const detailsRes = await fetch(
      `${WP_BASE}/wp-json/wp/v2/posts/${post.id}?_fields=post_views_count,yoast_head_json`
    );
    const details = await detailsRes.json();
    post.post_views_count = parseInt(details.post_views_count || "0", 10);
    post.yoast_head_json = details.yoast_head_json || null;
  }

  // 相關文章
  let relatedPosts = [];
  if (post) {
    const relRes = await fetch(
      `${WP_BASE}/wp-json/wp/v2/posts?per_page=6&orderby=modified&order=desc&_embed&acf.lang=${locale}&exclude=${post.id}`
    );
    relatedPosts = await relRes.json();
  }

  return {
    props: {
      post,
      relatedPosts,
      ...(await serverSideTranslations(locale ?? "zh-TW", ["common"])),
    },
    revalidate: 60,
  };
}

export async function getStaticPaths({ locales }) {
  const res = await fetch(
    `${WP_BASE}/wp-json/wp/v2/posts?per_page=100&_fields=acf`
  );
  const posts = await res.json();

  const paths = [];
  for (const locale of locales) {
    posts.forEach((post) => {
      if (post.acf?.acf_slug && post.acf?.lang === locale) {
        paths.push({ params: { slug: post.acf.acf_slug }, locale });
      }
    });
  }

  return { paths, fallback: "blocking" };
}
