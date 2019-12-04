const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require('./airtable');
const keys = require('./keys');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.JWT_SECRET_KEY;


module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      db("Users").find(jwt_payload.id, (err, record) => {
          if(record){
            return done(null, {
              firstName: record.get('First Name'),
              lastName: record.get('Last Name'),
              username: record.get('username'),
              email: record.get('email'),
            });
          }
            
        return done(null, false);
      });
    
    })
  );
};