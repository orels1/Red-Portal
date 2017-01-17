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
 *
 * @apiVersion 0.1.0
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
 *                  "_self": "/api/v1/repo/ORELS-Cogs",
 *                  "_update": "/api/v1/repo/ORELS-Cogs/fetch",
 *                  "self": "cogs/repo/ORELS-Cogs/",
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
 *              }
 *          }
 *      }
 */

/**
 * @api {get} /repo/ List all repos
 * @apiVersion 0.1.0
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
 *                       "_id": "587d62b4c54cad51845ae101",
 *                       "name": "ORELS-Cogs",
 *                       "__v": 4,
 *                       "description": "Repository of mainly gaming/data based cogs, with a bit of some fun stuff. Use as you like.",
 *                       "short": "Data scraping cogs with a bit of extra",
 *                       "links": {
 *                           "_self": "/api/v1/repo/ORELS-Cogs",
 *                           "_update": "/api/v1/repo/ORELS-Cogs/fetch",
 *                           "self": "cogs/repo/ORELS-Cogs/",
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
 *                       }
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
 * @apiVersion 0.1.0
 * @apiName postRepo
 * @apiGroup repo
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
 *                  "url": "https://github.com/orels1"
 *              }
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

        let name = req.body.url.substr(req.body.url.lastIndexOf('/') + 1),
            authorUrl = req.body.url.substr(0, req.body.url.lastIndexOf('/'));
        return new Repo({
            'name': name,
            'author': {
                'url': authorUrl,
            },
            'links': {
                'github': {
                    'self': req.body.url,
                },
            },
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
 * @apiVersion 0.1.0
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
 * @api {put} /repo/admin/parse Parse new repos
 * @apiVersion 0.0.1
 * @apiName parseRepos
 * @apiGroup repo
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
 *          "results": 'Successfully parsed and saved 8 repos',
 *      }
 */
router.put('/admin/parse', (req, res) => {
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
 * @api {put} /repo/admin/fetch Parse again
 * @apiVersion 0.0.1
 * @apiName fetchRepos
 * @apiGroup repo
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
 *          "results": 'Successfully parsed and saved 8 repos',
 *      }
 */
router.put('/admin/fetch', (req, res) => {
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
 * @apiVersion 0.1.0
 * @apiName putRepo
 * @apiGroup repo
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
        entry = extend(entry, req.body);
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

function* getCogs(githubRepo, repo) {
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
            'name': cog.name,
            'repo': {
                'name': repo.name,
                'type': repo.type,
            },
            'author': repo.author,
            'short': infoJsonContents.content.SHORT || null,
            'description': infoJsonContents.content.DESCRIPTION || null,
            'links': {
                '_self': `/api/v1/cogs/cog/${repo.name}/${cog.name}`,
                '_repo': repo.links._self,
                '_update': `/api/v1/cogs/cog/${repo.name}/${cog.name}/fetch`,
                'self': `/cogs/cog/${repo.name}/${cog.name}/`,
                'repo': repo.links.self,
                'github': {
                    'self': `${repo.links.github.self}/blob/master/${cog.name}/${cog.name}.py`,
                    'repo': repo.links.github.self,
                    '_update': infoJsonContents.updateUrl,
                },
            },
        };

        index ++;
    }

    return cogs;
}

function* encodeValues(object) {
    // encode main fields
    for (let key of Object.keys(object)) {
        if (key !== 'cogs' && key !== 'url' && key !== 'updateUrl') {
            object[key] = JSON.stringify(object[key]);
        }
    }

    // encode cogs
    for (let cog of object.cogs) {
        for (let key of Object.keys(cog)) {
            if (key !== 'updateUrl' && key !== 'repoUrl') {
                cog[key] = JSON.stringify(cog[key]);
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
            githubRepo = yield* getGithubRepo(repo.links.github.self);
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
            'name': repo.name,
            'author': {
                'name': repoInfoJson.content.AUTHOR,
                'url': repo.author.url,
            },
            'short': repoInfoJson.content.SHORT || undefined,
            'description': repoInfoJson.content.DESCRIPTION || undefined,
            'links': {
                '_self': `/api/v1/repo/${repo.name}`,
                '_update': `/api/v1/repo/${repo.name}/fetch`,
                'self': `/cogs/repo/${repo.name}/`,
                'github': {
                    'self': repo.links.github.self,
                    '_update': repoInfoJson.updateUrl,
                }
            },
            'type': repo.type,
        };

        // get cogs list
        let cogs;

        try {
            cogs = yield* getCogs(githubRepo, result);
        } catch (e) {
            return e;
        }

        result.cogs = cogs;

        // TODO: figure out if it's still needed
        // encode everything
        // let resultEncoded;
        //
        // try {
        //     resultEncoded = yield* encodeValues(result);
        // } catch (e) {
        //     return e;
        // }

        result.parsed = true;

        repo = extend(repo, result);

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
