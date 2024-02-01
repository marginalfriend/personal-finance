/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.worldhistory.org",
        port: "",
        pathname: "/uploads/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
