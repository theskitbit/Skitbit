/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your other config settings here...
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap.xml',
      },
    ];
  },
}

module.exports = nextConfig; // Ensure you export as module.exports