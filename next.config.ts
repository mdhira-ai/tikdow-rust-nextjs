
const nextConfig = {
  reactStrictMode: false,
  output: "export",   // static export for production
  images: {
    unoptimized: true, // required for static export
  },
  
};

export default nextConfig;