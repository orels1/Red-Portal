/**
 * Created by orel- on 27/Jan/17.
 */

import express from 'express';
let router = express.Router();
import Repo from 'models/repo';
import Cog from 'models/cog';


/**
 * @apiDefine CountRequestSuccess
 *
 * @apiVersion 0.2.0
 *
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 * @apiSuccess (200) {Number} results.count The amount of requested items in the DB
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {
 *              "count": 10
 *          }
 *      }
 *
 */

/**
 * @api {get} /count/ Count cogs in DB
 * @apiVersion 0.2.0
 * @apiName getTotalCount
 * @apiGroup misc
 *
 * @apiUse DBError
 *
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 * @apiSuccess (200) {Object} results.count The amount of requested items in the DB
 * @apiSuccess (200 {Number} results.count.repos The amount of repos in DB
 * @apiSuccess (200 {Number} results.count.cogs The amount of cogs in DB
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {
 *              "count": {
 *                  "repos": 2,
 *                  "cogs": 16
 *              }
 *          }
 *      }
 */
router.get('/', (req, res) => {
    Cog.count()
        .exec()
        .then((cogCount) => {
            return Repo.count()
                .exec()
                .then((repoCount) => {
                    return res.status(200).send({
                        'error': false,
                        'results': {
                            'count': {
                                'repos': repoCount,
                                'cogs': cogCount
                            }
                        }
                    })
                })
                .catch((err) => {
                    throw err;
                })
        })
        .catch((err) => {
            throw err;
        });
});

/**
 * @api {get} /count/cogs Count cogs in DB
 * @apiVersion 0.2.0
 * @apiName getCogsCount
 * @apiGroup misc
 *
 * @apiUse DBError
 * @apiUse CountRequestSuccess
 */
router.get('/cogs', (req, res) => {
    Cog.count()
        .exec()
        .then((count) => {
            return res.status(200).send({
                'error': false,
                'results': {
                    'count': count
                }
            })
        })
        .catch((err) => {
            throw err;
        });
});

/**
 * @api {get} /count/repos Count repos in DB
 * @apiVersion 0.2.0
 * @apiName getReposCount
 * @apiGroup misc
 *
 * @apiUse DBError
 * @apiUse CountRequestSuccess
 */
router.get('/repos', (req, res) => {
    Repo.count()
        .exec()
        .then((count) => {
            return res.status(200).send({
                'error': false,
                'results': {
                    'count': count
                }
            })
        })
        .catch((err) => {
            throw err;
        });
});

export {router};
