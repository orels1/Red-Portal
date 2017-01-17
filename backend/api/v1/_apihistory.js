/**
 * Created by orel- on 17/Jan/17.
 */
/**
 * @api {get} /cogs/ List all cogs
 * @apiVersion 0.0.1
 * @apiName getCogList
 * @apiGroup cogs
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

/**
 * @apiDefine CogRequestSuccess
 * @apiVersion 0.0.1
 *
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
 * @api {get} /cogs/repo/:repoName Get cogs from repo
 * @apiVersion 0.0.1
 * @apiName getCogFromRepo
 * @apiGroup cogs
 *
 * @apiParam {String} repoName Name of the repo containing the cog
 *
 * @apiUse DBError
 * @apiUse CogRequestSuccess
 * @apiUse EntryNotFound
 */

/**
 * @api {get} /cogs/cog/:repoName/:cogName Get cog
 * @apiVersion 0.0.1
 * @apiName getCog
 * @apiGroup cogs
 *
 * @apiParam {String} repoName Name of the repo containing the cog
 * @apiParam {String} cogName Name of the cog to get
 *
 * @apiUse DBError
 * @apiUse CogRequestSuccess
 * @apiUse EntryNotFound
 */

/**
 * @api {get} /cogs/search/:term Search for a cog
 * @apiVersion 0.0.1
 * @apiName searchCog
 * @apiGroup cogs
 *
 * @apiParam {String} term Term to search for
 *
 * @apiUse DBError
 * @apiUse CogRequestSuccess
 * @apiUse EntryNotFound
 */

/**
 * @apiDefine RepoRequestSuccess
 *
 * @apiVersion 0.0.1
 *
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
 *                        "description": "Dota 2 cog will get you the top item and skill-builds for any hero in game, as well as stats for your latest match + a dotabuff link. Enjoy",
 *                        "install_msg": "(orels1): Have fun!"
 *                    }
 *               },
 *               "parsed": true,
 *               "url": "https://github.com/orels1/ORELS-Cogs",
 *               "type": "approved"
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
 *                       "url": "https://github.com/orels1/ORELS-Cogs",
 *                       "type": "approved"
 *                   }
 *               ]
 *           }
 *      }
 */

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

/**
 * @api {put} /repo/:id Update repo
 * @apiVersion 0.0.1
 * @apiName putRepo
 * @apiGroup repo
 *
 * @apiHeader {string} Service-Token Admin-oriented service token
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

/**
 * @api {post} /repo/ Add new repo to DB
 * @apiVersion 0.0.1
 * @apiName postRepo
 * @apiGroup repo
 *
 * @apiHeader {string} Service-Token Admin-oriented service token
 *
 * @apiParam {String} url Repo github URL
 * @apiParam {String} type Repo type, either approved or beta
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *          "url": "https://github.com/orels1/ORELS-Cogs",
 *          "type": "approved"
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