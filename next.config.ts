import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'bg'],
    defaultLocale: 'bg',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
}

export default nextConfig
