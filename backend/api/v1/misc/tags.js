/**
 * Created by antonorlov on 30/01/2017.
 */
import express from 'express';
let router = express.Router();
import Cog from 'models/cog';
import {findWhere, sortBy} from 'underscore';

/**
 * @api {get} /misc/tags/top Gets all the tags in the descending order
 * @apiVersion 0.2.0
 * @apiName getPopularTags
 * @apiGroup misc
 *
 * @apiUse DBError
 *
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains results fo Request
 * @apiSuccess (200) {Array} results.list Contains the list of tags, ascending
 *
 * @apiUse EntryNotFound
 */
router.get('/top', (req, res) => {
    Cog.aggregate([
        {'$unwind': '$tags'},
        {'$group': {
            '_id': null,
            'tags': {
                '$push': '$tags',
            },
        }},
    ])
        .exec()
        .then((results) => {
            if (!results || !results[0] || results[0].length === 0) {
                return res.status(404).send({
                    'error': 'EntryNotFound',
                    'error_details': 'There are no tags in DB',
                    'restults': {},
                })
            }
            results = results[0];
            let top10 = [];
            for (let tag of results.tags) {
                let saved = findWhere(top10, {'name': tag});
                if (saved) {
                    saved.count += 1;
                } else {
                    top10.push({'name': tag, 'count': 1});
                }
            }
            top10 = sortBy(top10, (tag) => { return - tag.count;});
            res.status(200).send({
                'error': false,
                'results': {
                    'list': top10,
                },
            });
        })
        .catch((err) => {
            throw err;
        });
});

export {router};
