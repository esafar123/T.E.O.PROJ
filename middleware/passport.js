const User = require("../models/User");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

// for example need to change the "username type" i need to put {usernameField: email} before the async worde
const localStrategy = new LocalStrategy(
  { usernameField: "username" },
  async (username, password, done) => {
    const user = await User.findOne({ username: username });
    if (!user)
      return done({
        message: "Username or password is wrong! kindly to try again",
      });
    const checkPassword = await bcrypt.compare(password, User.password);
    if (!checkPassword)
      return done({
        message: "Username or password is wrong! kindly to try again",
      });

    return done(null, user);
  }
);

module.exports = localStrategy;
