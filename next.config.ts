import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        pathname: '/assets/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ]
  },
  async redirects() {
    return [
      ...['/posts/:slug', '/posts/:slug/'].map(source => ({ source, destination: '/posts/:slug/1', permanent: true }))
    ]
  },
};

export default nextConfig;