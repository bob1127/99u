const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW', 'zh-CN', 'vi', 'th', 'en'],
  },
  localePath: path.resolve('./public/locales'), // ✅ 明確指定路徑
};
