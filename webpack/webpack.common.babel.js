export default {
    module: {
        rules: [
            {
                exclude: /node_modules|packages/,
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory=true',
                sideEffects: false
            },
            {
                test: /\.(css|less|styl|scss|sass|sss)$/,
                use: [
                    'isomorphic-style-loader',
                    `css-loader`,
                    'postcss-loader?parser=postcss-scss',
                    'sass-loader?sourceMap'
                ]
            }
        ]
    }
};
