/**
 * Repos backend. Used to add repos to DB, update them, list cogs, etc.
 */

import express from 'express';
let router = express.Router();
import {eachLimit} from 'async';
import {findWhere, where, extend, filter} from 'underscore';
import Repo from 'models/repo';

/**
 * @apiDefine CogRequestSuccess
 *
 * @apiVersion 0.1.0
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
 *              "author": {
 *                  "url": "https://github.com/orels1",
 *                  "name": "orels"
 *              },
 *              "repo": {
 *                  "type": "unapproved",
 *                  "name": "ORELS-Cogs"
 *              },
 *              "name": "dota"
 *              }
 *          }
 *      }
 */

/**
 * @api {get} /cogs/ List all cogs
 * @apiVersion 0.1.0
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
 *                        "author": {
 *                            "url": "https://github.com/orels1",
 *                            "name": "orels"
 *                        },
 *                        "repo": {
 *                            "type": "unapproved",
 *                            "name": "ORELS-Cogs"
 *                        },
 *                        "name": "dota"
 *                   }
 *               ]
 *           }
 *      }
 */
router.get('/', (req, res) => {
    Repo.aggregate([
        {$match: {
            'cogs' : {$exists: true, $not: {$size: 0}}
        }},
        {$unwind: "$cogs"},
        {$group: {_id: null, cgs: {$push: "$cogs"}}},
        {$project: {_id: 0, cogs: "$cgs"}}
    ]).exec((err, repos) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                'error': 'DBError',
                'error_details': 'Could not list entries'
            });
        }
        let cogs = [];
        let i = 1;
        for (let repo of repos) {
            cogs = cogs.concat(repo.cogs);
        }

        res.status(200).send({
            'error': false,
            'results': {
                'list': cogs,
            }
        })

    });
});

/**
 * @api {get} /cogs/repo/:repoName Get cogs from repo
 * @apiVersion 0.1.0
 * @apiName getCogFromRepo
 * @apiGroup cogs
 *
 * @apiParam {String} repoName Name of the repo containing the cog
 *
 * @apiUse DBError
 * @apiUse CogRequestSuccess
 * @apiUse EntryNotFound
 */
router.get('/repo/:repoName', (req, res) => {
    Repo.aggregate([
        {$match: {
            'name': req.params.repoName,
            'cogs' : {$exists: true, $not: {$size: 0}}
        }},
        {$unwind: "$cogs"},
        {$group: {_id: null, cgs: {$push: "$cogs"}}},
        {$project: {_id: 0, cogs: "$cgs"}}
    ]).exec((err, cogs) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                'error': 'DBError',
                'error_details': 'Could not check for entry',
                'results': {},
            });
        }

        cogs = cogs[0].cogs;

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
    });
});

/**
 * @api {get} /cogs/cog/:repoName/:cogName Get cog
 * @apiVersion 0.1.0
 * @apiName getCog
 * @apiGroup cogs
 *
 * @apiParam {String} repoName Name of the repo containing the cog
 * @apiParam {String} cogName Name of the cog to get
 *
 * @apiUse DBError
 * @apiUse CogRequestSuccess
 * @apiUse EntryNotFound
 */
router.get('/cog/:repoName/:cogName', (req, res) => {
    Repo.aggregate([
        {$match: {
            'name': req.params.repoName,
            'cogs' : {$exists: true, $not: {$size: 0}}
        }},
        {$unwind: "$cogs"},
        {$group: {_id: null, cgs: {$push: "$cogs"}}},
        {$project: {_id: 0, cogs: "$cgs"}}
    ]).exec((err, cogs) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                'error': 'DBError',
                'error_details': 'Could not check for entry',
                'results': {},
            });
        }

        cogs = cogs[0].cogs;

        let result = findWhere(cogs, {'name': req.params.cogName});

        if (!result) {
            // if does not exist - return NotFound
            return res.status(404).send({
                'error': 'EntryNotFound',
                'error_details': 'There is no such cog, or it is being parsed currently',
                'results': {},
            });
        }

        return res.status(200).send({
            'error': false,
            'results': result,
        });
    });
});

/**
 * @api {get} /cogs/search/:term Search for a cog
 * @apiVersion 0.1.0
 * @apiName searchCog
 * @apiGroup cogs
 *
 * @apiDescription Supports offset and limit query params, by default set to offset=0 and limit=20
 *
 * @apiParam {String} term Term to search for
 *
 * @apiUse DBError
 * @apiUse CogRequestSuccess
 * @apiUse EntryNotFound
 */
router.get('/search/:term', (req, res) => {
    Repo.aggregate([
        {$match: {
            'cogs' : {$exists: true, $not: {$size: 0}}
        }},
        {$unwind: "$cogs"},
        {$group: {_id: null, cgs: {$push: "$cogs"}}},
        {$project: {_id: 0, cogs: "$cgs"}},
    ]).exec((err, cogs) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                'error': 'DBError',
                'error_details': 'Could not list entries',
                'results': {},
            });
        }

        // when got list of cogs - match with our term
        let search = filter(cogs[0].cogs, (cog) => {
            let re = new RegExp(req.params.term, 'i');
            return re.test(cog.id) || re.test(cog.description) || re.test(cog.short);
        });

        if (!search || search.length === 0) {
            return res.status(404).send({
                'error': 'EntryNotFound',
                'error_details': 'No results for this search',
                'results': {},
            })
        }

        return res.status(200).send({
            'error': false,
            'results': {
                'list': search.slice(
                    parseInt(req.query.offset, 10) || 0,
                    (parseInt(req.query.limit, 10) || 20) + parseInt(req.query.offset, 10)),
            },
        });

    });
});

export {router};
