/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: [
      'spoonacular.com',
      'live.staticflickr.com',
      'lh3.googleusercontent.com',
      'www.canva.com',
    ],
  },
};

module.exports = nextConfig;
