import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fngyfknbfxhmvidczium.supabase.co",
      },
    ],
  },
};

export default nextConfig;
