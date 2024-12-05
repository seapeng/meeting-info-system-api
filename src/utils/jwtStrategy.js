const { Strategy, ExtractJwt } = require("passport-jwt");
const userModel = require("../models/user.model");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_SECRET,
};

const jwtStrategy = new Strategy(opts, async (payload, done) => {
  // const user = await userModel.findOne({ where: { id: payload.id } });
  const user = await userModel.findById(payload.id);
  if (!user) {
    done(null, false);
  }
  done(null, true);
});

module.exports = jwtStrategy;
