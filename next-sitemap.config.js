// next-sitemap.config.js
require('dotenv').config();

/** 你的網站主網址（改成你要的主域） */
const SITE_URL = process.env.SITE_URL || 'https://www.99ubit.bet';

/** WP REST API base（用你提供的雲端位址） */
const WP_BASE =
  process.env.WP_API_BASE_URL ||
  process.env.NEXT_PUBLIC_WP_API_BASE_URL ||
  'https://wordpress-861686-5705144.cloudwaysapps.com';

async function fetchAll(endpoint, perPage = 100) {
  const out = [];
  let page = 1;
  // 取 slug & modified 以縮小 payload
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

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/api/*', '/404', '/500'],
  // 和你的 next.config.js 保持一致（你目前是 false）
  trailingSlash: false,

  // 可自訂優先權/更新頻率
  transform: async (config, path) => ({
    loc: path,
    changefreq: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1.0 : 0.7,
    lastmod: new Date().toISOString(),
  }),

  /** 這裡把 WP 的內容路由加進 sitemap */
  additionalPaths: async (config) => {
    const extra = [];

    // 1) WP 文章 → 你網站的實際路由（請依你的站改 '/blog/[slug]' 或其他）
    const posts = await fetchAll('posts');
    for (const p of posts) {
      extra.push({
        loc: `/blog/${p.slug}`, // ← 若你的文章路由不同，改這裡
        lastmod: p.modified || new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      });
    }

    // 2) WP Pages（若有對應前端頁面，以 /[slug] 呈現可保留；沒有就刪掉這段）
    const pages = await fetchAll('pages');
    for (const pg of pages) {
      // 常見首頁/特殊頁 slug 可能是 'home' 等，可在這裡過濾
      if (pg.slug && pg.slug !== 'home') {
        extra.push({
          loc: `/${pg.slug}`,
          lastmod: pg.modified || new Date().toISOString(),
          changefreq: 'monthly',
          priority: 0.6,
        });
      }
    }

    return extra;
  },
};
