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
    Repo.aggregate([
        {$match: {
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

        let result = findWhere(cogs, {'id': req.params.cogName});

        if (!result) {
            // if does not exist - return NotFound
            return res.status(400).send({
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
    Repo.aggregate([
        {$match: {
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
                'error_details': 'Could not list entries',
                'results': {},
            });
        }

        // when got list of cogs - match with our term
        let search = filter(cogs[0].cogs, (cog) => {
            let re = new RegExp(req.params.term);
            return re.test(cog.id) || re.test(decodeURIComponent(cog.description));
        });

        return res.status(200).send({
            'error': false,
            'results': {
                'list': search,
            },
        });

    });
});

export {router};
