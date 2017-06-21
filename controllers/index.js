const routerFactory = require("express").Router;
const getDirectoryModulePaths = require("../common/getDirectoryModulePaths");
const { INTERNAL_SERVER_ERROR, UNAUTHORIZED } = require("http-status");

const isAuthError = err => err.name === "AuthenticationError";

module.exports = app => {
  const apiRouter = routerFactory();

  app.use("/api", apiRouter);
  getDirectoryModulePaths(__dirname).forEach(p => require(p)(apiRouter, routerFactory()));

  app.use((err, req, res, next) => {
    if (isAuthError(err)) {
      res.status(err.status || UNAUTHORIZED).json({ message: err.message });
      return;
    }
    console.error(err.stack);
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  });
};
