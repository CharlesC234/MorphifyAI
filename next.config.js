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
  },
  env: {
    API: "https://stunner-strapi-cms-production.up.railway.app",
    PATREON_CLIENT_ID: "eBMPs-NHzR78EpPBVOf6cL5uWWmJMLOI94b-JVK9kTfAp49-b5GZ3NgFlf92MGGX",
    PATREON_CLIENT_SECRET: "POtdjUpqnNInrJS9DvyZVzGoQ02DjjiMe0fWCs7uakUdpjRoWV-bAGt-Ew-OV-Bo",
    PATREON_CAMPAIGN_ID: "11228283",
    SD_API: "https://api.runpod.ai/v2/3e6p131dguvg9l/runsync",
    SD_KEY: "8G1L9E7C70R7EIVVJMPYY6Y7LSJC7T4GLAYHGV9D",
  }
};

module.exports = nextConfig;
