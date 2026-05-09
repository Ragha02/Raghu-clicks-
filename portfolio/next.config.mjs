/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Gzip / Brotli compression ──────────────────────────────────────
  // Enables Node.js gzip compression for SSR responses (~70% smaller).
  // On Vercel, the CDN layer also applies Brotli automatically on top.
  compress: true,

  // ── Image optimisation ─────────────────────────────────────────────
  images: {
    // Serve WebP → AVIF in order of browser support
    formats: ['image/avif', 'image/webp'],
    // Whitelist the CloudFront CDN origin used for gallery images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'di4nbe8gl5nhl.cloudfront.net',
        pathname: '/**',
      },
    ],
    // Aggressive cache: optimised images are cached for 1 year
    minimumCacheTTL: 31536000,
  },

  // ── HTTP Cache-Control headers ─────────────────────────────────────
  async headers() {
    return [
      {
        // JS/CSS/fonts — content-addressed filenames → cache forever
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Public folder assets (images, favicon, etc.)
        source: '/(.*)\\.(webp|png|jpg|jpeg|svg|ico|woff2|woff|ttf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // HTML pages — stale-while-revalidate for instant repeat loads
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=59',
          },
          // Security headers bonus
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;

