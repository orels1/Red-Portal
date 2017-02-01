/*
 * Users backend, used to get user info and update it
 * User creation is handled by auth module
 * */

import express from 'express';
let router = express.Router();
import User from 'models/user';
import {getUserRepos} from 'backend/api/v1/github';
import {findWhere, extend} from 'underscore';
import {decode} from 'jsonwebtoken';
import {authorize} from './auth';

/**
 * @apiDefine UserRequestSuccess
 *
 * @apiVersion 0.1.0
 *
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 * @apiSuccess (200) {String} results._id Id of the user in DB
 * @apiSuccess (200) {String} results.id Id of the user on Github
 * @apiSuccess (200) {String} results.displayName User's display name on Github
 * @apiSuccess (200) {String} results.username User's name (login) on Github
 * @apiSuccess (200) {String} results.profileUrl User's Github profile url
 * @apiSuccess (200) {Object} results._json Raw user data from Github
 * @apiSuccess (200) {Array} results.emails List of user's emails
 * @apiSuccess (200) {Array} results.repos List of user's repos connected to cogs.red
 * @apiSuccess (200) {Object} results.tokens User's access tokens
 * @apiSuccess (200) {String} results.tokens.access_token User's github access token
 *
 * @apiSuccessExample {json} Success-Response
 *      HTTP/1.1 OK
 *      {
 *          "error": false,
 *          "results": {
 *              "_id": "587d62b4c54cad51845ae101",
 *              "id": "3789562",
 *              "displayName": "orels1",
 *              "username": "orels1",
 *              "profileUrl": "https://github.com/orels1",
 *              "_json": {},
 *              "repos": [],
 *              "tokens": {
 *                  "access_token": "121768567df7s6f896df75sdf6d757fd"
 *              },
 *              "emails": [{"value": "some@example.com"}]
 *          }
 *      }
 *
 * */

/**
 * @api {get} /users/ List all users
 * @apiVersion 0.1.0
 * @apiName getUsersList
 * @apiGroup users
 *
 * @apiUse DBError
 *
 * @apiHeader {string} Service-Token Admin-oriented service token
 *
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 * @apiSuccess (200) {Array} results.list List of entries
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {
 *               "list": [
 *                   {
 *                       "_id": "587d62b4c54cad51845ae101",
 *                       "id": "3789562",
 *                       "displayName": "orels1",
 *                       "username": "orels1",
 *                       "profileUrl": "https://github.com/orels1",
 *                       "_json": {},
 *                       "repos": [],
 *                       "tokens": {
 *                           "access_token": "121768567df7s6f896df75sdf6d757fd"
 *                       },
 *                       "emails": [{"value": "some@example.com"}]
 *                   }
 *               ]
 *           }
 *      }
 *
 */
router.get('/', (req, res) => {
    User.find({})
        .exec()
        .then((entries) => {
            return res.status(200).send({
                'error': false,
                'results': {
                    'list': entries,
                },
            });
        })
        .catch((err) => {
            throw err;
        });
});

/**
 * @api {get} /users/:username Get user by username
 * @apiVersion 0.1.0
 * @apiName getUser
 * @apiGroup users
 *
 * @apiHeader {string} Service-Token Admin-oriented service token
 *
 * @apiParam {String} username Requested user's github username
 *
 * @apiUse DBError
 * @apiUse UserRequestSuccess
 * @apiUse EntryNotFound
 */
router.get('/:username', authorize, (req, res) => {
    // If requested by user himself
    if (req.user && req.user.username === req.params.username) {
        return res.status(200).send({
            'error': false,
            'results': req.user,
        });
    }
    // if elevated access
    return User.findOne({
        'username': req.params.username,
    })
        .exec()
        .then((user) => {
            if (!user) {
                throw new Error('EntryNotFound');
            }
            return res.status(200).send({
                'error': false,
                'results': user,
            });
        })
        .catch((err) => {
            if (err.message === 'EntryNotFound') {
                return res.status(404).send({
                    'error': 'EntryNotFound',
                    'error_details': 'There is no such user',
                    'results': {},
                });
            }
            throw err;
        });
});

/**
 * @api {put} /users/:id Update user by ID
 * @apiVersion 0.2.0
 * @apiName updateUser
 * @apiGroup users
 *
 * @apiHeader {String} Authorization User's JWT access token
 * @apiHeader {String} Service-Token Admin-oriented service token
 *
 * @apiParam {String} id User's id in DB
 *
 * @apiUse DBError
 * @apiUse EntryNotFound
 * @apiUse UserRequestSuccess
 */
router.put('/:id', authorize, (req, res) => {
    // If requested by user himself
    if (req.user && req.user._id.toString() === req.params.id) {

        // only admins can change roles
        if (req.body.roles && !req.body.roles.include('admin')) {
            delete req.body.roles;
        }

        extend(req.user, req.body);

        return req.user.save()
            .then((user) => {
                return res.status(200).send({
                    'error': false,
                    'results': user,
                });
            })
            .catch((err) => {
                throw err;
            });
    }
    // if elevated access
    return User.findById(req.params.id)
        .exec()
        .then((user) => {
            extend(user, req.body);
            return user.save();
        })
        .then((user) => {
            return res.status(200).send({
                'error': false,
                'results': user,
            });
        })
        .catch((err) => {
            throw err;
        });
});

/**
 * @api {get} /users/:username/repos Get user's github repos
 * @apiVersion 0.1.0
 * @apiName getUserRepos
 * @apiGroup users
 *
 * @apiHeader {string} Service-Token Admin-oriented service token
 *
 * @apiParam {String} username Requested user's github username
 *
 * @apiUse DBError
 * @apiUse EntryNotFound
 */
router.get('/:username/repos', (req, res) => {
    User.findOne({
        'username': req.params.username,
    })
        .exec()
        .then((entry) => {
            if (err) {
                throw err;
            }
            if (!entry) {
                // if does not exist - return NotFound
                throw new Error('EntryNotFound');
            }

            // get repos from github;
            return getUserRepos(entry);
        })
        .then((repos) => {
            return res.status(200).send({
                'error': false,
                'results': {
                    'list': repos,
                },
            });
        })
        .catch((err) => {
            if (err.message === 'EntryNotFound') {
                return res.status(404).send({
                    'error': 'EntryNotFound',
                    'error_details': 'There is no such user',
                    'results': {},
                });
            }
            throw err;
        });
});


/**
 * Middleware
 * Checks if user owns a repo
 * @param req
 * @param res
 * @param next
 */
function checkOwnership(req, res, next) {
    let token = req.get('Authorization');
    User.findOne({
        'tokens.jwt': token,
    })
        .exec()
        .then((user) => {
            if (!user && req.get('Service-Token') !== process.env.serviceToken && !user.roles.include('admin')) {
                // override if Service-Token is provided
                throw new Error('Unauthorized');
            }

            // check if repo exists
            return getUserRepos(user);
        })
        .then((repos) => {
            if (findWhere(repos, {'html_url': req.body.url})) {
                next();
            } else {
                throw new Error('EntryNotFound');
            }
        })
        .catch((err) => {
            if (err.message === 'Unauthorized') {
                return res.status(401).send({
                    'error': 'Unauthorized',
                    'error_details': 'JWT token invalid',
                    'results': {},
                });
            }
            if (err.message === 'EntryNotFound') {
                return res.status(404).send({
                    'error': 'EntryNotFound',
                    'error_details': 'There is no such repo for this user',
                    'results': {},
                });
            }
            throw err;
        });
}


export {router, checkOwnership};
