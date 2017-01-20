/*
 * Users backend, used to get user info and update it
 * User creation is handled by auth module
 * */

import express from 'express';
let router = express.Router();
import User from 'models/user';
import {getUserRepos} from 'backend/api/v1/github';

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
        .exec((err, entries) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    'error': 'DBError',
                    'error_details': 'Could not list entries',
                    'results': {},
                });
            }
            return res.status(200).send({
                'error': false,
                'results': {
                    'list': entries,
                },
            });
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
router.get('/:username', (req, res) => {
    User.findOne({
        'username': req.params.username,
    }, (err, entry) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                'error': 'DBError',
                'error_details': 'Could not check for entry',
                'results': {},
            });
        }
        if (!entry) {
            // if does not exist - return NotFound
            return res.status(400).send({
                'error': 'EntryNotFound',
                'error_details': 'There is no such user',
                'results': {},
            });
        }
        return res.status(200).send({
            'error': false,
            'results': entry,
        });
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
    }, (err, entry) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                'error': 'DBError',
                'error_details': 'Could not check for entry',
                'results': {},
            });
        }
        if (!entry) {
            // if does not exist - return NotFound
            return res.status(400).send({
                'error': 'EntryNotFound',
                'error_details': 'There is no such user',
                'results': {},
            });
        }

        // get repos from github;
        getUserRepos(entry, (err, repos) => {
            if (err) console.log(err);
            return res.status(200).send({
                'error': false,
                'results': {
                    'list': repos
                }
            })
        });


    });
});

// There is no POST operation, since users can only be created in the auth module


export {router};
