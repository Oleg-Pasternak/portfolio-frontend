// next.config.js
module.exports = {
  webpack: (config, { dev, isServer }) => {
    if (!dev && isServer) {
      // Enable build caching for production builds on the server
      config.cache = {
        type: 'filesystem',
      };
    }

    // Add the SCSS/Sass loader configuration
    if (!isServer) {
      config.module.rules.push({
        test: /\.(scss|sass)$/,
        use: [require.resolve('style-loader'), require.resolve('css-loader'), require.resolve('sass-loader')],
      });
    }

    return config;
  },
};
