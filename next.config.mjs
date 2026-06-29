/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.facebook.com https://*.public.blob.vercel-storage.com; media-src 'self' data: blob: https://*.public.blob.vercel-storage.com; connect-src 'self' https://www.google-analytics.com https://www.facebook.com https://*.public.blob.vercel-storage.com https://vitals.vercel-insights.com;",
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