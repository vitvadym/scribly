import type { NextConfig } from 'next';
// import path from 'path';

const nextConfig: NextConfig = {
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.alias['yjs'] = path.resolve(__dirname, 'node_modules/yjs');
  //   }
  //   return config;
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  reactStrictMode: false,
};

export default nextConfig;
