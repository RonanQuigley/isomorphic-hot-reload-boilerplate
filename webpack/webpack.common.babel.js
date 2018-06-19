export default {
    module: {
        rules: [
            {
                exclude: /node_modules|packages/,
                test: /\.js$/,
                loader: "babel-loader?cacheDirectory=true"
            }
        ]
    }
};
