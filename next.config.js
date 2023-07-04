/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "fakestoreapi.com",
      "cdn-icons-png.flaticon.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
    ],
  },
};
// next.config.js

module.exports = nextConfig;
