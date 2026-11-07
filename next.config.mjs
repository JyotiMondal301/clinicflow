/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Prevents static generation failures from halting the build
  staticPageGenerationTimeout: 1000,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;