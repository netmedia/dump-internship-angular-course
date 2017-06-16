const fs = require("fs");
const path = require("path");
const minimatch = require("minimatch");
const routerFactory = require("express").Router;

/**
 * Initialize all files in a directory as controllers, requiring all .js files except index.js
 * @param {string} dirname - absolute path to the directory
 * @param {Router} parentRouter - parent router for all routers that are to be initialized
 * @returns {void}
 */
module.exports = (dirname, parentRouter) => {
  let files = fs.readdirSync(dirname);
  files = files.filter(minimatch.filter("**/!(index).js"));
  console.log(files);
  files.forEach(val => require(path.join(dirname, val))(parentRouter, routerFactory()));
};
