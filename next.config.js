const nextConfig = {
  reactStrictMode: false,
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
  async headers() {
    return [
      {
        source: "/posts",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Разрешить доступ со всех доменов
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
