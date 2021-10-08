module.exports = ({ file, options, env }) => {
    return {
        parser: file.extname === '.sss' ? 'sugarss' : false,
        plugins: {
            // cssnano: env === 'production' ? options.cssnano : false,
            cssnano: options.cssnano,
            'css-mqpacker': {
                sort: require('sort-css-media-queries').desktopFirst,
            },
            // 'postcss-inline-media': true
            // 'postcss-responsive-properties': {}, // https://github.com/alexandr-solovyov/postcss-responsive-properties
        },
    }
}
