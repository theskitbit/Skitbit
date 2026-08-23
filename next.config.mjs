/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'k7fdlkciit9qv6j1.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.theskitbit.com' }],
        destination: 'https://theskitbit.com/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com; style-src 'self' 'unsafe-inline'; font-src 'self' data: https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self' data: blob: https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.google.com https://images.unsplash.com https://*.public.blob.vercel-storage.com; media-src 'self' data: blob: https://*.public.blob.vercel-storage.com; frame-src 'self' https://www.googletagmanager.com https://www.google.com; connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://stats.g.doubleclick.net https://googleads.g.doubleclick.net https://www.googleadservices.com https://*.sanity.io https://*.api.sanity.io https://api.airtable.com; worker-src 'self' blob:;",
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
