/**
 * Repos backend. Used to add repos to DB, update them, list cogs, etc.
 */

import express from 'express';
let router = express.Router();
import {eachLimit} from 'async';
import {findWhere, where, extend, filter} from 'underscore';
import Repo from 'models/repo';
import Cog from 'models/cog';
import Vote from 'models/vote';
import {parseCogs} from './utils/parsers';
import co from 'co';

/**
 * @apiDefine CogRequestSuccess
 *
 * @apiVersion 0.2.0
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
 * @apiSuccess (200) {Boolean} results.voted Cog vote status for request's IP
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
 *                  "repo": "cogs/repo/ORELS-Cogs/",
 *                  "self": "/cogs/cog/ORELS-Cogs/dota/",
 *                  "_update": "/api/v1/cogs/cog/ORELS-Cogs/dota/fetch",
 *                  "_repo": "/api/v1/repo/ORELS-Cogs",
 *                  "_self": "/api/v1/cogs/cog/ORELS-Cogs/dota"
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
 *              "voted": false,
 *              "votes": 0,
 *              }
 *          }
 *      }
 */

/**
 * @api {get} /cogs/ List all cogs
 * @apiVersion 0.2.0
 * @apiName getCogList
 * @apiGroup cogs
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
 *                       "links": {
 *                           "github": {
 *                               "_update": "https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master",
 *                               "repo": "https://github.com/orels1/ORELS-Cogs",
 *                               "self": "https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py"
 *                           },
 *                           "repo": "cogs/repo/ORELS-Cogs/",
 *                           "self": "/cogs/cog/ORELS-Cogs/dota/",
 *                           "_update": "/api/v1/cogs/cog/ORELS-Cogs/dota/fetch",
 *                           "_repo": "/api/v1/repo/ORELS-Cogs",
 *                           "_self": "/api/v1/cogs/cog/ORELS-Cogs/dota"
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
 *                        "voted": false,
 *                        "votes": 0
 *                   }
 *               ]
 *           }
 *      }
 */
router.get('/', (req, res) => {
    Cog.find({})
        .exec()
        .then((cogs) => {
            res.status(200).send({
                'error': false,
                'results': {
                    'list': cogs,
                }
            })
        })
        .catch((err) => {
            throw err;
        })
});

/**
 * @api {get} /cogs/:author/:repoName Get cogs from repo
 * @apiVersion 0.2.0
 * @apiName getCogFromRepo
 * @apiGroup cogs
 *
 * @apiParam {String} author Cog author github username
 * @apiParam {String} repoName Name of the repo containing the cog
 *
 * @apiUse DBError
 * @apiUse CogRequestSuccess
 * @apiUse EntryNotFound
 */
router.get('/:author/:repoName', (req, res) => {
    Cog.find({
        'author.username': req.params.author,
        'repo.name': req.params.repoName
    }).exec()
        .then((cogs) => {

            if (!cogs) {
                // if does not exist - return NotFound
                return res.status(404).send({
                    'error': 'EntryNotFound',
                    'error_details': 'There is no such cog, or it is being parsed currently',
                    'results': {},
                });
            }

            return res.status(200).send({
                'error': false,
                'results': cogs,
            });
        })
        .catch((err) => {
            throw err;
        })
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
    Cog.findOne({
        'name': req.params.cogName,
        'author.username': req.params.author,
        'repo.name': req.params.repoName
    }).exec()
        .then((cog) => {

            if (!cog) {
                // if does not exist - return NotFound
                return res.status(404).send({
                    'error': 'EntryNotFound',
                    'error_details': 'There is no such cog, or it is being parsed currently',
                    'results': {},
                });
            }

            // check if voted for cog
            Vote.findOne({
                'repo': req.params.repoName,
                'cog': req.params.cogName
            }).exec()
                .then((vote) => {
                    cog.voted = vote && vote.IPs.indexOf(req.ip) != -1;

                    return res.status(200).send({
                        'error': false,
                        'results': cog,
                    });
                })
                .catch((err) => {
                    throw err;
                });
        })
        .catch((err) => {
            throw err;
        })
});

/**
 * @api {put} /cogs/:author/:repoName/fetch Parse new cogs
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
router.put('/:author/:repoName/parse', (req, res) => {
    Repo.findOne({
        'author.username': req.params.author,
        'name': req.params.repoName
    })
        .exec()
        .then((repo) => {
            co(parseCogs(repo))
                .then((cogs) => {
                    for (let cog of cogs) {
                        // check if we have such cog
                        Cog.findOne({
                            'name': cog.name,
                            'author.username': cog.author.username,
                            'repo.name': cog.repo.name
                        })
                            .exec()
                            .then((dbCog) => {
                                if (!dbCog) {
                                    cog = new Cog(cog);
                                } else {
                                    cog = extend(dbCog, cog);
                                }

                                return cog.save()
                                    .then((cog) => {
                                        return true;
                                    })
                                    .catch((err) => {
                                        throw err;
                                    })
                            })
                            .catch((err) => {
                                throw err;
                            })
                    }
                })
                .catch((err) => {
                    throw err;
                })
        });
    res.status(200).send('Parsing started');
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
 * TODO: Refactor
 */
router.get('/:author/:repoName/:cogName/vote', (req, res) => {
    Cog.findOne({
        'name': req.params.cogName,
        'author.username': req.params.author,
        'repo.name': req.params.repoName
    }).exec()
        .then((cog) => {

            if (!cog) {
                // if does not exist - return NotFound
                return res.status(404).send({
                    'error': 'EntryNotFound',
                    'error_details': 'There is no such cog, or it is being parsed currently',
                    'results': {},
                });
            }

            return Vote.findOne({
                'username': req.params.author,
                'repo': req.params.repoName,
                'cog': req.params.cogName
            }).exec()
                .then((vote) => {
                    if (!vote) {
                        vote = new Vote({
                            'username': req.params.author,
                            'repo': req.params.repoName,
                            'cog': req.params.cogName
                        });
                    }

                    if (vote.IPs.indexOf(req.ip) != -1 && req.query.choice === '1') {
                        return res.status(400).send({
                            'error': 'AlreadyVoted',
                            'error_details': 'You have already voted for this cog',
                            'results': {},
                        });
                    } else {
                        let voted = false;
                        // vote and save IP
                        if (req.query.choice === '1') {
                            cog.votes += 1;
                            voted = true;
                            vote.IPs.push(req.ip);

                        // only decrease votes if IP is in DB
                        } else if (req.query.choice === '0' && vote.IPs.indexOf(req.ip) != -1) {
                            cog.votes -= 1;
                            let ipIndex = vote.IPs.indexOf(req.ip);
                            voted = false;
                            vote.IPs.splice(ipIndex, 1);
                        }

                        return vote.save()
                            .then((vote) => {
                                return cog.save()
                                    .then((cogSaved) => {
                                        cog.voted = voted;
                                        return res.status(200).send({
                                            'error': false,
                                            'results': cogSaved,
                                        });
                                    })
                                    .catch((err) => {
                                        throw err;
                                        })
                                })
                            .catch((err) => {
                                throw err;
                            })

                    }
                })
                .catch((err) => {
                    throw err;
                });
    })
        .catch((err) => {
            throw err;
        })

});

export {router};
