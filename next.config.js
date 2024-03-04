/** @type {import('next').NextConfig} */
const nextConfig = {
  /// ...
  output: 'standalone',
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'https://wsrn.sccs.swarthmore.edu' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS' },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Icy-Metadata, Authorization',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
