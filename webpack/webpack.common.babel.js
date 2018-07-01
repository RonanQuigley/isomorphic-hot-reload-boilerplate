// built on top of https://github.com/kriasoft/react-starter-kit/blob/master/tools/webpack.config.js

const isDev = process.env.NODE_ENV === 'development' ? true : false;

const minimizeCssOptions = {
    discardComments: { removeAll: true }
};

export default {
    module: {
        rules: [
            {
                exclude: /node_modules|packages/,
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory=false',
                sideEffects: false
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'isomorphic-style-loader',
                        options: {
                            debug: isDev
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // CSS Modules https://github.com/css-modules/css-modules
                            modules: true,
                            sourceMap: isDev,
                            minimize: isDev ? false : minimizeCssOptions,
                            localIdentName: isDev
                                ? '[name]__[local]-[hash:base64:5]'
                                : '[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            parser: 'postcss-scss',
                            plugins: () => [
                                require('autoprefixer')({
                                    browsers: ['last 2 versions']
                                }),
                                require('cssnano')({ zindex: false })
                            ]
                        }
                    },
                    'sass-loader'
                ],
                exclude: /node_modules/
            }
        ]
    }
};
