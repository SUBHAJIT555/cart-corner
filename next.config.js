const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    turbopack: {
      root: path.join(__dirname),
    },
    images: {
      unoptimized: true,
    },
 async rewrites() {
    if (process.env.NODE_ENV !== 'development') {
      return { beforeFiles: [], afterFiles: [], fallback: [] }
    }

    return {
      beforeFiles: [
        {
          source: '/api/submit.php',
          destination: 'http://127.0.0.1:8088/submit.php',
        },
        {
          source: '/api/mpurse.php',
          destination: 'http://127.0.0.1:8088/mpurse.php',
        },
        {
          source: '/api/mpurse-webhook.php',
          destination: 'http://127.0.0.1:8088/mpurse-webhook.php',
        },
        {
          source: '/mail.php',
          destination: 'http://127.0.0.1:8088/submit.php',
        },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
};

module.exports = nextConfig;
