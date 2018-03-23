module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    // "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "mocha"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        'no-console': 'off',
        "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "linebreak-style": [
            "error",
            "windows"
        ],
        // "mocha/no-exclusive-tests": "error",
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};