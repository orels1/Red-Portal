/**
 * Repos backend. Used to add repos to DB, update them, list cogs, etc.
 */

import express from 'express';
let router = express.Router();
import { eachLimit } from 'async';
import { findWhere, where, extend, filter } from 'underscore';
import Repo from 'models/repo';
import Cog from 'models/cog';
import Vote from 'models/vote';
import { parseCogs } from './utils/parsers';
import co from 'co';
import { authorize } from './auth';

/**
 * @apiDefine CogRequestSuccess
 *
 * @apiVersion 0.2.1
 *
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 * @apiSuccess (200) {String} results.name Name of the cog
 * @apiSuccess (200) {Object} results.author Author of the cog
 * @apiSuccess (200) {Object} results.author.name Author's name according to info.json
 * @apiSuccess (200) {Object} results.author.url Author's github url
 * @apiSuccess (200) {String} results.short Short description of the cog
 * @apiSuccess (200) {String} results.description Full description of the cog
 * @apiSuccess (200) {Object} results.links Contains relevant links
 * @apiSuccess (200) {String} results.links._self Link to cogs's API endpoint
 * @apiSuccess (200) {String} results.links._repo Link to cog's repo API endpoint
 * @apiSuccess (200) {String} results.links._update Link to cogs's update API endpoint
 * @apiSuccess (200) {String} results.links.self Link to cog's webpage
 * @apiSuccess (200) {String} results.links.repo Link to cog's repo webpage
 * @apiSuccess (200) {Object} results.links.github Contains relevant github links
 * @apiSuccess (200) {String} results.links.github.self Link to the cog on github
 * @apiSuccess (200) {String} results.links.github.repo Link to the repo on github
 * @apiSuccess (200) {String} results.links.github._update Link to info.json github's api endpoint
 * @apiSuccess (200) {Object} results.repo Contains info about cog's repo
 * @apiSuccess (200) {String} results.repo.type Cog's repo type
 * @apiSuccess (200) {String} results.repo.name Cog's repo name
 * @apiSuccess (200) {Boolean} results.hidden Determines if the cog should be hidden from the API
 * @apiSuccess (200) {Number} results.votes Amount of votes for the cog
 * @apiSuccess (200) {Boolean} results.voted Cog vote status for request's IP
 * @apiSuccess (200) {Array} results.tags List of cog's tags
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {
 *              "links": {
 *                  "github": {
 *                      "_update": "https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master",
 *                      "repo": "https://github.com/orels1/ORELS-Cogs",
 *                      "self": "https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py"
 *                  },
 *                  "repo": "cogs/orels1/ORELS-Cogs/",
 *                  "self": "/cogs/orels1/ORELS-Cogs/dota/",
 *                  "_update": "/api/v1/cogs/orels1/ORELS-Cogs/dota/fetch",
 *                  "_repo": "/api/v1/repos/orels1/ORELS-Cogs",
 *                  "_self": "/api/v1/cogs/orels1/ORELS-Cogs/dota"
 *              },
 *              "description": "Requires tabulate, dota2py and beautfulSoup\nInstall with:\npip3 install bs4\npip3 install dota2py\npip3 install tabulate\n\nAlso requires dota 2 api key, which you can get here: http://steamcommunity.com/dev/apikey\nYou will need to set your key with [p]dota setkey command in PM\n\nUsage:\n[p]dota hero <hero>\n Shows info about hero\n[p]dota build <hero>\n Shows most popular skillbuild\n[p]dota items <hero>\n Shows most popular items\n[p]dota online\n Shows amount of players online\n[p]dota recent <steamID>\n Shows info about the latest dota match",
 *              "short": null,
 *              "updated_at": "Fri Jan 27 2017 00:10:15 GMT+0300",
 *              "author": {
 *                  "url": "https://github.com/orels1",
 *                  "name": "orels"
 *              },
 *              "repo": {
 *                  "type": "unapproved",
 *                  "name": "ORELS-Cogs"
 *              },
 *              "name": "dota",
 *              "hidden": false,
 *              "voted": false,
 *              "votes": 0,
 *              "tags": ["gaming"]
 *              }
 *          }
 *      }
 */

/**
 * @api {get} /cogs/ List all cogs
 * @apiVersion 0.2.1
 * @apiName getCogList
 * @apiGroup cogs
 *
 * @apiUse DBError
 *
 * @apiParam {Boolean} [hidden] Return hidden cogs
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
 *                       "links": {
 *                           "github": {
 *                               "_update": "https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master",
 *                               "repo": "https://github.com/orels1/ORELS-Cogs",
 *                               "self": "https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py"
 *                           },
 *                           "repo": "cogs/orels1/ORELS-Cogs/",
 *                           "self": "/cogs/orels1/ORELS-Cogs/dota/",
 *                           "_update": "/api/v1/cogs/orels1/ORELS-Cogs/dota/fetch",
 *                           "_repo": "/api/v1/repos/orels1/ORELS-Cogs",
 *                           "_self": "/api/v1/cogs/orels1/ORELS-Cogs/dota"
 *                        },
 *                        "description": "Requires tabulate, dota2py and beautfulSoup\nInstall with:\npip3 install bs4\npip3 install dota2py\npip3 install tabulate\n\nAlso requires dota 2 api key, which you can get here: http://steamcommunity.com/dev/apikey\nYou will need to set your key with [p]dota setkey command in PM\n\nUsage:\n[p]dota hero <hero>\n Shows info about hero\n[p]dota build <hero>\n Shows most popular skillbuild\n[p]dota items <hero>\n Shows most popular items\n[p]dota online\n Shows amount of players online\n[p]dota recent <steamID>\n Shows info about the latest dota match",
 *                        "short": null,
 *                        "updated_at": "Fri Jan 27 2017 00:10:15 GMT+0300",
 *                        "author": {
 *                            "url": "https://github.com/orels1",
 *                            "name": "orels"
 *                        },
 *                        "repo": {
 *                            "type": "unapproved",
 *                            "name": "ORELS-Cogs"
 *                        },
 *                        "name": "dota",
 *                        "hidden": false,
 *                        "voted": false,
 *                        "votes": 0,
 *                        "tags": ["gaming"]
 *                   }
 *               ]
 *           }
 *      }
 */
router.get('/', (req, res) => {
    const hidden = req.query.hidden === 'true';
    const params = hidden ? {} : { 'hidden': false };
    Cog.find(params)
        .exec()
        .then(cogs => {
            res.status(200).send({
                'error': false,
                'results': {
                    'list': cogs,
                },
            });
        })
        .catch(err => {
            throw err;
        });
});

/**
 * @api {get} /cogs/:author/:repoName Get cogs from repo
 * @apiVersion 0.2.1
 * @apiName getCogFromRepo
 * @apiGroup cogs
 *
 * @apiParam {String} author Cog author github username
 * @apiParam {String} repoName Name of the repo containing the cog
 *
 * @apiUse DBError
 * @apiUse EntryNotFound
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {
 *               "list": [
 *                   {
 *                       "links": {
 *                           "github": {
 *                               "_update": "https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master",
 *                               "repo": "https://github.com/orels1/ORELS-Cogs",
 *                               "self": "https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py"
 *                           },
 *                           "repo": "cogs/orels1/ORELS-Cogs/",
 *                           "self": "/cogs/orels1/ORELS-Cogs/dota/",
 *                           "_update": "/api/v1/cogs/orels1/ORELS-Cogs/dota/fetch",
 *                           "_repo": "/api/v1/repos/orels1/ORELS-Cogs",
 *                           "_self": "/api/v1/cogs/orels1/ORELS-Cogs/dota"
 *                        },
 *                        "description": "Requires tabulate, dota2py and beautfulSoup\nInstall with:\npip3 install bs4\npip3 install dota2py\npip3 install tabulate\n\nAlso requires dota 2 api key, which you can get here: http://steamcommunity.com/dev/apikey\nYou will need to set your key with [p]dota setkey command in PM\n\nUsage:\n[p]dota hero <hero>\n Shows info about hero\n[p]dota build <hero>\n Shows most popular skillbuild\n[p]dota items <hero>\n Shows most popular items\n[p]dota online\n Shows amount of players online\n[p]dota recent <steamID>\n Shows info about the latest dota match",
 *                        "short": null,
 *                        "updated_at": "Fri Jan 27 2017 00:10:15 GMT+0300",
 *                        "author": {
 *                            "url": "https://github.com/orels1",
 *                            "name": "orels"
 *                        },
 *                        "repo": {
 *                            "type": "unapproved",
 *                            "name": "ORELS-Cogs"
 *                        },
 *                        "name": "dota",
 *                        "hidden": false,
 *                        "voted": false,
 *                        "votes": 0,
 *                        "tags": ["gaming"]
 *                   }
 *               ]
 *           }
 *      }
 */
router.get('/:author/:repoName', (req, res) => {
    Cog.find({
        'author.username': req.params.author,
        'repo.name': req.params.repoName,
        'hidden': false,
    })
        .exec()
        .then(cogs => {
            if (cogs.length === 0) {
                // if does not exist - return NotFound
                return res.status(404).send({
                    'error': 'EntryNotFound',
                    'error_details':
                        'There is no such cog, or it is being parsed currently',
                    'results': {},
                });
            }

            return res.status(200).send({
                'error': false,
                'results': {
                    'list': cogs,
                },
            });
        })
        .catch(err => {
            throw err;
        });
});

/**
 * @api {get} /cogs/:author/:repoName/:cogName Get cog
 * @apiVersion 0.2.0
 * @apiName getCog
 * @apiGroup cogs
 *
 * @apiParam {String} author Cog author github username
 * @apiParam {String} repoName Name of the repo containing the cog
 * @apiParam {String} cogName Name of the cog to get
 *
 * @apiUse DBError
 * @apiUse CogRequestSuccess
 * @apiUse EntryNotFound
 */
router.get('/:author/:repoName/:cogName', (req, res) => {
    let cog = null;
    Cog.findOne({
        'name': req.params.cogName,
        'author.username': req.params.author,
        'repo.name': req.params.repoName,
        'hidden': false,
    })
        .exec()
        .then(res => {
            if (!res) {
                // if does not exist - return NotFound
                throw new Error('EntryNotFound');
            }

            cog = res;

            // check if voted for cog
            return Vote.findOne({
                'repo': req.params.repoName,
                'cog': req.params.cogName,
            }).exec();
        })
        .then(vote => {
            cog.voted = vote && vote.IPs.indexOf(req.ip) !== -1;

            return res.status(200).send({
                'error': false,
                'results': cog,
            });
        })
        .catch(err => {
            if (err.message === 'EntryNotFound') {
                return res.status(404).send({
                    'error': 'EntryNotFound',
                    'error_details':
                        'There is no such cog, or it is being parsed currently',
                    'results': {},
                });
            }
            throw err;
        });
});

/**
 * @api {put} /cogs/:author/:repoName/parse Parse new cogs
 * @apiVersion 0.2.0
 * @apiName parseCogs
 * @apiGroup cogs
 *
 * @apiHeader {string} Service-Token Admin-oriented service token
 *
 * @apiParam {String} author Cog author github username
 * @apiParam {String} repoName Name of the repo containing the cog
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

// TODO: Refactor this mess
router.put('/:author/:repoName/parse', authorize, (req, res) => {
    if (
        req.user &&
            !req.user.roles.includes('admin') &&
            !req.user.roles.includes('staff') ||
        !req.user && req.get('Service-Token') !== process.env.serviceToken
    ) {
        return res.status(401).send({
            'error': 'Unauthorized',
            'error_details': 'Authorization header not provided',
            'results': {},
        });
    }
    Repo.findOne({
        'author.username': req.params.author,
        'name': req.params.repoName,
    })
        .exec()
        .then(repo => {
            // Get cogs for current repo to filter missing cogs
            return Cog.find({
                'author.username': req.params.author,
                'repo.name': req.params.repoName,
            })
                .exec()
                .then(cogs => {
                    // Remove unnecessary info from the cog we only need essentials
                    return {
                        'repo': repo,
                        'cogs':
                            cogs.length > 0 &&
                                cogs.map(cog => {
                                    return {
                                        'name': cog.name,
                                        'author': {
                                            'username': cog.author.username,
                                        },
                                        'repo': { 'name': cog.repo.name },
                                    };
                                }) ||
                            false,
                    };
                });
        })
        .then(data => {
            return co(parseCogs(data.repo, data.cogs));
        })
        .then(cogs => {
            // First - clear old cogs
            for (let cog of cogs.missing) {
                Cog.findOneAndRemove({
                    'name': cog.name,
                    'author.username': cog.author.username,
                    'repo.name': cog.repo.name,
                }).exec();
            }
            return cogs;
        })
        .then(cogs => {
            for (let cog of cogs.parsed) {
                // check if we have such cog
                Cog.findOne({
                    'name': cog.name,
                    'author.username': cog.author.username,
                    'repo.name': cog.repo.name,
                })
                    .exec()
                    .then(dbCog => {
                        if (!dbCog) {
                            cog = new Cog(cog);
                        } else {
                            cog = extend(dbCog, cog);
                            cog.updated_at = new Date();
                        }

                        return cog.save();
                    })
                    .then(cog => {
                        return cog;
                    })
                    .catch(err => {
                        throw err;
                    });
            }
        })
        .catch(err => {
            throw err;
        });
    return res.status(200).send({
        'error': false,
        'results': 'Parsing started',
    });
});

/**
 * @api {get} /cogs/:author/:repoName/:cogName/vote Vote for cog with ?choice=[0|1]
 * @apiVersion 0.2.0
 * @apiName voteCog
 * @apiGroup cogs
 *
 * @apiParam {String} author Cog author github username
 * @apiParam {String} repoName Name of the repo containing the cog
 * @apiParam {String} cogName Name of the cog to get
 *
 * @apiUse DBError
 * @apiUse CogRequestSuccess
 * @apiUse EntryNotFound
 *
 */
router.get('/:author/:repoName/:cogName/vote', (req, res) => {
    let cog = null,
        voted = false;
    let p = Cog.findOne({
        'name': req.params.cogName,
        'author.username': req.params.author,
        'repo.name': req.params.repoName,
        'hidden': false,
    })
        .exec()
        .then(result => {
            if (!result) {
                // if does not exist - return NotFound
                throw new Error('EntryNotFound');
            }

            cog = result;

            return Vote.findOne({
                'username': req.params.author,
                'repo': req.params.repoName,
                'cog': req.params.cogName,
            }).exec();
        })
        .then(result => {
            let vote = null;

            if (!result) {
                vote = new Vote({
                    'username': req.params.author,
                    'repo': req.params.repoName,
                    'cog': req.params.cogName,
                    'IPs': [],
                });
            } else {
                vote = result;
            }

            if (vote.IPs.indexOf(req.ip) !== -1 && req.query.choice === '1') {
                throw new Error('AlreadyVoted');
            }

            voted = false;
            // vote and save IP
            if (req.query.choice === '1') {
                cog.votes += 1;
                voted = true;
                vote.IPs.push(req.ip);

                // only decrease votes if IP is in DB
            }
            if (req.query.choice === '0' && vote.IPs.indexOf(req.ip) !== -1) {
                cog.votes -= 1;
                let ipIndex = vote.IPs.indexOf(req.ip);
                voted = false;
                vote.IPs.splice(ipIndex, 1);
            }

            return vote.save();
        })
        .then(() => {
            return cog.save();
        })
        .then(cogSaved => {
            cogSaved.voted = voted;
            return res.status(200).send({
                'error': false,
                'results': cogSaved,
            });
        })
        .catch(err => {
            if (err.message === 'EntryNotFound') {
                return res.status(404).send({
                    'error': 'EntryNotFound',
                    'error_details':
                        'There is no such cog, or it is being parsed currently',
                    'results': {},
                });
            }

            if (err.message === 'AlreadyVoted') {
                return res.status(400).send({
                    'error': 'AlreadyVoted',
                    'error_details': 'You have already voted for this cog',
                    'results': {},
                });
            }
            throw err;
        });
});

export { router };
