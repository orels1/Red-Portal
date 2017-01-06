/**
 * Repos backend. Used to add repos to DB, update them, list cogs, etc.
 */

import express from 'express';
let router = express.Router();
import rp from 'request-promise';
import {eachLimit} from 'async';
import {findWhere, where, extend} from 'underscore';
import atob from 'atob';
import Repo from 'models/repo';

// credentials
import config from 'backend/config.json'

/**
 * @apiDefine RepoRequestSuccess
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 * @apiSuccess (200) {String} results.id Id of the repo in DB
 * @apiSuccess (200) {String} results.name Name of the repo
 * @apiSuccess (200) {String} results.author Author of the repo
 * @apiSuccess (200) {String} results.short Short description of the repo
 * @apiSuccess (200) {String} results.description Full description of the repo
 * @apiSuccess (200) {Object} results.cogs List of cogs in a JS object
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {
 *               "_id": "21fsdkg9342ijhgh9sf0234",
 *               "name": "ORELS-Cogs",
 *               "author": "orels1",
 *               "short": "Mainly gaming/data oriented cogs",
 *               "description": "(orels1): Thanks for using my repo, hope you have fun!",
 *               "cogs": {
 *                   "dota": {
 *                        "author": "orels1",
 *                        "short": "Gets you item builds, hero info and more",
 *                        "description": "Dota 2 cog will get you the top item and skill-builds for any hero in game, as well as stats for your latest match + a dotabuff link. Enjoy",
 *                        "install_msg": "(orels1): Have fun!"
 *                    }
 *               },
 *               "parsed": true,
 *               "url": "https://github.com/orels1/ORELS-Cogs",
 *               "type": "approved"
 *           }
 *      }
 */

/**
 * @api {get} /repo/ List all repos
 * @apiVersion 0.0.1
 * @apiName getRepoList
 * @apiGroup repo
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
 *                       "_id": "21fsdkg9342ijhgh9sf0234",
 *                       "name": "ORELS-Cogs",
 *                       "author": "orels1",
 *                       "short": "Mainly gaming/data oriented cogs",
 *                       "description": "(orels1): Thanks for using my repo, hope you have fun!",
 *                       "cogs": {
 *                           "dota": {
 *                                "author": "orels1",
 *                                "short": "Gets you item builds, hero info and more",
 *                                "description": "Dota 2 cog will get you the top item and skill-builds for any hero in game, as well as stats for your latest match + a dotabuff link. Enjoy"
 *                                "disabled": false,
 *                                "install_msg": "(orels1): Have fun!"
 *                            }
 *                       },
 *                       "parsed": true,
 *                       "url": "https://github.com/orels1/ORELS-Cogs",
 *                       "type": "approved"
 *                   }
 *               ]
 *           }
 *      }
 */
router.get('/', (req, res) => {
    Repo.find({'parsed': true}, (err, entries) => {
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
 * @api {post} /repo/ Add new repo to DB
 * @apiVersion 0.0.1
 * @apiName postRepo
 * @apiGroup repo
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
 *              "id": "21fsdkg9342ijhgh9sf0234",
 *              "parsed": false,
 *              "url": "https://github.com/orels1/ORELS-Cogs"
 *          }
 *      }
 */
router.post('/', (req, res) => {
    // Check if we have that entry already
    Repo.findOne({
        'url': req.body.url
    }, (err, entry) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                'error': 'DBError',
                'error_details': 'Could not check for entry',
                'results': {},
            });
        }
        if (entry) {
            // if exists return id for future requests
            return res.status(400).send({
                'error': 'EntryExists',
                'error_details': 'This repo already exists',
                'results': {'id': entry._id},
            });
        }
        return new Repo({
            'url': req.body.url,
            'type': req.body.type
        }).save((err, entry) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    'error': 'DBError',
                    'error_details': 'Could not save new entry',
                    'results': {},
                });
            }
            return res.status(200).send({
                'error': false,
                'results': entry,
            });
        });
    });
});

/**
 * @api {get} /repo/:repoName Get repo
 * @apiVersion 0.0.1
 * @apiName getRepo
 * @apiGroup repo
 *
 * @apiParam {String} repoName name of the repo to get
 *
 * @apiUse DBError
 * @apiUse RepoRequestSuccess
 * @apiUse EntryNotFound
 */
router.get('/:repoName', (req, res) => {
    Repo.findOne({
        'name': req.params.repoName,
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
 * @api {put} /repo/:id Update repo
 * @apiVersion 0.0.1
 * @apiName putRepo
 * @apiGroup repo
 *
 * @apiParam {String} id Repo id in DB
 * @apiParam {String} url New repo url
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *          "url": "https://github.com/orels1/ORELS-C",
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
                'error_details': 'There is no such repo',
                'results': {},
            });
        }
        // update with the new values
        entry.url = req.body.url;
        entry.parsed = false;
        return entry.save((err, entry) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    'error': 'DBError',
                    'error_details': 'Could not update entry',
                    'results': {},
                });
            }
            return res.status(200).send({
                'error': false,
                'results': entry,
            });
        });
    });
});

/**
 * @api {delete} /repo/:id Delete repo by id
 * @apiVersion 0.0.1
 * @apiName deleteRepo
 * @apiGroup repo
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
            console.log(err);
            return res.status(500).send({
                'error': 'DBError',
                'error_details': 'Could not get entry',
                'results': {},
            });
        }
        if (!entry) {
            // if does not exist - return NotFound
            return res.status(400).send({
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

function repoParserTask(cb) {
    return Repo.find({})
        .exec((err, repos) => {
            if (err) {
                console.log(err);
                return cb(err);
            }

            if (!repos) {
                // nothing to do here
                return cb();
            }

            for (let repo of repos) {
                repoParser(repo, (err) => {
                    if (err) {
                        return cb(err);
                    }
                    return cb();
                })
            }
        })
}

function githubParser(url, callback) {
    let options = {
        uri: url.replace('github.com', 'api.github.com/repos') + '/contents',
        headers: {
            'User-Agent': 'Red-Portal',
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': config.githubToken,
        },
        json: true,
    };

    let result = {cogs: {}};

    rp(options)
        .then((repo) => {
            // get info.json
            let repoOpts = {
                headers: {
                    'User-Agent': 'Red-Portal',
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': config.githubToken,
                },
                    json: true,
            };
            let repoInfo = findWhere(repo, {name:'info.json'});
            repoOpts.uri = repoInfo.url;
            rp(repoOpts)
                .then((infoJSON) => {
                    let content = JSON.parse(atob(infoJSON.content));

                    // add the main info.json to the result
                    result.author = encodeURIComponent(content.AUTHOR);
                    result.name = encodeURIComponent(content.NAME);
                    result.short = encodeURIComponent(content.SHORT);
                    result.description = encodeURIComponent(content.DESCRIPTION);
                    result.updateUrl = repoOpts.uri;

                    // get cogs
                    let cogsList = where(repo, {type: 'dir'});
                    let i = 1;
                    for (let folder of cogsList) {
                        // request cog's folder
                        let opts = {
                            headers: {
                                'User-Agent': 'Red-Portal',
                                'Accept': 'application/vnd.github.v3+json',
                                'Authorization': config.githubToken,
                            },
                            json: true,
                        };
                        opts.uri = folder.url;
                        rp(opts)
                            .then((cog) => {
                                // find info.json
                                let cogOpts = {
                                    headers: {
                                        'User-Agent': 'Red-Portal',
                                        'Accept': 'application/vnd.github.v3+json',
                                        'Authorization': config.githubToken,
                                    },
                                    json: true,
                                };
                                let cogInfo = findWhere(cog, {name:'info.json'});
                                if (!cogInfo) {
                                    console.log('No info.json!');
                                    return callback('No info.json!');
                                }
                                cogOpts.uri = cogInfo.url;


                                rp(cogOpts)
                                    .then((infoJSON) => {
                                        let cog = JSON.parse(atob(infoJSON.content));
                                        // add the cog info to the result
                                        result.cogs[folder.name] = {};
                                        result.cogs[folder.name].name = encodeURIComponent(cog.NAME);
                                        result.cogs[folder.name].author = encodeURIComponent(cog.AUTHOR);
                                        result.cogs[folder.name].short = encodeURIComponent(cog.SHORT);
                                        result.cogs[folder.name].description = encodeURIComponent(cog.DESCRIPTION);
                                        result.cogs[folder.name].install_msg = encodeURIComponent(cog.INSTALL_MSG);
                                        result.cogs[folder.name].updateUrl = cogOpts.uri;
                                        result.cogs[folder.name].repoUrl = url;

                                        if (i == cogsList.length) {
                                            // done
                                            return callback(null, result);
                                        }
                                        i++;
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        return callback(err);
                                    })
                            })
                            .catch((err) => {
                                console.log(err);
                                return callback(err);
                            });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    return callback(err);
                });
        })
        .catch((err) => {
            console.log(err);
            return callback(err);
        });
}

function repoParser(repo, cb) {
    githubParser(repo.url, (err, result) => {
        if (err){
            return cb(err);
        }
        repo = extend(repo, result);

        // console.log(repo);
        // set repo to parsed
        repo.parsed = true;
        repo.save((err, entry) => {
            if (err) {
                console.log(err);
                return cb(err);
            }
            return cb();
        });
    });
}

// repoParserTask((err) => {
//     if (err) {
//         return;
//     }
//     return console.log('done parsing', '\n ===============\n');
// });

export {router, repoParser};
