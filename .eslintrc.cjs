module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:jest/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "react/prop-types": "off", // You can remove this if you use PropTypes
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
