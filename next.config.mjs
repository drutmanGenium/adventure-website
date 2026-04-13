/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // We want to see TypeScript errors
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig