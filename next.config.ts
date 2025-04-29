import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  optimizeFonts: true,
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }];
    return config;
  },
};

export default nextConfig;
