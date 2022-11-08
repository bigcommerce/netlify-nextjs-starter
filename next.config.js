const withTM = require('@vercel/examples-ui/transpile')();

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  images: {
    domains: ['images.contentstack.io', 'cdn11.bigcommerce.com'],
  },
});
