import path from 'path';

export function setWebDevTool() {
    /* for vscode-chrome-debugger to work correctly we need to 
    change the devtool for testing and development. This is because 
    vscode-chrome debugger requires non-inline source maps whilst 
    mocha-webpack works best with cheap and inlined source maps
    */
    switch (process.env.NODE_ENV) {
        case 'test':
            return 'inline-cheap-module-source-map';
        case 'development':
            // using source-maps prevents "jumpy" breakpoints
            // try cheap-module-eval-source-map if rebuilds are slow
            // but be warned : it will jump all over the place
            // on successive rebuilds!
            // I've tried every possible combination at this point
            // to get around this, so don't waste your time future me!!!
            return 'cheap-module-eval-source-map';
        default:
            // production or undefined
            return 'source-map';
    }
}

export function setNodeDevTool() {
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

export function setNodeOutput() {
    const commonFields = {
        path: path.join(__dirname, '../dist/server'),
        publicPath: '/',
        filename: 'server.js',
        // this is necessary for webpack hot server middleware
        libraryTarget: 'commonjs2',
        chunkFilename: '[chunkhash:8].server.js'
    };
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

export function setWebOutput() {
    /**
     * Hash: is corresponding to build. Each chunk will get same the hash across the build.
     * If anything changes in the build, the corresponding hash will also change.
     * Chunkhash: is based on the webpack entry point. Each entry defined will have it’s own hash.
     * If anything changes for that particular entry point than only that corresponding hash will change.
     * [hash:8]: slice the first 8 digits of the hash for use
     */

    const commonFields = {
        path: path.join(__dirname, '../dist/client'),
        chunkFilename: '[name].chunk.js',
        filename: '[name].[contenthash].client.js',
        publicPath: '/'
    };
    if (process.env.NODE_ENV === 'development') {
        return {
            ...commonFields,
            /*
                webpack hot middleware cannot make use of
                contenthashes; instead keep it as hash:8 
            */
            filename: '[hash:8].client.js',
            // fixes vscode chrome debugger stepping into unrelated webpack code
            // therefore: do not remove this!!!
            devtoolModuleFilenameTemplate(info) {
                return `file:///${info.absoluteResourcePath.replace(
                    /\\/g,
                    '/'
                )}`;
            }
        };
    } else {
        // testing and production
        return commonFields;
    }
}
