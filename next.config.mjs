/** @type {import('next').NextConfig} */

// SECURITY: Defense-in-depth Content Security Policy. Together with not
// storing the JWT in localStorage (see lib/api.ts), this restricts what
// an injected script could do if an XSS vulnerability ever slipped in.
// `script-src 'self'` blocks loading attacker-controlled JS from external
// origins, and `connect-src` limits where script can exfiltrate data to.
// Note: 'unsafe-inline' is required for Next.js inline bootstrapping
// scripts and styled-jsx; tightening to nonces would be a follow-up.
const apiOrigin = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vercel.live",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  `connect-src 'self' ${apiOrigin} https://vitals.vercel-insights.com https://vercel.live wss://ws-us3.pusher.com`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
]

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: cspDirectives.join("; "),
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
]

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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
