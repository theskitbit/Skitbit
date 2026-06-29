/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
{
  key: 'Content-Security-Policy',
  // Added 'blob:' and 'https://*.public.blob.vercel-storage.com' to allow your assets
  value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.public.blob.vercel-storage.com; media-src 'self' blob: https://*.public.blob.vercel-storage.com; connect-src 'self' https://www.google-analytics.com https://www.facebook.com https://*.public.blob.vercel-storage.com;",
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