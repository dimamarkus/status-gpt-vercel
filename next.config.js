/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    // Required:
    appDir: true,
  },
  images: {
    domains: ["localhost", "statusmoney.com", "cms.statusmoney.com", "ai.statusmoney.com"],
  },
};

module.exports = nextConfig;
