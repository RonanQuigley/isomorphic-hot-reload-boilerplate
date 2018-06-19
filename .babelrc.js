module.exports = {
    presets: ["@babel/preset-env", "@babel/preset-react", "@babel/stage-0"],
    plugins: ["react-hot-loader/babel"],
    // set retainLines and sourceMaps to true for proper debugging
    // otherwise you will get debugger errors for chrome
    retainLines: true,
    sourceMaps: true
};
