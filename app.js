const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const HTTPStatus = require("http-status");
const passport = require("passport");

const port = process.env.PORT || 3000;
const host = process.env.IP || "0.0.0.0";

const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const auth = require("./auth");
app.use(passport.initialize());
passport.use(auth);

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
