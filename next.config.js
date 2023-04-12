const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    // Required:
    appDir: true,
  },
  images: {
    domains: [
      "localhost",
      "statusmoney.com",
      "cms.statusmoney.com",
      "ai.statusmoney.com",
      "statusmoney-cms.s3.us-west-2.amazonaws.com",
    ],
  },
  webpack(config, { isServer, dev }) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },
});

module.exports = nextConfig;
