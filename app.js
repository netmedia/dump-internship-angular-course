const config = require("./config");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");

global.Promise = require("bluebird");

const port = config.application.port || 3000;
const host = config.application.ip || "0.0.0.0";

const app = express();
app.use(helmet());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// database
require("./models")(config.db.mongodb);

// auth
require("./auth")(app);

// routes
require("./controllers")(app);

app.listen(port, host, () =>
  console.log(`Server listening at ${host}:${port}`));
