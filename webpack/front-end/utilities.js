import path from 'path';
const dist = path.join(__dirname, '../../dist');

const filename = 'client.js';

export function setOutput() {
    if (process.env.NODE_ENV === 'development') {
        return {
            filename: filename,
            path: dist,
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
        return {
            filename: filename,
            path: dist
        };
    }
}

export function setDevTool() {
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
