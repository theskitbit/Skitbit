/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            // I have added frame-src and whitelisted Firework's domains across scripts, media, and connections
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net https://*.fw.tv https://*.fireworktv.com https://*.fwcdn1.com https://*.fwcdn2.com https://*.fwcdn3.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.facebook.com https://*.public.blob.vercel-storage.com https://*; media-src 'self' data: blob: https://*.public.blob.vercel-storage.com https://*.fw.tv https://*.fireworktv.com https://*.fwcdn1.com https://*.fwcdn2.com https://*.fwcdn3.com; frame-src 'self' https://*.fw.tv https://*.fireworktv.com; connect-src 'self' https://www.google-analytics.com https://www.facebook.com https://*.public.blob.vercel-storage.com https://vitals.vercel-insights.com https://*.fw.tv https://*.fireworktv.com; worker-src 'self' blob:;",
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;