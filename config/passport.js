const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const fs = require("fs");
const path = require("path");
const User = require("mongoose").model("User");

const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");

const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"]
};

// app.js will pass the global passport obj here, and this fun will configure it
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, function (jwt_payload, done) {
      // Since we are here, the JWT is valid!

      User.findOne({ _id: jwt_payload.sub}, function(err, user) {
        if(err){
          return done(err, false);
        }
        if(user) {
          // Since we are here, JWT and user are valide,
          return done(null, user);
        }else {
          return done(null, flase)
        }
      })
    })
  )
}