const routerFactory = require("express").Router;
const initControllers = require("../common/initControllers");
const { INTERNAL_SERVER_ERROR } = require("http-status");

module.exports = app => {
  const apiRouter = routerFactory();

  app.use("/api", apiRouter);
  initControllers(__dirname, apiRouter);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    });
  });
};
