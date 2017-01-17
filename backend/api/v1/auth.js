/**
 * Created by orel- on 17/Jan/17.
 */
import express from 'express';
let router = express.Router();
import passport from 'passport';
import GithubPassport from 'passport-github2';
import Config from 'models/config';
import User from 'models/user';
import {extend} from 'underscore';

// TODO: Prettify the code

const GithubStrategy = GithubPassport.Strategy;

// Get github credentials
let GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

Config.findOne({
    'name': 'github-client-id'
}).exec((err, clientId) => {
    if (err) return console.log(err);
    GITHUB_CLIENT_ID = clientId.value;
});

Config.findOne({
    'name': 'github-client-secret'
}).exec((err, clientSecret) => {
    if (err) return console.log(err);
    GITHUB_CLIENT_SECRET = clientSecret.value;
});

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.find({
        'id': id
    })
        .exec((err, user) => {
            done(err, user[0]);
    })
});

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GithubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/v1/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...

        User.find({
            'id': profile.id
        })
            .exec((err, users) => {
                if (users.length === 0) {
                    let user = new User(profile);
                    user.tokens = {
                        'access_token': accessToken,
                    };

                    return user.save((err, user) => {
                        return done(null, user);
                    })
                }

                // get only the first match
                let user = users[0];
                user = extend(user, profile);

                user.tokens = {
                    'access_token': accessToken,
                };

                return user.save((err, user) => {
                    return done(null, user);
                });

            })
    }
));

// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
router.get('/github',
    passport.authenticate('github', { scope: [ 'user:email', 'public_repo' ] }),
    (req, res) => {
        // The request will be redirected to GitHub for authentication, so this
        // function will not be called.
    });

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    });

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

export {router, passport}