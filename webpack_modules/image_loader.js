const path = require('path')
const SpriteGeneratorPlugin = require('webpack-spritesmith')
module.exports = function (paths) {
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
                                useRelativePath: process.env.NODE_ENV === "production"
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
        },
        resolve: {
            modules: ['node_modules', 'src/sprite/output']
        },
        plugins: [
            new SpriteGeneratorPlugin({
                src: {
                    cwd: path.resolve(__dirname, 'src/'),
                    glob: '**/sprite/png/*.png'
                },
                target: {
                    image: path.resolve(__dirname, 'src/sprite/output/sprite.png'),
                    css: path.resolve(__dirname, 'src/sprite/output/sprite.scss')
                },
                spritesmithOptions: {
                    padding: 10
                },
                apiOptions: {
                    cssImageRef: '~sprite.png'
                }
            })
        ]
    }
}