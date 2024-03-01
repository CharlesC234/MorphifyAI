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
    REPLICATE_API_TOKEN: "r8_KA87I0xvyPpfoQ7L7whwdjQPtGJ5Nu94cNhrL",
  },
  reactStrictMode: false,
  webpack: (config, { isServer, buildId, dev, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
      };

      config.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
        }),
        new webpack.NormalModuleReplacementPlugin(
          /node:crypto/,
          (resource) => {
            resource.request = resource.request.replace(/^node:/, '');
          }
        )
      );
    }
    return config;
  },
};

module.exports = nextConfig;
