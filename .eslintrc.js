module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: "babel-eslint",
  extends: ["prettier", "plugin:react/recommended", "eslint:recommended"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2018,
    ecmaFeatures: {
      experimentalDecorators: true,
      jsx: true
    }
  },
  plugins: ["prettier", "react"],
  rules: {
    strict: 0,
    "prettier/prettier": "error",
    "no-console": "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "linebreak-style": "off"
  }
};
