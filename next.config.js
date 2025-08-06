
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io', 'play-lh.googleusercontent.com'],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
