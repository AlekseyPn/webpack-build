const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack_modules/pug');
const devserver = require('./webpack_modules/devserver');
const babel = require('./webpack_modules/babel');
const cssExtract = require('./webpack_modules/css.extract');
const style = require('./webpack_modules/scss');
const uglifyJs = require('./webpack_modules/uglify')
const cleanUp = require('clean-webpack-plugin')

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

const config = merge(
    [{
            entry: {
                'index': `${PATHS.source}/pages/index.js`,
                'blog': `${PATHS.source}/pages/blog/blog.js`
            },
            output: {
                path: PATHS.build,
                filename: 'js/[name].js'
            },
            plugins: [
                new HtmlWebpackPlugin({
                    filename: 'index.html',
                    chunks: ['index', 'common'],
                    template: `${PATHS.source}/pages/index.pug`
                }),
                new HtmlWebpackPlugin({
                    filename: 'blog.html',
                    chunks: ['blog', 'common'],
                    template: `${PATHS.source}/pages/blog/blog.pug`
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'common'
                }),
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery',
                    _: 'lodash'
                }),
                new cleanUp('build')
            ],
            resolve: {
                alias: {
                    src: path.resolve(__dirname, 'src/'),
                    modules: path.resolve(__dirname, 'node_modules/')
                }
            }
        },
        babel(),
        pug()
    ]
);

module.exports = function (env) {
    if (env === 'production') {
        return merge([
            config,
            cssExtract(),
            uglifyJs()
        ])
    };
    if (env === 'development') {
        config.devtool = 'source-map'
        return merge([{},
            config,            
            devserver(),
            style()
        ])
    }
}