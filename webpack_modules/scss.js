const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = function (paths) {
    return {
        module: {
            rules: [
                {
                    test: /(\.scss)$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        publicPath: '../',
                        fallback: 'style-loader',
                        use: [
                            {
                              loader: 'css-loader',
                              options: {                                
                                sourceMap: true                                
                              }
                            },
                            {
                              loader: 'postcss-loader', options: {
                                sourceMap: true
                              }
                            },
                            {
                              loader: 'sass-loader',
                              options: {                                
                                sourceMap: true                                
                              }
                            },
                            {
                                loader: 'sass-resources-loader',
                                options: {
                                    resources: [path.resolve(__dirname, '../src/scss/variables.scss'),                                    
                                    path.resolve(__dirname, '../src/scss/components.scss')]
                                }
                            }
                        ]
                    })                                   
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin({ filename: 'styles.css', allChunks: true }),
        ],
    }
}