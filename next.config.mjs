/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Next 16 uses turbopack by default for `next build`. Its root
  // inference walks up from each compiled file and, when the App
  // Router directory is named `app/` (the standard), it occasionally
  // picks the App Router folder itself as the project root and then
  // fails to resolve `next/package.json`. Pinning the root to the
  // repo directory where this config lives makes the build
  // deterministic regardless of CWD / workspace detection.
  turbopack: {
    root: import.meta.dirname,
  },
}

export default nextConfig
