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
          destination: 'http://localhost/cart-corner/api/submit.php',
        },
        {
          source: '/mail.php',
          destination: 'http://localhost/cart-corner/api/submit.php',
        },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
};

module.exports = nextConfig;
