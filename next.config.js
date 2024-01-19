/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'stunner-strapi-cms-production.up.railway.app',
      },
    ],
  },
  experimental: {
    serverActions: true,
  }
};

module.exports = nextConfig;
