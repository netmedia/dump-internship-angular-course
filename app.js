const config = require("./config");
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const HTTPStatus = require("http-status");
const passport = require("passport");

const port = config.application.port || 3000;
const host = config.application.ip || "0.0.0.0";

const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// auth
const auth = require("./auth");
app.use(passport.initialize());
passport.use(auth);

// routes
app.post("/login", passport.authenticate("local", { session: false }),
  (req, resp) => resp.status(HTTPStatus.OK).json({
    success: true,
    data: req.user
  }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message
  });
});

app.listen(port, host, () =>
  console.log(`Server listening at ${host}:${port}`));
