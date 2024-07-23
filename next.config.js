/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  images: {
    loader: 'custom',
    loaderFile: './lib/imgloader.ts',
  },
};

module.exports = nextConfig;
