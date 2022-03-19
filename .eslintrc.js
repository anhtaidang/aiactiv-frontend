module.exports = {
  env: {
    browser: true,
    jest: true,
    es6: true,
  },
  globals: {
    __dirname: true,
    module: true,
    process: true,
  },
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier.
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    // This will display prettier errors as ESLint errors.
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  plugins: ["@typescript-eslint", "react-hooks", "react"],
  settings: {
    react: {
      pragma: "React",
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    "import/resolver": {
      webpack: {
        config: "./configs/webpack/common.js",
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      "babel-module": {
        alias: {
          "~": "./client",
        },
      },
    },
  },
  // Fine tune rules
  rules: {
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "no-useless-catch": 0,
    "react/display-name": 0,
    "react/prop-types": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "no-debugger": "off",
  },
};
