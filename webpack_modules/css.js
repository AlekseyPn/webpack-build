const webpack = require('webpack')
const path = require('path')
const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};
module.exports = function (paths) {
    return {
        module: {
            rules: [
                {
                    test: /(\.css)$/,
                    include: paths,                                        
                    use: [
                    	'style-loader',
                        'css-loader',
                        'postcss-loader'
                    ]                    
                }
            ]
        }
    }
}