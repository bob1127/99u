const path = require("path");
const { i18n } = require("./next-i18next.config"); // ✅ 多語系設定

module.exports = {
  i18n, // ✅ 啟用多語系
  images: {
    domains: ['wordpress-861686-5705144.cloudwaysapps.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dyx.wxv.mybluehost.me",
        pathname: "/website_a8bfc44c/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co", // ✅ 新增這一行
        pathname: "/**",
      },
    ],
  },
  trailingSlash: true,
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs)$/,
      use: ["babel-loader", "babel-plugin-glsl"],
    });
    return config;
  },
};
