const routerFactory = require("express").Router;
const getDirectoryModulePaths = require("../common/getDirectoryModulePaths");
const { INTERNAL_SERVER_ERROR } = require("http-status");

module.exports = app => {
  const apiRouter = routerFactory();

  app.use("/api", apiRouter);
  const modulePaths = getDirectoryModulePaths(__dirname);
  modulePaths.forEach(m => require(m)(apiRouter, routerFactory()));

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    });
  });
};
