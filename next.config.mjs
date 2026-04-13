/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // We want to see TypeScript errors
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    cpus: 1, // Use fewer workers to reduce memory usage
  },
}

export default nextConfig