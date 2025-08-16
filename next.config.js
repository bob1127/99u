// next.config.js
const path = require("path");
const { i18n } = require("./next-i18next.config");

module.exports = {
  // ✅ 多語系設定
  i18n,

  // ✅ 先暫時關閉圖片最佳化，避免 Netlify /ipx 500
  images: {
    unoptimized: true, // ← 先救站；等一切正常後可移除此行
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dyx.wxv.mybluehost.me",
        pathname: "/website_a8bfc44c/wp-content/uploads/**",
      },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
      { protocol: "https", hostname: "i0.wp.com", pathname: "/**" },
      { protocol: "https", hostname: "i.ibb.co", pathname: "/**" },
      {
        protocol: "https",
        hostname: "wordpress-861686-5705144.cloudwaysapps.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // ✅ 先關掉，避免 i18n + 斜線造成額外 301/404
  trailingSlash: false,

  // 開發時的 HMR 較穩定
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
