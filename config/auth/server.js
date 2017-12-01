import express from 'express';
import passport from 'passport';
import CoinbaseStrategy from 'passport-coinbase';
// Import Coinbase OAuth app configs
import { coinbaseConfig } from './coinbase_info_real';

// Transform Coinbase profile because Coinbase and Google profile objects look different
// and we want to transform them into user objects that have the same set of attributes
const transformCoinbaseProfile = (profile) => ({
  name: profile.name,
  avatar: profile.picture.data.url,
});

passport.use(new CoinbaseStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://gg-kv9.miheegz.bitme.exp.direct:80/auth/coinbase/callback',
  scope: ['user']
},
function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {

    // To keep the example simple, the user's Coinbase profile is returned to
    // represent the logged-in user.  In a typical application, you would want
    // to associate the Coinbase account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
}
));

// // Register Coinbase Passport strategy
// passport.use(new CoinbaseStrategy(coinbaseConfig,
//   // Gets called when user authorizes access to their profile
//   async (accessToken, refreshToken, profile, done) => {
//     // Return done callback and pass transformed user object
//     return  done(null, transformCoinbaseProfile(profile._json))}
// ));

passport.serializeUser((user, done) => done(null, user));

// Deserialize user from the sessions
passport.deserializeUser((user, done) => done(null, user));

// Initialize http server
const app = express.createServer();

// Initialize Passport
// configure Express
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/assests'));
});

// Set up Facebook auth routes
app.get('/auth/coinbase', passport.authenticate('coinbase'));

app.get('/auth/coinbase/callback',
  passport.authenticate('coinbase', { failureRedirect: '/auth/coinbase' }),
  // Redirect user back to the mobile app using Linking with a custom protocol OAuthLogin
  (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));


// Launch the server on the port 3000
const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
