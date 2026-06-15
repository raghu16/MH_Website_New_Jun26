/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // allow case-study images from /public (local) or any https CDN
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  // SEO-safe consolidation from the blueprint: the three redundant lead pages
  // collapse into one canonical /contact-us (permanent 301s preserve equity).
  async redirects() {
    return [
      { source: "/free-quote", destination: "/contact-us", permanent: true },
      { source: "/get-free-estimation", destination: "/contact-us", permanent: true },
      { source: "/get-free-consultation", destination: "/contact-us", permanent: true },
      // services restructured into balanced columns
      { source: "/services/ar-vr-xr-development", destination: "/services/xr-development", permanent: true },
      { source: "/services/ai-mvp-development", destination: "/services/ai-solutions-development", permanent: true },
      { source: "/services/web-development", destination: "/services/web3-development", permanent: true },
    ];
  },
};

export default nextConfig;
