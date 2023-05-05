/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'spoonacular.com',
      'live.staticflickr.com',
      'lh3.googleusercontent.com',
    ],
  },
};

module.exports = nextConfig;
