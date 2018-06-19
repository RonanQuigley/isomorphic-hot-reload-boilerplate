import path from "path";
// workaround for a bug with webpack :
// https://github.com/webpack/webpack/issues/6642
const globalObject = "this";
const dist = path.join(__dirname, "../../dist");

export function setOutput() {
    if (process.env.NODE_ENV === "development") {
        return {
            path: dist,
            /* allows for proper vscode chrome debugging */
            devtoolModuleFilenameTemplate(info) {
                return `file:///${info.absoluteResourcePath.replace(
                    /\\/g,
                    "/"
                )}`;
            },
            globalObject: globalObject
        };
    } else {
        // testing and production
        return {
            path: dist,
            globalObject: globalObject
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
        case "test":
            return "inline-cheap-module-source-map";
        case "development":
            /* we use a second flag to decide our devtool choice : 
                module-source-map: 
                    -- slower rebuild
                    -- much better debugging 
                cheap-module-eval-source-map:
                    -- faster rebuild
                    -- chrome debugger will show errors in debug console, 
                    however it still seems to work somewhat okay in use
            */
            return process.env.DEBUG === "true"
                ? "source-map"
                : "cheap-module-eval-source-map";

        default:
            // production or undefined
            return "source-map";
    }
}
