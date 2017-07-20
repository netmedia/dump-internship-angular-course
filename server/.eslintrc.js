"use strict";

module.exports = {
  extends: "eslint",
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: "module",
  },
  env: {
    es6: true,
    node: true
  },
  rules: {
    "indent": 0, // handled by EditorConfig
    "newline-after-var": 0,
    "no-console": 0,
    "require-jsdoc": 0,
    "no-use-before-define": 0,
    "consistent-return": 0,
    "no-unused-vars": ["error", { "args": "none" }],
    "quotes": ["error", "double"],
    "eqeqeq": 0,
    "no-invalid-this": 0,
    "no-process-exit": 0,
    "curly": 0,
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "never"
    }],
    "prefer-arrow-callback": 0,
    "no-shadow": 0,
    "func-style": ["error", "declaration", { "allowArrowFunctions": true }]
  }
};
