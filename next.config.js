/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['pokeapi.co','raw.githubusercontent.com'],
  }
}

module.exports = nextConfig
