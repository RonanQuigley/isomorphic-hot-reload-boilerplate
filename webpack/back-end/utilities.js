import path from 'path';

const commonFields = {
    path: path.join(__dirname, '../../dist/server'),
    publicPath: '/',
    filename: 'server.js',
    // this is necessary for webpack hot server middleware
    libraryTarget: 'commonjs2',
    chunkFilename: '[chunkhash:8].server.js'
};

export function setOutput() {
    if (process.env.NODE_ENV === 'development') {
        return {
            ...commonFields,
            /* fixes server side debugging issues for source maps */
            devtoolModuleFilenameTemplate(info) {
                return `file:///${info.absoluteResourcePath.replace(
                    /\\/g,
                    '/'
                )}`;
            }
        };
    } else {
        return commonFields;
    }
}

export function setDevTool() {
    /* for our back end devtool, we want to switch our choice of source mapping
    to inline-module-source map when developing. This allows for proper debugging
    https://github.com/webpack/webpack/issues/6400#issuecomment-365412386
    */
    switch (process.env.NODE_ENV) {
        case 'test':
            return 'inline-cheap-module-source-map';
        case 'development':
            /* development mode
            use inline-module-source-map for better debugging
            DO NOT change it to any other type as you will get 
            a breakpoints set but not yet bound error */
            return 'inline-module-source-map';
        default:
            // production or undefined
            return 'source-map';
    }
}
