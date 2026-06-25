/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Explicitly enforce the SWC minifier
  swcMinify: true,

  // 2. Maximum minification: Remove all console.logs in production!
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error"], // Keeps console.error just in case, but strips console.log and console.warn
    } : false,
  },
}

export default nextConfig;