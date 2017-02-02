/**
 * Created by orel- on 17/Jan/17.
 */
import express from 'express';
let router = express.Router();
import passport from 'passport';
import GithubPassport from 'passport-github2';
import User from 'models/user';
import {extend} from 'underscore';
import * as jwt from 'jsonwebtoken';

// TODO: Prettify the code

const GithubStrategy = GithubPassport.Strategy;

// Get github credentials
let GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

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
        'id': id,
    })
        .exec()
        .then((user) => {
            done(null, user[0]);
        })
        .catch((err) => {
            throw err;
        });
});

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GithubStrategy({
    'clientID': GITHUB_CLIENT_ID,
    'clientSecret': GITHUB_CLIENT_SECRET,
    'callbackURL': process.env.NODE_ENV === 'production' && 'https://cogs.red/api/v1/auth/github/callback' || 'http://localhost:3000/api/v1/auth/github/callback',
},
function(accessToken, refreshToken, profile, done) {
    User.findOne({
        'id': profile.id,
    })
        .exec()
        .then((user) => {
            if (!user) {
                user = new User(profile);
            } else {
                user = extend(user, profile);
            }

            // generate JWT
            let jwToken = jwt.sign({
                'usr': profile.id,
                'roles': user && user.roles || ['member'],
            }, process.env.JWT_SECRET, {'expiresIn': '100d'});

            user.tokens = {
                'access_token': accessToken,
                'jwt': jwToken,
            };

            return user.save();
        })
        .then((user) => {
            return done(null, user);
        })
        .catch((err) => {
            throw err;
        });
}
));

// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
router.get('/github',
    passport.authenticate('github', { 'scope': [ 'user:email', 'public_repo' ] }),
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
    passport.authenticate('github', { 'failureRedirect': '/login' }),
    (req, res) => {
        // generate JWT for future authorizations
        res.cookie('token', req.user.tokens.jwt, {'maxAge': 60000});
        res.redirect('/');
    });

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

function authorize(req, res, next) {
    let token = req.get('Authorization');
    if (!token && req.get('Service-Token') !== process.env.serviceToken) {
        return res.status(401).send({
            'error': 'Unauthorized',
            'error_details': 'Authorization header not provided',
            'results': {},
        });
    }
    User.findOne({
        'tokens.jwt': token,
    })
        .exec()
        .then((user) => {
            if (!user  && req.get('Service-Token') !== process.env.serviceToken) {
                // override if Service-Token is provided
                throw new Error('Unauthorized');
            }
            req.user = user;
            next();
        })
        .catch((err) => {
            if (err.message === 'Unauthorized') {
                return res.status(401).send({
                    'error': 'Unauthorized',
                    'error_details': 'JWT token invalid',
                    'results': {},
                });
            }
            throw err;
        });
}

export {router, passport, authorize};
