import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  webpack: (config) => {
    config.resolve.extensionAlias = {
      ".js": [".ts", ".js"],
      ".jsx": [".tsx", ".jsx"],
    };
    return config;
  },
  outputFileTracingIncludes: {
    "/api/extension/visual-scan": [
      "./lib/visual/model.onnx",
      "./lib/visual/model.onnx.data",
      "./lib/visual/model.meta.json",
      "./lib/visual/thresholds.json",
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.shopsherpa.org" }],
        destination: "https://shopsherpa.org/:path*",
        permanent: true,
      },
      {
        source: "/aeo",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
