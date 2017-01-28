/**
 * Created by orel- on 27/Jan/17.
 */

import express from 'express';
let router = express.Router();
import Repo from 'models/repo';
import Cog from 'models/cog';
import {extend} from 'underscore';
import {parseCogs, parseRepos} from './utils/parsers';
import co from 'co';

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
router.put('/batch/parse', (req, res) => {
    Repo.find({})
        .exec()
        .then((repos) => {
            return co(parseRepos(repos))
                .then((repos) => {
                    for (let repo of repos) {
                        repo.save()
                            .then((repo) => {
                                co(parseCogs(repo))
                                    .then((cogs) => {
                                        for (let cog of cogs) {
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

                                                    return cog.save()
                                                        .then((cog) => {
                                                            return true;
                                                        })
                                                        .catch((err) => {
                                                            throw err;
                                                        });
                                                })
                                                .catch((err) => {
                                                    throw err;
                                                });
                                        }
                                        return true;
                                    })
                                    .catch((err) => {
                                        throw err;
                                    });
                            })
                            .catch((err) => {
                                throw err;
                            });
                    }
                })
                .catch((err) => {
                    throw err;
                });
        });
    res.status(200).send('Parsing started');
});


export {router};
