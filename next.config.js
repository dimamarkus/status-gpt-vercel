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
    // experimentalReact: true,
    serverActions: true,
    appDir: true, // Required:
  },
  images: {
    domains: [
      "localhost",
      "statusmoney.com",
      "cms.statusmoney.com",
      "ai.statusmoney.com",
      "brainaics.com",
      "cms.brainaics.com",
      "strapi-jfh.s3.amazonaws.com",
      "strapi-acrew.s3.amazonaws.com",
      "strapi-harvard.s3.amazonaws.com",
      process.env.STRAPI_S3_BUCKET_URL,
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
