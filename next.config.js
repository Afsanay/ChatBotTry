/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/proxy',
        destination: 'https://stablediffusionapi.com/api/v3/text2img',
      },
    ]
  },
  reactStrictMode: true,
}

module.exports = nextConfig
