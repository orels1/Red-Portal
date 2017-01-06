/**
 * Repos backend. Used to add repos to DB, update them, list cogs, etc.
 */

import express from 'express';
let router = express.Router();
import rp from 'request-promise';
import {eachLimit} from 'async';
import {findWhere, where, extend, filter} from 'underscore';
import Repo from 'models/repo';

// credentials
import config from 'backend/config.json'

/**
 * @apiDefine CogRequestSuccess
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
 *               "dota": {
 *                    "author": "orels1",
 *                    "short": "Gets you item builds, hero info and more",
 *                    "description": "Dota 2 cog will get you the top item and skill-builds for any hero in game, as well as stats for your latest match + a dotabuff link. Enjoy",
 *                   "install_msg": "(orels1): Have fun!"
 *                }
 *           }
 *      }
 */

/**
 * @api {get} /cog/ List all cogs
 * @apiVersion 0.0.1
 * @apiName getCogList
 * @apiGroup cog
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
 *               "list":
 *                   {
 *                       "dota": {
 *                            "author": "orels1",
 *                            "short": "Gets you item builds, hero info and more",
 *                            "description": "Dota 2 cog will get you the top item and skill-builds for any hero in game, as well as stats for your latest match + a dotabuff link. Enjoy"
 *                            "install_msg": "(orels1): Have fun!"
 *                        }
 *                   }
 *           }
 *      }
 */
router.get('/', (req, res) => {
    Repo.find({}, (err, entries) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                'error': 'DBError',
                'error_details': 'Could not list entries',
                'results': {},
            });
        }
        let cogs = {};
        let i = 1;
        for (let entry of entries) {
            extend(cogs, entry.cogs);
            if (i === entries.length) {
                return res.status(200).send({
                    'error': false,
                    'results': {
                        'list': cogs,
                    },
                });
            }
            i++;
        }

    });
});

/**
 * @api {get} /cog/:cogName Get cog
 * @apiVersion 0.0.1
 * @apiName getCog
 * @apiGroup cog
 *
 * @apiParam {String} cogName Name of the cog to get
 *
 * @apiUse DBError
 * @apiUse CogRequestSuccess
 * @apiUse EntryNotFound
 */
router.get('/:cogName', (req, res) => {
    Repo.find({}, (err, entries) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                'error': 'DBError',
                'error_details': 'Could not check for entry',
                'results': {},
            });
        }
        let i = 1;
        for (let entry of entries) {
            if (req.params.cogName in entry.cogs) {
                return res.status(200).send({
                    'error': false,
                    'results': entry.cogs[req.params.cogName],
                });
            }

            if (i === entries.length) {
                // if does not exist - return NotFound
                return res.status(400).send({
                    'error': 'EntryNotFound',
                    'error_details': 'There is no such cog, or it is being parsed currently',
                    'results': {},
                });
            }
            i++
        }

    });
});

/**
 * @api {get} /cog/search/:term Search for a cog
 * @apiVersion 0.0.1
 * @apiName searchCog
 * @apiGroup cog
 *
 * @apiParam {String} term Term to search for
 *
 * @apiUse DBError
 * @apiUse CogRequestSuccess
 * @apiUse EntryNotFound
 */
router.get('/search/:term', (req, res) => {
    Repo.find({}, (err, entries) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                'error': 'DBError',
                'error_details': 'Could not list entries',
                'results': {},
            });
        }
        let cogs = {};
        let i = 1;
        for (let entry of entries) {
            extend(cogs, entry.cogs);
            if (i === entries.length) {
                // when got list of cogs - match with our term
                let search = filter(Object.keys(cogs), (cog) => {
                    let re = new RegExp(req.params.term);
                    return re.test(cog) || re.test(decodeURIComponent(cogs[cog].description));
                });

                let response = [];

                for (let result of search) {
                    cogs[result].id = result;
                    response.push(cogs[result]);
                }

                return res.status(200).send({
                    'error': false,
                    'results': {
                        'list': response,
                    },
                });
            }
            i++;
        }

    });
});

export {router};
