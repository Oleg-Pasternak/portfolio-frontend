const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    quietDeps: true,
    silenceDeprecations: ['legacy-js-api', 'import'],
  },
  images: {
    domains: ['res.cloudinary.com', '127.0.0.1'],
    unoptimized: true,
  },
  output: 'export',
  transpilePackages: [
    'lenis',
    'three-stdlib',
    'split-type',
    'gsap',
    'cannon-es',
    'html-react-parser',
    'react-svg',
  ],
};