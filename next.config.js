module.exports = {
  preProcessors: [
    {
        extensions: ["scss", "sass"],
        use: [require.resolve('sass-loader')],
    },
  ],
};
