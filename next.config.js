// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.(scss|sass)$/,
        use: [require.resolve('style-loader'), require.resolve('css-loader'), require.resolve('sass-loader')],
      });
    }

    return config;
  },
};
