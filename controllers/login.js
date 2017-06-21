const passport = require("passport");
const jwt = require("jsonwebtoken");
const { OK } = require("http-status");

module.exports = (parent, router) => {
  parent.use("/login", router);

  router.post("/", passport.authenticate("local", { session: false, failWithError: true }), login);
};

function login(req, res, next) {
  const user = req.user.toJSON();
  user.token = createToken(req.user);
  return res.status(OK).json(user);
}

function createToken({ id } = {}) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TTL || "1d"
  });
}
