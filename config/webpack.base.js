const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const buildPath = path.resolve('dist');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: buildPath,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        }
    },
    plugins: [
        new CleanWebpackPlugin(buildPath, { root: path.resolve('../') }),
    ],
    module: {
        rules: [

            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    }
}