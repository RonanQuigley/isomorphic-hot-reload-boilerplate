
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

export default (compiler, webpackConfig) => {

    if (!compiler) throw 'compiler is undefined';
    if (!webpackConfig) throw 'webpack config is undefined';

    const dev = webpackDevMiddleware(compiler, {
        logLevel: 'warn', publicPath: webpackConfig.output.publicPath, serverSideRender : true
    });

    const hot = webpackHotMiddleware(compiler);

    return {
        dev,
        hot
    }

}