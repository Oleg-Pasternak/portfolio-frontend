module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  preProcessors: [
    {
        extensions: ["scss", "sass"],
        use: [require.resolve('sass-loader')],
    },
  ],
};
