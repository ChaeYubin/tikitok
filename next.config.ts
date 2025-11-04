import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: '/',
      destination: '/time-board',
      permanent: true,
    },
  ],
}

export default nextConfig
