module.exports = (env) => ({
    plugins: {
        'autoprefixer': {
            browsers: ['last 2 versions', '> 1%']
        },
        'css-mqpacker': {
            sort: true
        },
        'cssnano': {
            preset: ['default',
                {
                    discardComments: {
                        removeAll: true,
                    },
                }
            ]
        }
    }
})