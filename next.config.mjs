/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
module.exports = {
  basePath: '/Recipe-Finder',
  trailingSlash: true, // To ensure correct routing for GitHub Pages
}

export default nextConfig;
