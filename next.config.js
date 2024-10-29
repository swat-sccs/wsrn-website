/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: ['drive.google.com', 'localhost:3000'],
    loader: 'custom',
    loaderFile: './lib/imgloader.ts',
  },
};

module.exports = nextConfig;
