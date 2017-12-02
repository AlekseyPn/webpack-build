module.exports = (env) => ({
    plugins: {
        'autoprefixer': {
            browsers: ['last 3 versions', '> 1%']
        },
        'css-mqpacker': {
            sort: true
        },
        'cssnano': env === 'production' ? {
            preset: ['default',
                {
                    discardComments: {
                        removeAll: true,
                    },
                }
            ]
        } : {}
    }
})