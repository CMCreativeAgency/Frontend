/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        port: '1337',
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        port: '1337',
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        port: '1337',
        protocol: 'http',
        hostname: '0.0.0.0',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        protocol: 'http',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'http',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapiapp.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'attractive-dawn-63c629d294.strapiapp.com',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: '139.59.133.32',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
