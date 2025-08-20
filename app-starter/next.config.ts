// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Good dev defaults
  reactStrictMode: true,
  swcMinify: true,

  // Image Optimization: allow remote images you actually use
  images: {
    // Either use domains:
    domains: [
      // "images.example.com",
      // "cdn.yourapp.com",
    ],
    // or more precise remotePatterns:
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "images.example.com",
      //   pathname: "/**",
      // },
    ],
  },

  // Lint/type safety
  eslint: { dirs: ["src"] },
  typescript: {
    ignoreBuildErrors: false, // keep CI strict; flip to true only if you must unblock a build
  },

  // App Router is default in Next 15; no need to set experimental.appDir
  // You can still enable specific experiments if needed:
  experimental: {
    // typedRoutes: true, // uncomment if you want typed links/routes
    // optimizePackageImports: ["lodash", "date-fns"], // optional perf tweak
  },

  // Useful if you’ll dockerize or run outside Vercel
  output: "standalone",
};

export default nextConfig;

// Optionally add these helpers in the same file if you need them:
export async function headers() {
  return [
    {
      source: "/:path*",
      headers: [
        // Modest caching for static assets; tweak as needed
        { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
      ],
    },
  ];
}

// Example redirects (delete if unused)
// export async function redirects() {
//   return [{ source: "/old", destination: "/new", permanent: true }];
// }