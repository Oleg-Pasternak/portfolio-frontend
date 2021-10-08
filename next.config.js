const cssLoaderConfig = require('@zeit/next-css/css-loader-config')
const path = require('path')
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const myConfig = {
    webpack(config, options) {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                },
            },
        })
        config.module.rules.push({
            test: /\.(graphql|gql)$/,
            loader: require.resolve('graphql-tag/loader'),
        })
        config.resolve.modules.push(
            path.resolve('./'),
            path.resolve('./components/')
        )
        config.resolve.alias['~'] = path.resolve(__dirname)


        config.plugins.push(
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            })
        );

        config.optimization.minimizer.push(
            new OptimizeCSSAssetsPlugin({})
        );
        return config
    },
}
// with sass config (require('@zeit/next-sass'))
module.exports = Object.assign({}, myConfig, {
    webpack(config, options) {
        if (!options.defaultLoaders) {
            throw new Error(
                'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
            )
        }

        const { dev, isServer } = options
        const {
            cssModules,
            cssLoaderOptions,
            postcssLoaderOptions,
            sassLoaderOptions = {},
        } = myConfig

        options.defaultLoaders.sass = cssLoaderConfig(config, {
            extensions: ['scss', 'sass'],
            cssModules,
            cssLoaderOptions,
            postcssLoaderOptions,
            dev,
            isServer,
            loaders: [
                {
                    loader: 'sass-loader',
                    options: sassLoaderOptions,
                },
            ],
        })

        config.module.rules.push(
            {
                test: /\.scss$/,
                use: options.defaultLoaders.sass,
            },
            {
                test: /\.sass$/,
                use: options.defaultLoaders.sass,
            }
        )

        if (typeof myConfig.webpack === 'function') {
            return myConfig.webpack(config, options)
        }

        return config
    },
})
