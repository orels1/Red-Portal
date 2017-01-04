/**
 * Configuration backend, used to save tokens and other sensitive data
 */

import express from 'express';
let router = express.Router();
import Config from 'models/config';

/**
 * @apiDefine ConfigRequestSuccess
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 * @apiSuccess (200) {String} results.id Id of the config entry in DB
 * @apiSuccess (200) {String} results.name Name of the setting
 * @apiSuccess (200) {String} results.value Value of the setting
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {
 *                  "_id": "21fsdkg9342ijhgh9sf0234",
 *                  "name": "twitter-consumer-key",
 *                  "value": "2sad21f2fxzcv23rszdvcs8219vsfd"
 *              }
 *      }
 */

/**
 * @api {get} /config/ List all configs
 * @apiVersion 0.0.1
 * @apiName getConfigList
 * @apiGroup config
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
 *                  "list": [
 *                      {
 *                          "_id": "21fsdkg9342ijhgh9sf0234",
 *                          "name": "twitter-consumer-key",
 *                          "value": "2sad21f2fxzcv23rszdvcs8219vsfd"
 *                      }
 *                  ]
 *              }
 *      }
 */
router.get('/', (req, res) => {
    Config.find({}, (err, entries) => {
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
 * @api {post} /config/ Create config entry
 * @apiVersion 0.0.1
 * @apiName postConfig
 * @apiGroup config
 *
 * @apiParam {String} name Config entry unique name
 * @apiParam {String} value Config entry value
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *          "name": "twitter-consumer-key",
 *          "value": "2sad21f2fxzcv23rszdvcs8219vsfd"
 *      }
 *
 * @apiUse DBError
 * @apiUse ConfigRequestSuccess
 *
 * @apiError (400) {Object} EntryExists Config entry with provided name is already in DB, send back entry id for updates
 *
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 400 BadRequest
 *      {
 *          "error": "ExtryExists",
 *          "error_details": "This config entry already exists",
 *          "results": {"id": "21dsa2t234tdsfsr141"}
 *      }
 */
router.post('/', (req, res) => {
    // Check if we have that entry already
    Config.findOne({
        'name': req.body.name
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
                'error_details': 'This config entry already exists',
                'results': {'id': entry._id},
            });
        }
        return new Config({
            'name': req.body.name,
            'value': req.body.value,
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
 * @api {get} /config/:optionName Get config entry value
 * @apiVersion 0.0.1
 * @apiName getConfig
 * @apiGroup config
 *
 * @apiParam {String} optionName Config entry name to return
 *
 * @apiUse DBError
 * @apiUse ConfigRequestSuccess
 * @apiUse EntryNotFound
 */
router.get('/:optionName', (req, res) => {
    Config.findOne({
        'name': req.params.optionName,
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
                'error_details': 'There is no such config entry',
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
 * @api {put} /config/ Update config entry value
 * @apiVersion 0.0.1
 * @apiName putConfig
 * @apiGroup config
 *
 * @apiParam {String} optionName Config entry unique name
 * @apiParam {String} value Config entry value
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *          "optionName": "twitter-consumer-key",
 *          "value": "2sad21f2fxzcv23rszdvcs8219vsfd"
 *      }
 *
 *
 * @apiUse DBError
 * @apiUse ConfigRequestSuccess
 * @apiUse EntryNotFound
 */
router.put('/', (req, res) => {
    // Check if we have that entry already
    Config.findOne({
        'name': req.body.optionName
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
                'error_details': 'There is no such config entry',
                'results': {},
            });
        }
        // update with the new values
        entry.value = req.body.value;
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
 * @api {delete} /config/:id Delete config entry by id
 * @apiVersion 0.0.1
 * @apiName deleteConfig
 * @apiGroup config
 *
 * @apiParam {String} id Config entry id
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
    Config.findByIdAndRemove(req.params.id, (err, entry) => {
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
                'error_details': 'There is no such config entry',
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
