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
    "no-unused-vars": ["error", {"args": "none"}],
    "quotes": ["error", "double"]
  }
};
