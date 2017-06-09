const LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy(authenticate);

function authenticate(username, password, done) {
  if (username !== 'john') {
    return done(new Error(`User ${username} not found!`));
  }

  done(null, {
    username: 'john',
    name: 'John Doe',
    email: 'johndoe@example.org'
  });
}
