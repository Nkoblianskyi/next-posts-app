import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/next-posts-app',
  assetPrefix: '/next-posts-app/',
  images: {
    domains: ['api.qumiqo.com'],
  },
};

export default nextConfig;
