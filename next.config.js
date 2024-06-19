/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
        },
      ],
    });
    return config;
  },
  images: {
    disableStaticImages: true, // importした画像の型定義設定を無効にする
    domains: ['images.microcms-assets.io', 'jzurde.jp', 'localhost', 'www.jzurde.jp'],
  },
}

module.exports = nextConfig
