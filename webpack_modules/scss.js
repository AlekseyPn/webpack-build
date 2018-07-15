const webpack = require('webpack')
const path = require('path')
module.exports = function (paths) {
    return {
        module: {
            rules: [
                {
                    test: /(\.scss)$/,
                    include: paths,                                        
                    use: [
                            {
                              loader: 'style-loader', options: {
                                sourceMap: true
                              }
                            },
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
                                    resources: [
                                        path.resolve(__dirname, '../src/scss/variables.scss'),
                                        path.resolve(__dirname, '../src/scss/components.scss')
                                    ]
                                }
                            }
                    ]                    
                }
            ]
        }
    }
}