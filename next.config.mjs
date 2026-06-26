/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing compiler config
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap.xml',
      },
    ];
  },
}
module.exports = nextConfig;