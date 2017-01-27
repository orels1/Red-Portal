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
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
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
 * @apiUse CogRequestSuccess
 * @apiUse EntryNotFound
 */
router.get('/cogs/:term', (req, res) => {
    let term = escapeRegExp(decodeURIComponent(req.params.term));
    let re = new RegExp(term, 'i');
    Cog.find({
        $or: [
            {'name': re},
            {'tags': re}
        ]
    })
        .exec()
        .then((cogs) => {
            if (!cogs) {
                return res.status(404).send({
                    'error': 'EntryNotFound',
                    'error_details': 'No results for this search',
                    'results': {},
                })
            }
            let offset = parseInt(req.query.offset || 0),
                limit = parseInt(req.query.limit || 20) + offset;

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

export {router};