const passport = require("passport");
const { OK } = require("http-status");

module.exports = (parent, router) => {
  parent.use("/login", router);

  router.post("/", passport.authenticate("local", { session: false }), login);
};

function login(req, res, next) {
  return res.status(OK).json({
    success: true,
    data: req.user
  });
}
