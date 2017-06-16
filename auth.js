const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

function authenticate(username, password, done) {
  if (username !== "john") {
    return done(new Error(`User ${username} not found!`));
  }

  done(null, {
    username: "john",
    name: "John Doe",
    email: "johndoe@example.org"
  });
}

module.exports = app => {
  passport.use(new LocalStrategy(authenticate));
  app.use(passport.initialize());
};
