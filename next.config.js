/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Desactiva la optimización de imágenes
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
