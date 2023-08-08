const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Здесь настраиваем проксирование для Google OAuth
    if (req.url.startsWith("/auth/google")) {
      const proxy = createProxyMiddleware({
        target: "https://accounts.google.com", // Целевой сервер (Google OAuth API)
        changeOrigin: true,
        // Другие параметры настройки, если необходимо
      });

      proxy(req, res);
    } else {
      // Обработка запросов Next.js
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
