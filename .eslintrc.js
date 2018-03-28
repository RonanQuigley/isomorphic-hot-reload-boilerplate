module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  // "extends": "eslint:recommended",
  extends: ["plugin:prettier/recommended"],
  parserOptions: {
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
