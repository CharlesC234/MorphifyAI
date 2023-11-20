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
    PATREON_CLIENT_ID: "y_AXKnpllfloSUgbnaTJ3kGvVyhc67YyfPIK4Nsl8Go9uDnUst9PyYVGMBF5Alvj",
    PATREON_CLIENT_SECRET: "TNkvOGgyNX_Z1eQBqwam7392Krhtufzvp5_mVD6vSnDWC1Mvy5hF9IX4ViOnQ006",
    PATREON_CAMPAIGN_ID: "11228283",
    SD_API: "https://api.runpod.ai/v2/3e6p131dguvg9l/runsync",
    SD_KEY: "8G1L9E7C70R7EIVVJMPYY6Y7LSJC7T4GLAYHGV9D",
  }
};

module.exports = nextConfig;
