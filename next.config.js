/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    API: "https://stunner-strapi-cms-production.up.railway.app"
  }
};

module.exports = nextConfig;
