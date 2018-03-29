module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    extends: ["plugin:prettier/recommended"],
    parserOptions: {
        ecmaVersion: 8, // for supporting es7 - async/await etc.
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true
        },
        sourceType: "module"
    },
    plugins: ["prettier", "react", "mocha"],
    rules: {
        "prettier/prettier": "error",
        "no-console": "off",
        "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "linebreak-style": ["error", "windows"]
    }
};
