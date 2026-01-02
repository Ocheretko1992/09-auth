import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
        pathname: '/fullstack/react/**',
      },
      { protocol: 'https', hostname: 'ac.goit.global' },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
