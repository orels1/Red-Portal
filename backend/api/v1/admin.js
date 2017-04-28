/**
 * Created by orel- on 27/Jan/17.
 */

import express from 'express';
let router = express.Router();
import Repo from 'models/repo';
import Config from 'models/config';
import Cog from 'models/cog';
import {extend} from 'underscore';
import {parseCogs, parseRepos} from './utils/parsers';
import co from 'co';
import {authorize} from './auth';

/**
 * @api {put} /admin/batch/parse Parse all repos in batch
 * @apiVersion 0.2.0
 * @apiName adminBatchParseRepos
 * @apiGroup admin
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
 *          "results": 'Parsing started',
 *      }
 */
// TODO: replace loops with generators
router.put('/batch/parse', (req, res) => {
    res.status(200).send({
        'error': false,
        'results': 'Parsing started',
    });
    return repoParser();
});

/**
 * Parses all repos and cogs in batch
 */
// TODO: Refactor this mess
function repoParser() {
    Repo.find({})
        .exec()
        .then((repos) => {
            return co(parseRepos(repos));
        })
        .then((repos) => {
            for (let repo of repos) {
                repo.save()
                    .then((repo) => {
                        // Get cogs for current repo to filter missing cogs
                        return Cog.find({
                            'author.username': repo.author.username,
                            'repo.name': repo.name,
                        })
                            .exec()
                            .then((cogs) => {
                                // Remove unnecessary info from the cog we only need essentials
                                return {'repo': repo, 'cogs': cogs.length > 0 && cogs.map((cog) => {
                                    return {
                                        'name': cog.name,
                                        'author': {'username': cog.author.username},
                                        'repo': {'name': cog.repo.name}
                                    }
                                }) || false};
                            });
                    })
                    .then((data) => {
                        return co(parseCogs(data.repo, data.cogs));
                    })
                    .then((cogs) => {
                        // First - clear old cogs
                        for (let cog of cogs.missing) {
                            Cog.findOneAndRemove({
                                'name': cog.name,
                                'author.username': cog.author.username,
                                'repo.name': cog.repo.name,
                            }).exec();
                        }
                        return cogs;
                    })
                    .then((cogs) => {
                        for (let cog of cogs.parsed) {
                            // check if we have such cog
                            Cog.findOne({
                                'name': cog.name,
                                'author.username': cog.author.username,
                                'repo.name': cog.repo.name,
                            })
                                .exec()
                                .then((dbCog) => {
                                    if (!dbCog) {
                                        cog = new Cog(cog);
                                    } else {
                                        cog = extend(dbCog, cog);
                                    }

                                    return cog.save();
                                })
                                .catch((err) => {
                                    throw err;
                                });
                        }
                    })
                    .catch((err) => {
                        throw err;
                    });
            }
        })
        .then(() => {
            return Config.findOne({'name': 'last_updated'}).exec();
        })
        .then((entry) => {
            if (!entry) {
                return new Config({'name': 'last_updated', 'value': new Date()}).save();
            }
            entry.value = new Date();
            return entry.save();
        })
        .catch((err) => {
            throw err;
        });
}

router.put('/hide/:author/:repoName', (req, res) => {
    Repo.findOne({
        'author.username': req.params.author,
        'name': req.params.repoName,
    })
    .exec()
    .then((repo) => {
        repo.hidden = true;
        return repo.save();
    })
    .then(() => {
        return Cog.find({
            'author.username': req.params.author,
            'repo.name': req.params.repoName,
        }).exec();
    })
    .then((cogs) => {
        cogs.forEach((cog, index) => {
            cog.hidden = true;
            cog.save();
        });
        res.status(200).send({
            'error': false,
            'results': 'Repo hidden',
        });
    })
    .catch((err) => {
        throw err;
    });
});

router.put('/unhide/:author/:repoName', (req, res) => {
    Repo.findOne({
        'author.username': req.params.author,
        'name': req.params.repoName,
    })
    .exec()
    .then((repo) => {
        repo.hidden = false;
        return repo.save();
    })
    .then(() => {
        return Cog.find({
            'author.username': req.params.author,
            'repo.name': req.params.repoName,
        }).exec();
    })
    .then((cogs) => {
        cogs.forEach((cog, index) => {
            cog.hidden = false;
            cog.save();
            res.status(200).send({
                'error': false,
                'results': 'Repo will be shown now',
            });
        });
    })
    .catch((err) => {
        throw err;
    });
});

export {router, repoParser};
