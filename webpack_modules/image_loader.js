module.exports = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.(jp?g|png|svg|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'images/',
                                useRelativePath: true
                            }
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    
                                    quality: 80
                                },                                
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: '65-90',
                                    speed: 4
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                optimizer: {
                                    enabled: true
                                }

                            }
                        }
                    ]                  
                }
            ]
        }
    }
}