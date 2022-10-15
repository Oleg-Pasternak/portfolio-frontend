module.exports = {
  reactStrictMode: true,
  module: {
    rules: [
      //...
      {
        test: /\.(png|jp(e*)g|svg|gif|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
}
