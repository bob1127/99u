// next-sitemap.config.js
require('dotenv').config();

/** 你的網站主網址（改成你要的主域） */
const SITE_URL = process.env.SITE_URL || 'https://www.99ubit.bet';

/** WP REST API base（用你提供的雲端位址） */
const WP_BASE =
  process.env.WP_API_BASE_URL ||
  process.env.NEXT_PUBLIC_WP_API_BASE_URL ||
  'https://wordpress-861686-5705144.cloudwaysapps.com';

/** ---- 小工具：抓取與日期正規化 ---- */
async function fetchAll(endpoint, perPage = 100) {
  const out = [];
  let page = 1;
  while (true) {
    const url = `${WP_BASE}/wp-json/wp/v2/${endpoint}?per_page=${perPage}&page=${page}&_fields=slug,modified`;
    const res = await fetch(url);
    if (!res.ok) break;
    const items = await res.json();
    out.push(...items);
    if (items.length < perPage) break;
    page++;
  }
  return out;
}

/** 轉成 YYYY-MM-DD（UTC）——最不出錯的格式 */
function toDateOnlyUTC(d) {
  if (!d) return undefined;
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return undefined;
  const yyyy = dt.getUTCFullYear();
  const mm = String(dt.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(dt.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/api/*', '/404', '/500'],
  trailingSlash: false,

  // 統一輸出「純日期」避免毫秒/時區問題
  transform: async (config, path) => ({
    loc: path,
    changefreq: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1.0 : 0.7,
    lastmod: toDateOnlyUTC(new Date()), // ← 這裡不再用 .toISOString()
  }),

  /** 把 WP 內容路由加進 sitemap（lastmod 也正規化） */
  additionalPaths: async (config) => {
    const extra = [];

    // 1) WP 文章 => 你站上的文章路由
    const posts = await fetchAll('posts');
    for (const p of posts) {
      extra.push({
        loc: `/blog/${p.slug}`,          // ← 若你的文章路由不同，改這裡
        lastmod: toDateOnlyUTC(p.modified) || toDateOnlyUTC(new Date()),
        changefreq: 'weekly',
        priority: 0.7,
      });
    }

    // 2) WP Pages（如果你真的有對應的頁面才保留）
    const pages = await fetchAll('pages');
    for (const pg of pages) {
      if (pg.slug && pg.slug !== 'home') {
        extra.push({
          loc: `/${pg.slug}`,
          lastmod: toDateOnlyUTC(pg.modified) || toDateOnlyUTC(new Date()),
          changefreq: 'monthly',
          priority: 0.6,
        });
      }
    }

    return extra;
  },
};
