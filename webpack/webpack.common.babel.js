// built on top of https://github.com/kriasoft/react-starter-kit/blob/master/tools/webpack.config.js

const isDev = process.env.NODE_ENV === 'development' ? true : false;

const minimizeCssOptions = {
    discardComments: { removeAll: true }
};

export default {
    module: {
        rules: []
    }
};
