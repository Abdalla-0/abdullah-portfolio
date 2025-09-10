import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = withNextIntl({
  images: {
    remotePatterns: [
      { protocol: "https", pathname: "**", hostname: "res.cloudinary.com" },
      { protocol: "http", pathname: "**", hostname: "res.cloudinary.com" },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
});

export default nextConfig;
