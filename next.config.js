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
  }
};

module.exports = nextConfig;
