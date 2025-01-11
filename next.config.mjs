/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/Recipe-Finder/' : '',
  basePath: isProd ? '/Recipe-Finder' : '',
  output: 'export'
};

export default nextConfig;
