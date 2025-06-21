/** @type {import('next').NextConfig} */

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
    if (
      !process.env.MAIL_HOST ||
      !process.env.MAIL_PORT ||
      !process.env.MAIL_USER ||
      !process.env.MAIL_PASSWORD ||
      !process.env.NOTIFY_EMAIL
    ) {
      return [
        {
          source: '/contact',
          destination: '/404',
          permanent: false,
        },
        {
          source: '/api/contact',
          destination: '/404',
          permanent: false,
        },
      ]
    }

    return []
  },
}

module.exports = nextConfig

// MAIL_HOST = "secret_string"
// MAIL_PORT = 465
// MAIL_USER = "secret_email"
// MAIL_PASSWORD = "secret_id"
// NOTIFY_EMAIL = "secret_email"
