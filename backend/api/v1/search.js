/**
 * Created by orel- on 27/Jan/17.
 */

import express from 'express';
let router = express.Router();
import {eachLimit} from 'async';
import {findWhere, where, extend, filter} from 'underscore';
import Repo from 'models/repo';
import Cog from 'models/cog';


/**
 * Escapes string for use with regexp
 * @param str
 * @returns String
 */
function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

/**
 * @api {get} /search/cogs/:term Search for a cog
 * @apiVersion 0.2.0
 * @apiName searchCog
 * @apiGroup search
 *
 * @apiDescription Supports offset and limit query params, by default set to offset=0 and limit=20
 *
 * @apiParam {String} term Term to search for
 *
 * @apiUse DBError
 * @apiUse EntryNotFound
 */
router.get('/cogs/:term', (req, res) => {
    let term = escapeRegExp(decodeURIComponent(req.params.term));
    let re = new RegExp(term, 'i');
    Cog.find({
        '$or': [
            {'name': re},
            {'tags': re},
        ],
        'hidden': false,
    })
        .exec()
        .then((cogs) => {
            if (cogs.length === 0) {
                return res.status(404).send({
                    'error': 'EntryNotFound',
                    'error_details': 'No results for this search',
                    'results': {},
                });
            }
            let offset = parseInt(req.query.offset || 0, 10),
                limit = parseInt(req.query.limit || 20, 10) + offset;

            return res.status(200).send({
                'error': false,
                'results': {
                    'list': cogs.slice(offset, limit),
                },
            });
        })
        .catch((err) => {
            throw err;
        });
});

/**
 * @api {get} /search/random/cog Get random cog
 * @apiVersion 0.2.0
 * @apiName getRandomCog
 * @apiGroup search
 *
 * @apiDescription The `limit` query params is supported (`1` by default)
 *
 * @apiUse DBError
 * @apiUse EntryNotFound
 */
router.get('/random/cog', (req, res) => {
    Cog.aggregate([
        {'$match': {'hidden': false}},
        {'$sample': {'size': parseInt(req.query.limit || 1, 10)}},
    ])
        .exec()
        .then((cogs) => {
            if (cogs.length === 0) {
                return res.status(404).send({
                    'error': 'EntryNotFound',
                    'error_details': 'There are no cogs to get random from',
                    'results': '',
                });
            }
            return res.status(200).send({
                'error': false,
                'results': {
                    'list': cogs,
                },
            });
        })
        .catch((err) => {
            throw err;
        });
});

/**
 * @api {get} /search/random/repo Get random repo
 * @apiVersion 0.2.0
 * @apiName getRandomRepo
 * @apiGroup search
 *
 * @apiDescription The `limit` query params is supported (`1` by default)
 *
 * @apiUse DBError
 * @apiUse EntryNotFound
 */
router.get('/random/repo', (req, res) => {
    Repo.aggregate([
        {'$sample': {'size': parseInt(req.query.limit || 1, 10)}},
    ])
        .exec()
        .then((repos) => {
            if (repos.length === 0) {
                return res.status(404).send({
                    'error': 'EntryNotFound',
                    'error_details': 'There are no repos to get random from',
                    'results': '',
                });
            }
            return res.status(200).send({
                'error': false,
                'results': {
                    'list': repos,
                },
            });
        })
        .catch((err) => {
            throw err;
        });
});

export {router};
