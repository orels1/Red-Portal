/*
* Webhooks backend. Used to create, manage and recieve data on webhooks
* */

import express from 'express';
let router = express.Router();
import Hook from 'models/hook';

/**
 * @apiDefine HookRequestSuccess
 *
 * @apiVersion 0.1.0
 *
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 * @apiSuccess (200) {String} results._id Id of the webhook in DB
 * @apiSuccess (200) {Object} results.links Contains relevant links
 * @apiSuccess (200) {String} results.links._self Link to this webhook API endpoint
 * @apiSuccess (200) {Date} results.created Creation date
 * @apiSuccess (200) {Date} results.last_used Last usage date
 * @apiSuccess (200) {Number} results.times_used Number of times webhook was invoked
 * @apiSuccess (200) {Object} results.repo Contains webhook repo info
 * @apiSuccess (200) {String} results.repo.name Name of the repo this webhook is connected
 * @apiSuccess (200) {String} results.repo._id ID of the repo this webhook is connected
 * @apiSuccess (200) {Object} results.repo.links Contains relevant links
 * @apiSuccess (200) {String} results.repo.links._self Link to the repo's API endpoint
 * @apiSuccess (200) {String} results.repo.links.self Link to the repo's webpage
 * @apiSuccess (200) {Object} results.repo.links.github Contains relevant github links
 * @apiSuccess (200) {String} results.repo.links.github.self Link to repo on github
 *
 * @apiSuccessExample {json} Success-Response
 *      HTTP/1.1 OK
 *      {
 *          "error": false,
 *          "results": {
 *              "_id": "587d62b4c54cad51845ae101",
 *              "links": {
 *                  "_self": "/api/v1/hooks/587d62b4c54cad51845ae101"
 *              },
 *              "created": "2017-01-19T22:33:01+03:00",
 *              "last_used": 2017-01-19T22:34:01+03:00,
 *              "times_used": 25,
 *              "repo": {
 *                  "name": "ORELS-Cogs",
 *                  "_id": "587d62b4c54cad51845ae101",
 *                  "links": {
 *                      "_self": "/api/v1/repo/ORELS-Cogs",
 *                      "self": "/cogs/repo/ORELS-Cogs/,
 *                      "github": {
 *                          "self": "https://github.com/orels1/ORELS-Cogs"
 *                      }
 *                  }
 *              }
 *          }
 *      }
 *
 * */

/**
 * @api {get} /hooks/ List all webhooks
 * @apiVersion 0.1.0
 * @apiName getHooksList
 * @apiGroup webhooks
 *
 * @apiUse DBError
 *
 * @apiHeader {string} Service-Token Admin-oriented service token
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
 *                       "_id": "587d62b4c54cad51845ae101",
 *                       "links": {
 *                           "_self": "/api/v1/hooks/587d62b4c54cad51845ae101"
 *                       },
 *                       "created": "2017-01-19T22:33:01+03:00",
 *                       "last_used": 2017-01-19T22:34:01+03:00,
 *                       "times_used": 25,
 *                       "repo": {
 *                           "name": "ORELS-Cogs",
 *                           "_id": "587d62b4c54cad51845ae101",
 *                           "links": {
 *                               "_self": "/api/v1/repo/ORELS-Cogs",
 *                               "self": "/cogs/repo/ORELS-Cogs/,
 *                               "github": {
 *                                   "self": "https://github.com/orels1/ORELS-Cogs"
 *                               }
 *                           }
 *                       }
 *                   }
 *               ]
 *           }
 *      }
 *
 */
router.get('/', (req, res) => {

});