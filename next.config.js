/** @type {import('next').NextConfig} */

const { _siteSettings } = require('./components/_constant');

const images_domain = ["images.microcms-assets.io"]
const appUrl = new URL(process.env.APP_URL)
images_domain.push(appUrl.hostname)

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
    domains: images_domain,
  },
  async redirects() {
    if (_siteSettings.contactForms.disableContactForm) {
      return [
        {
          source: '/contact',
          destination: '/404',
          permanent: false,
        },
      ]
    }

    return []
  },
}

module.exports = nextConfig
