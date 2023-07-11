/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["uk", "en", "ru"],
    defaultLocale: "uk",
  },
  images: {
    domains: [
      "fakestoreapi.com",
      "cdn-icons-png.flaticon.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "ldsound.info",
    ],
  },
};
// next.config.js

module.exports = nextConfig;
