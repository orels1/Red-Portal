/**
 * Repos backend. Used to add repos to DB, update them, list cogs, etc.
 */

import express from 'express';
let router = express.Router();
import {extend} from 'underscore';
import {parseRepos} from './utils/parsers';
import Repo from 'models/repo';
import co from 'co';
import {checkOwnership} from './users';


/**
 * @apiDefine RepoRequestSuccess
 *
 * @apiVersion 0.2.0
 *
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 * @apiSuccess (200) {String} results.id Id of the repo in DB
 * @apiSuccess (200) {String} results.name Name of the repo
 * @apiSuccess (200) {Object} results.author Author of the repo
 * @apiSuccess (200) {Object} results.author.name Author's name according to info.json
 * @apiSuccess (200) {Object} results.author.url Author's github url
 * @apiSuccess (200) {String} results.short Short description of the repo
 * @apiSuccess (200) {String} results.description Full description of the repo
 * @apiSuccess (200) {String} results.type Repo's type
 * @apiSuccess (200) {String} results.parsed Repo's parsing status
 * @apiSuccess (200) {Object} results.cogs List of cogs in a JS object
 * @apiSuccess (200) {Object} results.links Contains relevant links
 * @apiSuccess (200) {String} results.links._self Link to repo's API endpoint
 * @apiSuccess (200) {String} results.links._update Link to repo's update API endpoint
 * @apiSuccess (200) {String} results.links.self Link to repo's webpage
 * @apiSuccess (200) {Object} results.links.github Contains relevant github links
 * @apiSuccess (200) {String} results.links.github.self Link to the repo on github
 * @apiSuccess (200) {String} results.links.github._update Link to info.json github's api endpoint
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {
 *              "_id": "587d62b4c54cad51845ae101",
 *              "name": "ORELS-Cogs",
 *              "__v": 4,
 *              "description": "Repository of mainly gaming/data based cogs, with a bit of some fun stuff. Use as you like.",
 *              "short": "Data scraping cogs with a bit of extra",
 *              "links": {
 *                  "_self": "/api/v1/repos/orels1/ORELS-Cogs",
 *                  "_update": "/api/v1/repos/orels1/ORELS-Cogs/parse",
 *                  "_cogs": "/api/v1/cogs/orels1/ORELS-Cogs
 *                  "self": "/cogs/orels1/ORELS-Cogs/",
 *                  "github": {
 *                      "self": "https://github.com/orels1/ORELS-Cogs",
 *                      "_update": "https://api.github.com/repos/orels1/ORELS-Cogs/contents/info.json?ref=master"
 *                  }
 *              },
 *              "type": "unapproved",
 *              "parsed": false,
 *              "cogs": [],
 *              "author": {
 *                  "name": "orels",
 *                  "url": "https://github.com/orels1"
 *              },
 *              "tags": [
 *                  "api",
 *                  "tools",
 *                  "fun",
 *                  "gaming"
 *              ]
 *          }
 *      }
 */

/**
 * @api {get} /repos/ List all repos
 * @apiVersion 0.2.0
 * @apiName getRepoList
 * @apiGroup repos
 *
 * @apiUse DBError
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
 *                       "name": "ORELS-Cogs",
 *                       "__v": 4,
 *                       "description": "Repository of mainly gaming/data based cogs, with a bit of some fun stuff. Use as you like.",
 *                       "short": "Data scraping cogs with a bit of extra",
 *                       "links": {
 *                           "_self": "/api/v1/repos/orels1/ORELS-Cogs",
 *                           "_update": "/api/v1/repos/orels1/ORELS-Cogs/parse",
 *                           "_cogs": "/api/v1/cogs/orels1/ORELS-Cogs
 *                           "self": "/cogs/orels1/ORELS-Cogs/",
 *                           "github": {
 *                               "self": "https://github.com/orels1/ORELS-Cogs",
 *                               "_update": "https://api.github.com/repos/orels1/ORELS-Cogs/contents/info.json?ref=master"
 *                           }
 *                       },
 *                       "type": "unapproved",
 *                       "parsed": false,
 *                       "cogs": [],
 *                       "author": {
 *                           "name": "orels",
 *                           "url": "https://github.com/orels1"
 *                       },
 *                       "tags": [
 *                          "api",
 *                          "tools",
 *                          "fun",
 *                          "gaming"
 *                       ]
 *                   }
 *               ]
 *           }
 *      }
 */
router.get('/', (req, res) => {
    Repo.find(req.query.unparsed === '1' && {} || {'parsed': true})
        .exec((err, entries) => {
            if (err) {
                throw err;
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
 * @api {post} /repos/ Add new repo to DB
 * @apiVersion 0.2.0
 * @apiName postRepo
 * @apiGroup repos
 *
 * @apiHeader {string} Service-Token Admin-oriented service token
 *
 * @apiParam {String} url Repo github URL
 * @apiParam {String} type Repo type, either approved or beta
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *          "url": "https://github.com/orels1/ORELS-Cogs",
 *          "type": "approved"
 *      }
 *
 * @apiUse DBError
 * @apiUse EntryExists
 *
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {
 *              "__v": 0,
 *              "name": "ORELS-Cogs",
 *              "_id": "587d7a9d13893158907d1729",
 *              "links": {
 *                  "github": {
 *                      "self": "https://github.com/orels1/ORELS-Cogs"
 *                  }
 *              },
 *              "type": "unapproved",
 *              "parsed": false,
 *              "cogs": [],
 *              "author": {
 *                  "url": "https://github.com/orels1",
 *                  "username": "orels1"
 *              }
 *          }
 *      }
 */
router.post('/', checkOwnership, (req, res) => {
    // Check if we have that entry already
    Repo.findOne({
        'links.github.self': req.body.url,
    }, (err, entry) => {
        if (err) {
            throw err;
        }
        if (entry) {
            // if exists return id for future requests
            return res.status(400).send({
                'error': 'EntryExists',
                'error_details': 'This repo already exists',
                'results': {'_self': entry.links._self},
            });
        }

        let name = req.body.url.substr(req.body.url.lastIndexOf('/') + 1),
            authorUrl = req.body.url.substr(0, req.body.url.lastIndexOf('/')),
            username = authorUrl.substr(authorUrl.lastIndexOf('/') + 1);
        return new Repo({
            'name': name,
            'author': {
                'url': authorUrl,
                'username': username,
            },
            'links': {
                '_self': `/api/v1/repos/${username}/${name}`,
                '_update': `/api/v1/repos/${username}/${name}/parse`,
                '_cogs': `/api/v1/cogs/${username}/${name}`,
                'self': `/cogs/${username}/${name}/`,
                'github': {
                    'self': req.body.url,
                },
            },
            'type': req.body.type,
        }).save((err, entry) => {
            if (err) {
                throw err;
            }
            return res.status(200).send({
                'error': false,
                'results': entry,
            });
        });
    });
});

/**
 * @api {get} /repos/:author/:repoName Get repo
 * @apiVersion 0.2.0
 * @apiName getRepo
 * @apiGroup repos
 *
 * @apiParam {String} author Author's username on github
 * @apiParam {String} repoName name of the repo to get
 *
 * @apiUse DBError
 * @apiUse RepoRequestSuccess
 * @apiUse EntryNotFound
 */
router.get('/:author/:repoName', (req, res) => {
    Repo.findOne({
        'name': req.params.repoName,
    }, (err, entry) => {
        if (err) {
            throw err;
        }
        if (!entry) {
            // if does not exist - return NotFound
            return res.status(404).send({
                'error': 'EntryNotFound',
                'error_details': 'There is no such repo, or it is being parsed currently',
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
 * @api {put} /repos/:author/:repoName/parse Parse repo
 * @apiVersion 0.2.0
 * @apiName parseRepos
 * @apiGroup repos
 *
 * @apiParam {String} author Author's username on github
 * @apiParam {String} repoName name of the repo to get
 *
 * @apiHeader {string} Service-Token Admin-oriented service token
 *
 * @apiUse DBError
 *
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": 'Parsing started',
 *      }
 */
router.put('/:author/:repoName/parse', authorize, (req, res) => {
    if (!req.user.roles.includes('admin') || !req.user.roles.includes('staff')) {
        return res.status(401).send({
            'error': 'Unauthorized',
            'error_details': 'Authorization header not provided',
            'results': {},
        });
    }

    Repo.find({
        'author.username': req.params.author,
        'name': req.params.repoName,
    })
        .exec()
        .then((repos) => {
            return co(parseRepos(repos))
                .then((repos) => {
                    for (let repo of repos) {
                        return repo.save()
                            .then((repo) => {
                                return repo;
                            })
                            .catch((err) => {
                                throw err;
                            });
                    }
                })
                .catch((err) => {
                    throw err;
                });
        });
    return res.status(200).send({
        'error': false,
        'results': 'Parsing started',
    });
});

/**
 * @api {put} /repos/:id Update repo
 * @apiVersion 0.2.0
 * @apiName putRepo
 * @apiGroup repos
 *
 * @apiHeader {string} Service-Token Admin-oriented service token
 *
 * @apiParam {String} id Repo id in DB
 * @apiParam {JSON} payload Object containing the new repo data
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *          "payload": {
 *              "parsed": false
 *          }
 *      }
 *
 *
 * @apiUse DBError
 * @apiUse RepoRequestSuccess
 * @apiUse EntryNotFound
 */
router.put('/:id', (req, res) => {
    // Check if we have that entry already
    Repo.findById(req.params.id, (err, entry) => {
        if (err) {
            throw err;
        }
        if (!entry) {
            // if does not exist - return NotFound
            return res.status(404).send({
                'error': 'EntryNotFound',
                'error_details': 'There is no such repo',
                'results': {},
            });
        }
        // update with the new values
        extend(entry, req.body);
        return entry.save((err, entry) => {
            if (err) {
                throw err;
            }
            return res.status(200).send({
                'error': false,
                'results': entry,
            });
        });
    });
});

/**
 * @api {delete} /repos/:id Delete repo by id
 * @apiVersion 0.2.0
 * @apiName deleteRepo
 * @apiGroup repos
 *
 * @apiHeader {string} Service-Token Admin-oriented service token
 *
 * @apiParam {String} id Repo id in DB
 *
 * @apiUse DBError
 * @apiUse EntryNotFound
 *
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {}
 *      }
 */
router.delete('/:id', (req, res) => {
    Repo.findByIdAndRemove(req.params.id, (err, entry) => {
        if (err) {
            throw err;
        }
        if (!entry) {
            // if does not exist - return NotFound
            return res.status(404).send({
                'error': 'EntryNotFound',
                'error_details': 'There is no such repo',
                'results': {},
            });
        }
        // successfully deleted entry
        return res.status(200).send({
            'error': false,
            'results': {},
        });
    });
});

export {router};
