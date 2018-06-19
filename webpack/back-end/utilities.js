import path from "path";
const dist = path.join(__dirname, "../../dist");

export function setOutput() {
    const filename = "server.js";
    const libraryTarget = "commonjs2";
    if (process.env.NODE_ENV === "development") {
        return {
            path: dist,
            filename: filename,
            // this is necessary for webpack hot server middleware
            libraryTarget: libraryTarget,
            /* fixes server side debugging issues for source maps */
            devtoolModuleFilenameTemplate(info) {
                return `file:///${info.absoluteResourcePath.replace(
                    /\\/g,
                    "/"
                )}`;
            }
        };
    } else {
        return {
            path: dist,
            filename: filename,
            libraryTarget: libraryTarget
        };
    }
}

export function setDevTool() {
    /* for our back end devtool, we want to switch our choice of source mapping
    to inline-module-source map when developing. This allows for proper debugging
    https://github.com/webpack/webpack/issues/6400#issuecomment-365412386
    */
    switch (process.env.NODE_ENV) {
        case "test":
            return "inline-cheap-module-source-map";
        case "development":
            /* development mode
            use inline-module-source-map for better debugging
            DO NOT change it to any other type as you will get 
            a breakpoints set but not yet bound error */
            return "inline-module-source-map";
        default:
            // production or undefined
            return "source-map";
    }
}
