import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      // Picsum Photos — seed-based fallback hero images (no auth required)
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'fastly.picsum.photos' },
      // Unsplash CDN — populated by scripts/fetch-hero-image.mjs
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}

export default withNextIntl(nextConfig)
