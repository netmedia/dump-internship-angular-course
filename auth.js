const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJwt = require("passport-jwt");
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const config = require("./config");
const User = require("mongoose").model("User");

passport.use(new LocalStrategy({
  usernameField: "email",
  session: false
}, (email, password, done) => {
  User.findOne({ email })
    .select("+password")
    .then(user => {
      if (!user) {
        done(null, false, "User not found!");
        return;
      }

      isValidPassword(user, password, done);
      return null;
    })
    .catch(err => done(err));

  function isValidPassword(user, password, done) {
    return user.verifyPassword(password)
      .then(success => {
        if (!success) {
          done(null, false, "Invalid password!");
          return;
        }

        done(null, user);
      })
      .catch(err => done(err));
  }
}));

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(config.jwt.authScheme || "Bearer"),
  secretOrKey: config.jwt.secret,
  ignoreExpiration: false
}, (payload, done) => {
  User.findById(payload.id)
    .then(user => {
      if (!user) {
        done(null, false, "User not found!");
        return;
      }
      done(null, user);
      return null;
    })
    .catch(err => done(err));
}));

module.exports = app => app.use(passport.initialize());
