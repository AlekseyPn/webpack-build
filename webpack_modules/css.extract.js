const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
module.exports = function (paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        publicPath: '../',
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            'postcss-loader',
                            'sass-loader',
                            {
                                loader: 'sass-resources-loader',
                                options: {
                                    resources: [path.resolve(__dirname, '../src/scss/variables.scss'),                                    
                                    path.resolve(__dirname, '../src/scss/components.scss')]
                                }
                            }
                        ]
                    }),
                },
                {
                    test: /\.css$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'postcss-loader']
                    })
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('./css/[name].css'),
        ],
    }
}