import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/analyze',
        destination: 'http://localhost:3000/analyze',
      },
    ]
  },
};

export default nextConfig;
