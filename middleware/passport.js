const User = require("../models/User");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
require("dotenv").config();

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
const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.jwt_PRIVATE_KEY,
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload._id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

module.exports = { localStrategy, jwtStrategy };
