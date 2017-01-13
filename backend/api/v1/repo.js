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
import co from 'co';

let config = {
    'githubToken': process.env.githubToken,
};

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
    Repo.find({'parsed': true})
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
 * @api {get} /repo/admin/parse Parse new repos
 * @apiVersion 0.0.1
 * @apiName parseRepos
 * @apiGroup repo
 *
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
 *          "results": 'Successfully parsed and saved 8 repos',
 *      }
 */
router.get('/admin/parse', (req, res) => {
    co(parseRepo({'parsed': false}))
        .then((message) => {
            return res.status(200).send({
                'error': false,
                'results': message,
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send({
                'error': 'DBError',
                'error_details': 'Could not parse entries',
                'results': {},
            });
        });
});

/**
 * @api {get} /repo/admin/fetch Parse again
 * @apiVersion 0.0.1
 * @apiName fetchRepos
 * @apiGroup repo
 *
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
 *          "results": 'Successfully parsed and saved 8 repos',
 *      }
 */
router.get('/admin/fetch', (req, res) => {
    co(parseRepo({'parsed': true}))
        .then((message) => {
            return res.status(200).send({
                'error': false,
                'results': message,
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send({
                'error': 'DBError',
                'error_details': 'Could not parse entries',
                'results': {},
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

// Repo parsing

function* getRepos(match) {
    let repos = yield Repo.find(match);

    return repos;
}

function* getGithubRepo(url) {
    url = url.replace('github.com', 'api.github.com/repos') + '/contents'
    let options = {
        headers: {
            'User-Agent': 'Red-Portal',
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': config.githubToken,
        },
        json: true,
        uri: url,
    };

    let githubRepo = yield rp(options);

    return githubRepo;
}

function* getInfoJson(repo) {
    let infoJsonDescription = findWhere(repo, {'name': 'info.json'});

    // check if info.json is present, if it's not - skip cog
    if (!infoJsonDescription) {
        return {
            'content': null,
        };
    }

    let options = {
        headers: {
            'User-Agent': 'Red-Portal',
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': config.githubToken,
        },
        json: true,
        uri: infoJsonDescription.url,
    };

    let infoJsonObject = yield rp(options);

    let infoJsonContents;

    try {
        infoJsonContents = yield JSON.parse(atob(infoJsonObject.content));
    } catch (e) {
        return e;
    }

    return {
        'updateUrl': infoJsonDescription.url,
        'content': infoJsonContents,
    };
}

function* getCogs(githubRepo, repoUrl, repoType) {
    let cogsList = yield where(githubRepo, {'type': 'dir'});

    let cogs = [];

    let index = 0;
    for (let cog of cogsList) {
        let options = {
            headers: {
                'User-Agent': 'Red-Portal',
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': config.githubToken,
            },
            json: true,
            uri: cog.url,
        };

        let cogDir = yield rp(options);

        let infoJsonContents = yield* getInfoJson(cogDir);

        // if there is no info.json - ignore cog
        if (!infoJsonContents.content) {
            continue;
        }

        cogs[index] = {
            'id': cog.name,
            'name': infoJsonContents.content.NAME,
            'author': infoJsonContents.content.AUTHOR,
            'short': infoJsonContents.content.SHORT || null,
            'description': infoJsonContents.content.DESCRIPTION || null,
            'updateUrl': infoJsonContents.updateUrl,
            'repoUrl': repoUrl,
            'repoType': repoType,
        };

        index ++;
    }

    return cogs;
}

function* encodeValues(object) {
    // encode main fields
    for (let key of Object.keys(object)) {
        if (key !== 'cogs' && key !== 'url' && key !== 'updateUrl') {
            object[key] = encodeURIComponent(object[key]);
        }
    }

    // encode cogs
    for (let cog of object.cogs) {
        for (let key of Object.keys(cog)) {
            if (key !== 'updateUrl' && key !== 'repoUrl') {
                cog[key] = encodeURIComponent(cog[key]);
            }
        }
    }


    return object;
}

function* parseRepo(match) {
    let result;

    // get repo from the DB by the match
    let repos;

    try {
        repos = yield* getRepos(match);
    } catch (e) {
        return e;
    }

    for (let repo of repos) {
        // get repo object from github
        let githubRepo;

        try {
            githubRepo = yield* getGithubRepo(repo.url);
        } catch (e) {
            return e;
        }

        // find, get and parse info.json for the repo
        let repoInfoJson;

        try {
            repoInfoJson = yield* getInfoJson(githubRepo);
        } catch (e) {
            return e;
        }

        // save repo info
        result = {
            'name': repoInfoJson.content.NAME,
            'author': repoInfoJson.content.AUTHOR,
            'short': repoInfoJson.content.SHORT || null,
            'description': repoInfoJson.content.DESCRIPTION || null,
            'url': repo.url,
            'updateUrl': repoInfoJson.updateUrl,
        };

        // get cogs list
        let cogs;

        try {
            cogs = yield* getCogs(githubRepo, repo.url, repo.type);
        } catch (e) {
            return e;
        }

        result.cogs = cogs;

        // encode everything
        let resultEncoded;

        try {
            resultEncoded = yield* encodeValues(result);
        } catch (e) {
            return e;
        }

        resultEncoded.parsed = true;

        repo = extend(repo, resultEncoded);

        // save
        let repoSaved;

        try {
            repoSaved = yield repo.save();
        } catch (e) {
            return e;
        }
    }

    return `Successfully parsed and saved ${repos.length} repos`;

}

export {router, parseRepo};
