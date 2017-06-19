const fs = require("fs");
const path = require("path");
const minimatch = require("minimatch");

/**
 * Get all .js file paths in a directory except index.js
 * @param {string} dirname - absolute path to the directory
 * @returns {Array<string>} - the array of absolute paths
 */
module.exports = dirname => {
  let files = fs.readdirSync(dirname);
  files = files.filter(minimatch.filter("**/!(index).js"));
  return files.map(val => path.join(dirname, val));
};
