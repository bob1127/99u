// next.config.js
const path = require("path");
const { i18n } = require("./next-i18next.config");

module.exports = {
  // 多語系由 next-i18next.config.js 統一管理
  i18n,

  // Netlify 上用 Next Image（已升到 13.5+ 並裝了 @netlify/plugin-nextjs）
  images: {
    // domains 可留也可拿掉；remotePatterns 已能涵蓋
    domains: ["wordpress-861686-5705144.cloudwaysapps.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dyx.wxv.mybluehost.me",
        pathname: "/website_a8bfc44c/wp-content/uploads/**",
      },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
      { protocol: "https", hostname: "i0.wp.com", pathname: "/**" },
      { protocol: "https", hostname: "i.ibb.co", pathname: "/**" },
    ],
    // 讓產生的格式更優（可選）
    formats: ["image/avif", "image/webp"],
  },

  // ⚠️ 若你曾遇到語言路由 404/重導怪異，先把 trailingSlash 關掉較穩
  // （Netlify 對有無斜線很敏感，i18n + 斜線有時會多一層 301）
  trailingSlash: false,

  // 只在本機熱更新需要，部署環境不會用到；留著也無妨
  webpackDevMiddleware: (config) => {
    config.watchOptions = { poll: 1000, aggregateTimeout: 300 };
    return config;
  },

  sassOptions: { includePaths: [path.join(__dirname, "styles")] },

  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs)$/,
      use: ["babel-loader", "babel-plugin-glsl"],
    });
    return config;
  },
};
