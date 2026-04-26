/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['localhost', 'store-one-rob.duckdns.org', 'store-products-example.s3.amazonaws.com'],
  },
  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
  transpilePackages: ['@base-ui/react'],
}

module.exports = nextConfig
