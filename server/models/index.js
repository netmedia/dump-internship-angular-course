const getDirectoryModulePaths = require("../common/getDirectoryModulePaths");
const mongoose = require("mongoose");

// set mongoose Promise library
mongoose.Promise = Promise;

getDirectoryModulePaths(__dirname).forEach(p => require(p));

module.exports = ({ host, port, name, username, password }) => {

  // set additional options, including promiseLibrary for underlying mongodb driver
  const options = { user: username, pass: password, promiseLibrary: Promise };
  mongoose.connect(`mongodb://${host}:${port}/${name}`, options);
};
