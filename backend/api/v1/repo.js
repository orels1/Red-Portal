/**
 * Repos backend. Used to add repos to DB, update them, list cogs, etc.
 */

import express from 'express';
let router = express.Router();
import Repo from 'models/repo';

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
 *                        "description": "Dota 2 cog will get you the top item and skill-builds for any hero in game, as well as stats for your latest match + a dotabuff link. Enjoy"
 *                        "disabled": false,
 *                        "install_msg": "(orels1): Have fun!"
 *                    }
 *               },
 *               "parsed": true,
 *               "url": "https://github.com/orels1/ORELS-Cogs"
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
 *                       "url": "https://github.com/orels1/ORELS-Cogs"
 *                   }
 *               ]
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
 * @apiParam {String} url Cogs repo github URL
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *          "url": "https://github.com/orels1/ORELS-Cogs"
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
            'url': req.body.url
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
router.get('/:optionName', (req, res) => {
    Config.findOne({
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

export {router};
