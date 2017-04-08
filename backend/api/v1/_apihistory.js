/**
 * Created by orel- on 17/Jan/17.
 */

/**
 * @apiDefine EntryExists
 * @apiError (400) {Object} EntryExists entry is already in DB
 * @apiVersion 0.0.1
 *
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 400 BadRequest
 *      {
 *          "error": "ExtryExists",
 *          "error_details": "This db entry already exists",
 *          "results": {"id": "21dsa2t234tdsfsr141"}
 *      }
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
 * @apiDefine CogRequestSuccess
 *
 * @apiVersion 0.1.0
 *
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 * @apiSuccess (200) {String} results.name Name of the cog
 * @apiSuccess (200) {Object} results.author Author of the cog
 * @apiSuccess (200) {Object} results.author.name Author's name according to info.json
 * @apiSuccess (200) {Object} results.author.url Author's github url
 * @apiSuccess (200) {String} results.short Short description of the cog
 * @apiSuccess (200) {String} results.description Full description of the cog
 * @apiSuccess (200) {Object} results.links Contains relevant links
 * @apiSuccess (200) {String} results.links._self Link to cogs's API endpoint
 * @apiSuccess (200) {String} results.links._repo Link to cog's repo API endpoint
 * @apiSuccess (200) {String} results.links._update Link to cogs's update API endpoint
 * @apiSuccess (200) {String} results.links.self Link to cog's webpage
 * @apiSuccess (200) {String} results.links.repo Link to cog's repo webpage
 * @apiSuccess (200) {Object} results.links.github Contains relevant github links
 * @apiSuccess (200) {String} results.links.github.self Link to the cog on github
 * @apiSuccess (200) {String} results.links.github.repo Link to the repo on github
 * @apiSuccess (200) {String} results.links.github._update Link to info.json github's api endpoint
 * @apiSuccess (200) {Object} results.repo Contains info about cog's repo
 * @apiSuccess (200) {String} results.repo.type Cog's repo type
 * @apiSuccess (200) {String} results.repo.name Cog's repo name
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {
 *              "links": {
 *                  "github": {
 *                      "_update": "https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master",
 *                      "repo": "https://github.com/orels1/ORELS-Cogs",
 *                      "self": "https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py"
 *                  },
 *                  "repo": "cogs/repo/ORELS-Cogs/",
 *                  "self": "/cogs/cog/ORELS-Cogs/dota/",
 *                  "_update": "/api/v1/cogs/cog/ORELS-Cogs/dota/fetch",
 *                  "_repo": "/api/v1/repo/ORELS-Cogs",
 *                  "_self": "/api/v1/cogs/cog/ORELS-Cogs/dota"
 *              },
 *              "description": "Requires tabulate, dota2py and beautfulSoup\nInstall with:\npip3 install bs4\npip3 install dota2py\npip3 install tabulate\n\nAlso requires dota 2 api key, which you can get here: http://steamcommunity.com/dev/apikey\nYou will need to set your key with [p]dota setkey command in PM\n\nUsage:\n[p]dota hero <hero>\n Shows info about hero\n[p]dota build <hero>\n Shows most popular skillbuild\n[p]dota items <hero>\n Shows most popular items\n[p]dota online\n Shows amount of players online\n[p]dota recent <steamID>\n Shows info about the latest dota match",
 *              "short": null,
 *              "author": {
 *                  "url": "https://github.com/orels1",
 *                  "name": "orels"
 *              },
 *              "repo": {
 *                  "type": "unapproved",
 *                  "name": "ORELS-Cogs"
 *              },
 *              "name": "dota"
 *              }
 *          }
 *      }
 */

/**
 * @api {get} /cogs/ List all cogs
 * @apiVersion 0.1.0
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
 *               "list": [
 *                   {
 *                       "links": {
 *                           "github": {
 *                               "_update": "https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master",
 *                               "repo": "https://github.com/orels1/ORELS-Cogs",
 *                               "self": "https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py"
 *                           },
 *                           "repo": "cogs/repo/ORELS-Cogs/",
 *                           "self": "/cogs/cog/ORELS-Cogs/dota/",
 *                           "_update": "/api/v1/cogs/cog/ORELS-Cogs/dota/fetch",
 *                           "_repo": "/api/v1/repo/ORELS-Cogs",
 *                           "_self": "/api/v1/cogs/cog/ORELS-Cogs/dota"
 *                        },
 *                        "description": "Requires tabulate, dota2py and beautfulSoup\nInstall with:\npip3 install bs4\npip3 install dota2py\npip3 install tabulate\n\nAlso requires dota 2 api key, which you can get here: http://steamcommunity.com/dev/apikey\nYou will need to set your key with [p]dota setkey command in PM\n\nUsage:\n[p]dota hero <hero>\n Shows info about hero\n[p]dota build <hero>\n Shows most popular skillbuild\n[p]dota items <hero>\n Shows most popular items\n[p]dota online\n Shows amount of players online\n[p]dota recent <steamID>\n Shows info about the latest dota match",
 *                        "short": null,
 *                        "author": {
 *                            "url": "https://github.com/orels1",
 *                            "name": "orels"
 *                        },
 *                        "repo": {
 *                            "type": "unapproved",
 *                            "name": "ORELS-Cogs"
 *                        },
 *                        "name": "dota"
 *                   }
 *               ]
 *           }
 *      }
 */

/**
 * @apiDefine CogRequestSuccess
 *
 * @apiVersion 0.1.1
 *
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 * @apiSuccess (200) {String} results.name Name of the cog
 * @apiSuccess (200) {Object} results.author Author of the cog
 * @apiSuccess (200) {Object} results.author.name Author's name according to info.json
 * @apiSuccess (200) {Object} results.author.url Author's github url
 * @apiSuccess (200) {String} results.short Short description of the cog
 * @apiSuccess (200) {String} results.description Full description of the cog
 * @apiSuccess (200) {Object} results.links Contains relevant links
 * @apiSuccess (200) {String} results.links._self Link to cogs's API endpoint
 * @apiSuccess (200) {String} results.links._repo Link to cog's repo API endpoint
 * @apiSuccess (200) {String} results.links._update Link to cogs's update API endpoint
 * @apiSuccess (200) {String} results.links.self Link to cog's webpage
 * @apiSuccess (200) {String} results.links.repo Link to cog's repo webpage
 * @apiSuccess (200) {Object} results.links.github Contains relevant github links
 * @apiSuccess (200) {String} results.links.github.self Link to the cog on github
 * @apiSuccess (200) {String} results.links.github.repo Link to the repo on github
 * @apiSuccess (200) {String} results.links.github._update Link to info.json github's api endpoint
 * @apiSuccess (200) {Object} results.repo Contains info about cog's repo
 * @apiSuccess (200) {String} results.repo.type Cog's repo type
 * @apiSuccess (200) {String} results.repo.name Cog's repo name
 * @apiSuccess (200) {Boolean} results.voted Cog vote status for request's IP
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {
 *              "links": {
 *                  "github": {
 *                      "_update": "https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master",
 *                      "repo": "https://github.com/orels1/ORELS-Cogs",
 *                      "self": "https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py"
 *                  },
 *                  "repo": "cogs/repo/ORELS-Cogs/",
 *                  "self": "/cogs/cog/ORELS-Cogs/dota/",
 *                  "_update": "/api/v1/cogs/cog/ORELS-Cogs/dota/fetch",
 *                  "_repo": "/api/v1/repo/ORELS-Cogs",
 *                  "_self": "/api/v1/cogs/cog/ORELS-Cogs/dota"
 *              },
 *              "description": "Requires tabulate, dota2py and beautfulSoup\nInstall with:\npip3 install bs4\npip3 install dota2py\npip3 install tabulate\n\nAlso requires dota 2 api key, which you can get here: http://steamcommunity.com/dev/apikey\nYou will need to set your key with [p]dota setkey command in PM\n\nUsage:\n[p]dota hero <hero>\n Shows info about hero\n[p]dota build <hero>\n Shows most popular skillbuild\n[p]dota items <hero>\n Shows most popular items\n[p]dota online\n Shows amount of players online\n[p]dota recent <steamID>\n Shows info about the latest dota match",
 *              "short": null,
 *              "author": {
 *                  "url": "https://github.com/orels1",
 *                  "name": "orels"
 *              },
 *              "repo": {
 *                  "type": "unapproved",
 *                  "name": "ORELS-Cogs"
 *              },
 *              "name": "dota",
 *              "voted": false
 *              }
 *          }
 *      }
 */

/**
 * @api {get} /cogs/ List all cogs
 * @apiVersion 0.1.1
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
 *               "list": [
 *                   {
 *                       "links": {
 *                           "github": {
 *                               "_update": "https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master",
 *                               "repo": "https://github.com/orels1/ORELS-Cogs",
 *                               "self": "https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py"
 *                           },
 *                           "repo": "cogs/repo/ORELS-Cogs/",
 *                           "self": "/cogs/cog/ORELS-Cogs/dota/",
 *                           "_update": "/api/v1/cogs/cog/ORELS-Cogs/dota/fetch",
 *                           "_repo": "/api/v1/repo/ORELS-Cogs",
 *                           "_self": "/api/v1/cogs/cog/ORELS-Cogs/dota"
 *                        },
 *                        "description": "Requires tabulate, dota2py and beautfulSoup\nInstall with:\npip3 install bs4\npip3 install dota2py\npip3 install tabulate\n\nAlso requires dota 2 api key, which you can get here: http://steamcommunity.com/dev/apikey\nYou will need to set your key with [p]dota setkey command in PM\n\nUsage:\n[p]dota hero <hero>\n Shows info about hero\n[p]dota build <hero>\n Shows most popular skillbuild\n[p]dota items <hero>\n Shows most popular items\n[p]dota online\n Shows amount of players online\n[p]dota recent <steamID>\n Shows info about the latest dota match",
 *                        "short": null,
 *                        "author": {
 *                            "url": "https://github.com/orels1",
 *                            "name": "orels"
 *                        },
 *                        "repo": {
 *                            "type": "unapproved",
 *                            "name": "ORELS-Cogs"
 *                        },
 *                        "name": "dota",
 *                        "voted": false
 *                   }
 *               ]
 *           }
 *      }
 */

/**
 * @api {get} /cogs/search/:term Search for a cog
 * @apiVersion 0.1.0
 * @apiName searchCog
 * @apiGroup cogs
 *
 * @apiDescription Supports offset and limit query params, by default set to offset=0 and limit=20
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
 * @apiVersion 0.1.0
 *
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 * @apiSuccess (200) {String} results.id Id of the repo in DB
 * @apiSuccess (200) {String} results.name Name of the repo
 * @apiSuccess (200) {Object} results.author Author of the repo
 * @apiSuccess (200) {Object} results.author.name Author's name according to info.json
 * @apiSuccess (200) {Object} results.author.url Author's github url
 * @apiSuccess (200) {String} results.short Short description of the repo
 * @apiSuccess (200) {String} results.description Full description of the repo
 * @apiSuccess (200) {String} results.type Repo's type
 * @apiSuccess (200) {String} results.parsed Repo's parsing status
 * @apiSuccess (200) {Object} results.cogs List of cogs in a JS object
 * @apiSuccess (200) {Object} results.links Contains relevant links
 * @apiSuccess (200) {String} results.links._self Link to repo's API endpoint
 * @apiSuccess (200) {String} results.links._update Link to repo's update API endpoint
 * @apiSuccess (200) {String} results.links.self Link to repo's webpage
 * @apiSuccess (200) {Object} results.links.github Contains relevant github links
 * @apiSuccess (200) {String} results.links.github.self Link to the repo on github
 * @apiSuccess (200) {String} results.links.github._update Link to info.json github's api endpoint
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {
 *              "_id": "587d62b4c54cad51845ae101",
 *              "name": "ORELS-Cogs",
 *              "__v": 4,
 *              "description": "Repository of mainly gaming/data based cogs, with a bit of some fun stuff. Use as you like.",
 *              "short": "Data scraping cogs with a bit of extra",
 *              "links": {
 *                  "_self": "/api/v1/repo/ORELS-Cogs",
 *                  "_update": "/api/v1/repo/ORELS-Cogs/fetch",
 *                  "self": "cogs/repo/ORELS-Cogs/",
 *                  "github": {
 *                      "self": "https://github.com/orels1/ORELS-Cogs",
 *                      "_update": "https://api.github.com/repos/orels1/ORELS-Cogs/contents/info.json?ref=master"
 *                  }
 *              },
 *              "type": "unapproved",
 *              "parsed": false,
 *              "cogs": [],
 *              "author": {
 *                  "name": "orels",
 *                  "url": "https://github.com/orels1"
 *              }
 *          }
 *      }
 */

/**
 * @apiDefine CogRequestSuccess
 *
 * @apiVersion 0.2.0
 *
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 * @apiSuccess (200) {String} results.name Name of the cog
 * @apiSuccess (200) {Object} results.author Author of the cog
 * @apiSuccess (200) {Object} results.author.name Author's name according to info.json
 * @apiSuccess (200) {Object} results.author.url Author's github url
 * @apiSuccess (200) {String} results.short Short description of the cog
 * @apiSuccess (200) {String} results.description Full description of the cog
 * @apiSuccess (200) {Object} results.links Contains relevant links
 * @apiSuccess (200) {String} results.links._self Link to cogs's API endpoint
 * @apiSuccess (200) {String} results.links._repo Link to cog's repo API endpoint
 * @apiSuccess (200) {String} results.links._update Link to cogs's update API endpoint
 * @apiSuccess (200) {String} results.links.self Link to cog's webpage
 * @apiSuccess (200) {String} results.links.repo Link to cog's repo webpage
 * @apiSuccess (200) {Object} results.links.github Contains relevant github links
 * @apiSuccess (200) {String} results.links.github.self Link to the cog on github
 * @apiSuccess (200) {String} results.links.github.repo Link to the repo on github
 * @apiSuccess (200) {String} results.links.github._update Link to info.json github's api endpoint
 * @apiSuccess (200) {Object} results.repo Contains info about cog's repo
 * @apiSuccess (200) {String} results.repo.type Cog's repo type
 * @apiSuccess (200) {String} results.repo.name Cog's repo name
 * @apiSuccess (200) {Boolean} results.voted Cog vote status for request's IP
 * @apiSuccess (200) {Array} results.tags List of cog's tags
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {
 *              "links": {
 *                  "github": {
 *                      "_update": "https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master",
 *                      "repo": "https://github.com/orels1/ORELS-Cogs",
 *                      "self": "https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py"
 *                  },
 *                  "repo": "cogs/orels1/ORELS-Cogs/",
 *                  "self": "/cogs/orels1/ORELS-Cogs/dota/",
 *                  "_update": "/api/v1/cogs/orels1/ORELS-Cogs/dota/fetch",
 *                  "_repo": "/api/v1/repos/orels1/ORELS-Cogs",
 *                  "_self": "/api/v1/cogs/orels1/ORELS-Cogs/dota"
 *              },
 *              "description": "Requires tabulate, dota2py and beautfulSoup\nInstall with:\npip3 install bs4\npip3 install dota2py\npip3 install tabulate\n\nAlso requires dota 2 api key, which you can get here: http://steamcommunity.com/dev/apikey\nYou will need to set your key with [p]dota setkey command in PM\n\nUsage:\n[p]dota hero <hero>\n Shows info about hero\n[p]dota build <hero>\n Shows most popular skillbuild\n[p]dota items <hero>\n Shows most popular items\n[p]dota online\n Shows amount of players online\n[p]dota recent <steamID>\n Shows info about the latest dota match",
 *              "short": null,
 *              "updated_at": "Fri Jan 27 2017 00:10:15 GMT+0300",
 *              "author": {
 *                  "url": "https://github.com/orels1",
 *                  "name": "orels"
 *              },
 *              "repo": {
 *                  "type": "unapproved",
 *                  "name": "ORELS-Cogs"
 *              },
 *              "name": "dota",
 *              "voted": false,
 *              "votes": 0,
 *              "tags": ["gaming"]
 *              }
 *          }
 *      }
 */

/**
 * @api {get} /cogs/:author/:repoName Get cogs from repo
 * @apiVersion 0.2.0
 * @apiName getCogFromRepo
 * @apiGroup cogs
 *
 * @apiParam {String} author Cog author github username
 * @apiParam {String} repoName Name of the repo containing the cog
 *
 * @apiUse DBError
 * @apiUse EntryNotFound
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {
 *               "list": [
 *                   {
 *                       "links": {
 *                           "github": {
 *                               "_update": "https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master",
 *                               "repo": "https://github.com/orels1/ORELS-Cogs",
 *                               "self": "https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py"
 *                           },
 *                           "repo": "cogs/orels1/ORELS-Cogs/",
 *                           "self": "/cogs/orels1/ORELS-Cogs/dota/",
 *                           "_update": "/api/v1/cogs/orels1/ORELS-Cogs/dota/fetch",
 *                           "_repo": "/api/v1/repos/orels1/ORELS-Cogs",
 *                           "_self": "/api/v1/cogs/orels1/ORELS-Cogs/dota"
 *                        },
 *                        "description": "Requires tabulate, dota2py and beautfulSoup\nInstall with:\npip3 install bs4\npip3 install dota2py\npip3 install tabulate\n\nAlso requires dota 2 api key, which you can get here: http://steamcommunity.com/dev/apikey\nYou will need to set your key with [p]dota setkey command in PM\n\nUsage:\n[p]dota hero <hero>\n Shows info about hero\n[p]dota build <hero>\n Shows most popular skillbuild\n[p]dota items <hero>\n Shows most popular items\n[p]dota online\n Shows amount of players online\n[p]dota recent <steamID>\n Shows info about the latest dota match",
 *                        "short": null,
 *                        "updated_at": "Fri Jan 27 2017 00:10:15 GMT+0300",
 *                        "author": {
 *                            "url": "https://github.com/orels1",
 *                            "name": "orels"
 *                        },
 *                        "repo": {
 *                            "type": "unapproved",
 *                            "name": "ORELS-Cogs"
 *                        },
 *                        "name": "dota",
 *                        "voted": false,
 *                        "votes": 0,
 *                        "tags": ["gaming"]
 *                   }
 *               ]
 *           }
 *      }
 */

/**
 * @api {get} /cogs/ List all cogs
 * @apiVersion 0.2.0
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
 *               "list": [
 *                   {
 *                       "links": {
 *                           "github": {
 *                               "_update": "https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master",
 *                               "repo": "https://github.com/orels1/ORELS-Cogs",
 *                               "self": "https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py"
 *                           },
 *                           "repo": "cogs/orels1/ORELS-Cogs/",
 *                           "self": "/cogs/orels1/ORELS-Cogs/dota/",
 *                           "_update": "/api/v1/cogs/orels1/ORELS-Cogs/dota/fetch",
 *                           "_repo": "/api/v1/repos/orels1/ORELS-Cogs",
 *                           "_self": "/api/v1/cogs/orels1/ORELS-Cogs/dota"
 *                        },
 *                        "description": "Requires tabulate, dota2py and beautfulSoup\nInstall with:\npip3 install bs4\npip3 install dota2py\npip3 install tabulate\n\nAlso requires dota 2 api key, which you can get here: http://steamcommunity.com/dev/apikey\nYou will need to set your key with [p]dota setkey command in PM\n\nUsage:\n[p]dota hero <hero>\n Shows info about hero\n[p]dota build <hero>\n Shows most popular skillbuild\n[p]dota items <hero>\n Shows most popular items\n[p]dota online\n Shows amount of players online\n[p]dota recent <steamID>\n Shows info about the latest dota match",
 *                        "short": null,
 *                        "updated_at": "Fri Jan 27 2017 00:10:15 GMT+0300",
 *                        "author": {
 *                            "url": "https://github.com/orels1",
 *                            "name": "orels"
 *                        },
 *                        "repo": {
 *                            "type": "unapproved",
 *                            "name": "ORELS-Cogs"
 *                        },
 *                        "name": "dota",
 *                        "voted": false,
 *                        "votes": 0,
 *                        "tags": ["gaming"]
 *                   }
 *               ]
 *           }
 *      }
 */