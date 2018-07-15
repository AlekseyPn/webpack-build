const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack_modules/pug');
const devserver = require('./webpack_modules/devserver');
const babel = require('./webpack_modules/babel');
const cssExtract = require('./webpack_modules/css.extract');
const style = require('./webpack_modules/scss');
const css = require('./webpack_modules/css');
const uglifyJs = require('./webpack_modules/uglify');
const imageLoader = require('./webpack_modules/image_loader')
const cleanUp = require('clean-webpack-plugin');
const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

const config = merge(
    [{
            entry: {                
                'blog': `${PATHS.source}/pages/blog/blog.js`,
                'about': `${PATHS.source}/pages/about/about.js`,                                    
            },
            output: {
                path: PATHS.build,
                filename: 'js/[name].js'
            },
            plugins: [                                               
                new HtmlWebpackPlugin({
                    filename: 'blog.html',
                    chunks: ['blog', 'common'],
                    template: `${PATHS.source}/pages/blog/blog.pug`
                }),
                new HtmlWebpackPlugin({
                    filename: 'about.html',
                    chunks: ['about', 'common'],
                    template: `${PATHS.source}/pages/about/about.pug`
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
                    scss_modules: path.resolve(__dirname, 'src/scss'),
                    '@sprite': path.resolve(__dirname, 'src/sprite/output')                    
                }
            }
        },        
        babel(),
        pug(),
        imageLoader(),
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
            style(),
            css()            
        ])
    }
}