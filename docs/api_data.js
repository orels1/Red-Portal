define({ "api": [
  {
    "type": "put",
    "url": "/admin/batch/parse",
    "title": "Parse all repos in batch",
    "version": "0.2.0",
    "name": "adminBatchParseRepos",
    "group": "admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Service-Token",
            "description": "<p>Admin-oriented service token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": 'Parsing started',\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/admin.js",
    "groupTitle": "admin",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/admin/batch/parse"
      }
    ],
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/cogs/:author/:repoName/:cogName",
    "title": "Get cog",
    "version": "0.2.0",
    "name": "getCog",
    "group": "cogs",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Cog author github username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "repoName",
            "description": "<p>Name of the repo containing the cog</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cogName",
            "description": "<p>Name of the cog to get</p>"
          }
        ]
      }
    },
    "filename": "backend/api/v1/cogs.js",
    "groupTitle": "cogs",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/cogs/:author/:repoName/:cogName"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.name",
            "description": "<p>Name of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author",
            "description": "<p>Author of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.name",
            "description": "<p>Author's name according to info.json</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.url",
            "description": "<p>Author's github url</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.short",
            "description": "<p>Short description of the cog</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.description",
            "description": "<p>Full description of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links",
            "description": "<p>Contains relevant links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._self",
            "description": "<p>Link to cogs's API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._repo",
            "description": "<p>Link to cog's repo API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._update",
            "description": "<p>Link to cogs's update API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.self",
            "description": "<p>Link to cog's webpage</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.repo",
            "description": "<p>Link to cog's repo webpage</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links.github",
            "description": "<p>Contains relevant github links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github.self",
            "description": "<p>Link to the cog on github</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github.repo",
            "description": "<p>Link to the repo on github</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github._update",
            "description": "<p>Link to info.json github's api endpoint</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.repo",
            "description": "<p>Contains info about cog's repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.repo.type",
            "description": "<p>Cog's repo type</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.repo.name",
            "description": "<p>Cog's repo name</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "results.voted",
            "description": "<p>Cog vote status for request's IP</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n        \"links\": {\n            \"github\": {\n                \"_update\": \"https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master\",\n                \"repo\": \"https://github.com/orels1/ORELS-Cogs\",\n                \"self\": \"https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py\"\n            },\n            \"repo\": \"cogs/orels1/ORELS-Cogs/\",\n            \"self\": \"/cogs/orels1/ORELS-Cogs/dota/\",\n            \"_update\": \"/api/v1/cogs/orels1/ORELS-Cogs/dota/fetch\",\n            \"_repo\": \"/api/v1/repos/orels1/ORELS-Cogs\",\n            \"_self\": \"/api/v1/cogs/orels1/ORELS-Cogs/dota\"\n        },\n        \"description\": \"Requires tabulate, dota2py and beautfulSoup\\nInstall with:\\npip3 install bs4\\npip3 install dota2py\\npip3 install tabulate\\n\\nAlso requires dota 2 api key, which you can get here: http://steamcommunity.com/dev/apikey\\nYou will need to set your key with [p]dota setkey command in PM\\n\\nUsage:\\n[p]dota hero <hero>\\n Shows info about hero\\n[p]dota build <hero>\\n Shows most popular skillbuild\\n[p]dota items <hero>\\n Shows most popular items\\n[p]dota online\\n Shows amount of players online\\n[p]dota recent <steamID>\\n Shows info about the latest dota match\",\n        \"short\": null,\n        \"updated_at\": \"Fri Jan 27 2017 00:10:15 GMT+0300\",\n        \"author\": {\n            \"url\": \"https://github.com/orels1\",\n            \"name\": \"orels\"\n        },\n        \"repo\": {\n            \"type\": \"unapproved\",\n            \"name\": \"ORELS-Cogs\"\n        },\n        \"name\": \"dota\",\n        \"voted\": false,\n        \"votes\": 0,\n        }\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/cogs/cog/:repoName/:cogName",
    "title": "Get cog",
    "version": "0.1.0",
    "name": "getCog",
    "group": "cogs",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "repoName",
            "description": "<p>Name of the repo containing the cog</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cogName",
            "description": "<p>Name of the cog to get</p>"
          }
        ]
      }
    },
    "filename": "backend/api/v1/_apihistory.js",
    "groupTitle": "cogs",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/cogs/cog/:repoName/:cogName"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.name",
            "description": "<p>Name of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author",
            "description": "<p>Author of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.name",
            "description": "<p>Author's name according to info.json</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.url",
            "description": "<p>Author's github url</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.short",
            "description": "<p>Short description of the cog</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.description",
            "description": "<p>Full description of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links",
            "description": "<p>Contains relevant links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._self",
            "description": "<p>Link to cogs's API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._repo",
            "description": "<p>Link to cog's repo API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._update",
            "description": "<p>Link to cogs's update API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.self",
            "description": "<p>Link to cog's webpage</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.repo",
            "description": "<p>Link to cog's repo webpage</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links.github",
            "description": "<p>Contains relevant github links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github.self",
            "description": "<p>Link to the cog on github</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github.repo",
            "description": "<p>Link to the repo on github</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github._update",
            "description": "<p>Link to info.json github's api endpoint</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.repo",
            "description": "<p>Contains info about cog's repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.repo.type",
            "description": "<p>Cog's repo type</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.repo.name",
            "description": "<p>Cog's repo name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n        \"links\": {\n            \"github\": {\n                \"_update\": \"https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master\",\n                \"repo\": \"https://github.com/orels1/ORELS-Cogs\",\n                \"self\": \"https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py\"\n            },\n            \"repo\": \"cogs/repo/ORELS-Cogs/\",\n            \"self\": \"/cogs/cog/ORELS-Cogs/dota/\",\n            \"_update\": \"/api/v1/cogs/cog/ORELS-Cogs/dota/fetch\",\n            \"_repo\": \"/api/v1/repo/ORELS-Cogs\",\n            \"_self\": \"/api/v1/cogs/cog/ORELS-Cogs/dota\"\n        },\n        \"description\": \"Requires tabulate, dota2py and beautfulSoup\\nInstall with:\\npip3 install bs4\\npip3 install dota2py\\npip3 install tabulate\\n\\nAlso requires dota 2 api key, which you can get here: http://steamcommunity.com/dev/apikey\\nYou will need to set your key with [p]dota setkey command in PM\\n\\nUsage:\\n[p]dota hero <hero>\\n Shows info about hero\\n[p]dota build <hero>\\n Shows most popular skillbuild\\n[p]dota items <hero>\\n Shows most popular items\\n[p]dota online\\n Shows amount of players online\\n[p]dota recent <steamID>\\n Shows info about the latest dota match\",\n        \"short\": null,\n        \"author\": {\n            \"url\": \"https://github.com/orels1\",\n            \"name\": \"orels\"\n        },\n        \"repo\": {\n            \"type\": \"unapproved\",\n            \"name\": \"ORELS-Cogs\"\n        },\n        \"name\": \"dota\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/cogs/cog/:repoName/:cogName",
    "title": "Get cog",
    "version": "0.0.1",
    "name": "getCog",
    "group": "cogs",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "repoName",
            "description": "<p>Name of the repo containing the cog</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cogName",
            "description": "<p>Name of the cog to get</p>"
          }
        ]
      }
    },
    "filename": "backend/api/v1/_apihistory.js",
    "groupTitle": "cogs",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/cogs/cog/:repoName/:cogName"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.id",
            "description": "<p>Id of the repo in DB</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.name",
            "description": "<p>Name of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.author",
            "description": "<p>Author of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.short",
            "description": "<p>Short description of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.description",
            "description": "<p>Full description of the repo</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.cogs",
            "description": "<p>List of cogs in a JS object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n         \"dota\": {\n              \"author\": \"orels1\",\n              \"short\": \"Gets you item builds, hero info and more\",\n              \"description\": \"Dota 2 cog will get you the top item and skill-builds for any hero in game, as well as stats for your latest match + a dotabuff link. Enjoy\",\n             \"install_msg\": \"(orels1): Have fun!\"\n          }\n     }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/cogs/:author/:repoName",
    "title": "Get cogs from repo",
    "version": "0.2.0",
    "name": "getCogFromRepo",
    "group": "cogs",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Cog author github username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "repoName",
            "description": "<p>Name of the repo containing the cog</p>"
          }
        ]
      }
    },
    "filename": "backend/api/v1/cogs.js",
    "groupTitle": "cogs",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/cogs/:author/:repoName"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.name",
            "description": "<p>Name of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author",
            "description": "<p>Author of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.name",
            "description": "<p>Author's name according to info.json</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.url",
            "description": "<p>Author's github url</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.short",
            "description": "<p>Short description of the cog</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.description",
            "description": "<p>Full description of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links",
            "description": "<p>Contains relevant links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._self",
            "description": "<p>Link to cogs's API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._repo",
            "description": "<p>Link to cog's repo API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._update",
            "description": "<p>Link to cogs's update API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.self",
            "description": "<p>Link to cog's webpage</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.repo",
            "description": "<p>Link to cog's repo webpage</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links.github",
            "description": "<p>Contains relevant github links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github.self",
            "description": "<p>Link to the cog on github</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github.repo",
            "description": "<p>Link to the repo on github</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github._update",
            "description": "<p>Link to info.json github's api endpoint</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.repo",
            "description": "<p>Contains info about cog's repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.repo.type",
            "description": "<p>Cog's repo type</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.repo.name",
            "description": "<p>Cog's repo name</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "results.voted",
            "description": "<p>Cog vote status for request's IP</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n        \"links\": {\n            \"github\": {\n                \"_update\": \"https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master\",\n                \"repo\": \"https://github.com/orels1/ORELS-Cogs\",\n                \"self\": \"https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py\"\n            },\n            \"repo\": \"cogs/orels1/ORELS-Cogs/\",\n            \"self\": \"/cogs/orels1/ORELS-Cogs/dota/\",\n            \"_update\": \"/api/v1/cogs/orels1/ORELS-Cogs/dota/fetch\",\n            \"_repo\": \"/api/v1/repos/orels1/ORELS-Cogs\",\n            \"_self\": \"/api/v1/cogs/orels1/ORELS-Cogs/dota\"\n        },\n        \"description\": \"Requires tabulate, dota2py and beautfulSoup\\nInstall with:\\npip3 install bs4\\npip3 install dota2py\\npip3 install tabulate\\n\\nAlso requires dota 2 api key, which you can get here: http://steamcommunity.com/dev/apikey\\nYou will need to set your key with [p]dota setkey command in PM\\n\\nUsage:\\n[p]dota hero <hero>\\n Shows info about hero\\n[p]dota build <hero>\\n Shows most popular skillbuild\\n[p]dota items <hero>\\n Shows most popular items\\n[p]dota online\\n Shows amount of players online\\n[p]dota recent <steamID>\\n Shows info about the latest dota match\",\n        \"short\": null,\n        \"updated_at\": \"Fri Jan 27 2017 00:10:15 GMT+0300\",\n        \"author\": {\n            \"url\": \"https://github.com/orels1\",\n            \"name\": \"orels\"\n        },\n        \"repo\": {\n            \"type\": \"unapproved\",\n            \"name\": \"ORELS-Cogs\"\n        },\n        \"name\": \"dota\",\n        \"voted\": false,\n        \"votes\": 0,\n        }\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/cogs/repo/:repoName",
    "title": "Get cogs from repo",
    "version": "0.1.0",
    "name": "getCogFromRepo",
    "group": "cogs",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "repoName",
            "description": "<p>Name of the repo containing the cog</p>"
          }
        ]
      }
    },
    "filename": "backend/api/v1/_apihistory.js",
    "groupTitle": "cogs",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/cogs/repo/:repoName"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.name",
            "description": "<p>Name of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author",
            "description": "<p>Author of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.name",
            "description": "<p>Author's name according to info.json</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.url",
            "description": "<p>Author's github url</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.short",
            "description": "<p>Short description of the cog</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.description",
            "description": "<p>Full description of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links",
            "description": "<p>Contains relevant links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._self",
            "description": "<p>Link to cogs's API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._repo",
            "description": "<p>Link to cog's repo API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._update",
            "description": "<p>Link to cogs's update API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.self",
            "description": "<p>Link to cog's webpage</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.repo",
            "description": "<p>Link to cog's repo webpage</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links.github",
            "description": "<p>Contains relevant github links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github.self",
            "description": "<p>Link to the cog on github</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github.repo",
            "description": "<p>Link to the repo on github</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github._update",
            "description": "<p>Link to info.json github's api endpoint</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.repo",
            "description": "<p>Contains info about cog's repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.repo.type",
            "description": "<p>Cog's repo type</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.repo.name",
            "description": "<p>Cog's repo name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n        \"links\": {\n            \"github\": {\n                \"_update\": \"https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master\",\n                \"repo\": \"https://github.com/orels1/ORELS-Cogs\",\n                \"self\": \"https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py\"\n            },\n            \"repo\": \"cogs/repo/ORELS-Cogs/\",\n            \"self\": \"/cogs/cog/ORELS-Cogs/dota/\",\n            \"_update\": \"/api/v1/cogs/cog/ORELS-Cogs/dota/fetch\",\n            \"_repo\": \"/api/v1/repo/ORELS-Cogs\",\n            \"_self\": \"/api/v1/cogs/cog/ORELS-Cogs/dota\"\n        },\n        \"description\": \"Requires tabulate, dota2py and beautfulSoup\\nInstall with:\\npip3 install bs4\\npip3 install dota2py\\npip3 install tabulate\\n\\nAlso requires dota 2 api key, which you can get here: http://steamcommunity.com/dev/apikey\\nYou will need to set your key with [p]dota setkey command in PM\\n\\nUsage:\\n[p]dota hero <hero>\\n Shows info about hero\\n[p]dota build <hero>\\n Shows most popular skillbuild\\n[p]dota items <hero>\\n Shows most popular items\\n[p]dota online\\n Shows amount of players online\\n[p]dota recent <steamID>\\n Shows info about the latest dota match\",\n        \"short\": null,\n        \"author\": {\n            \"url\": \"https://github.com/orels1\",\n            \"name\": \"orels\"\n        },\n        \"repo\": {\n            \"type\": \"unapproved\",\n            \"name\": \"ORELS-Cogs\"\n        },\n        \"name\": \"dota\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/cogs/repo/:repoName",
    "title": "Get cogs from repo",
    "version": "0.0.1",
    "name": "getCogFromRepo",
    "group": "cogs",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "repoName",
            "description": "<p>Name of the repo containing the cog</p>"
          }
        ]
      }
    },
    "filename": "backend/api/v1/_apihistory.js",
    "groupTitle": "cogs",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/cogs/repo/:repoName"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.id",
            "description": "<p>Id of the repo in DB</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.name",
            "description": "<p>Name of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.author",
            "description": "<p>Author of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.short",
            "description": "<p>Short description of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.description",
            "description": "<p>Full description of the repo</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.cogs",
            "description": "<p>List of cogs in a JS object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n         \"dota\": {\n              \"author\": \"orels1\",\n              \"short\": \"Gets you item builds, hero info and more\",\n              \"description\": \"Dota 2 cog will get you the top item and skill-builds for any hero in game, as well as stats for your latest match + a dotabuff link. Enjoy\",\n             \"install_msg\": \"(orels1): Have fun!\"\n          }\n     }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/cogs/",
    "title": "List all cogs",
    "version": "0.2.0",
    "name": "getCogList",
    "group": "cogs",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "results.list",
            "description": "<p>List of entries</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n         \"list\": [\n             {\n                 \"links\": {\n                     \"github\": {\n                         \"_update\": \"https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master\",\n                         \"repo\": \"https://github.com/orels1/ORELS-Cogs\",\n                         \"self\": \"https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py\"\n                     },\n                     \"repo\": \"cogs/orels1/ORELS-Cogs/\",\n                     \"self\": \"/cogs/orels1/ORELS-Cogs/dota/\",\n                     \"_update\": \"/api/v1/cogs/orels1/ORELS-Cogs/dota/fetch\",\n                     \"_repo\": \"/api/v1/repos/orels1/ORELS-Cogs\",\n                     \"_self\": \"/api/v1/cogs/orels1/ORELS-Cogs/dota\"\n                  },\n                  \"description\": \"Requires tabulate, dota2py and beautfulSoup\\nInstall with:\\npip3 install bs4\\npip3 install dota2py\\npip3 install tabulate\\n\\nAlso requires dota 2 api key, which you can get here: http://steamcommunity.com/dev/apikey\\nYou will need to set your key with [p]dota setkey command in PM\\n\\nUsage:\\n[p]dota hero <hero>\\n Shows info about hero\\n[p]dota build <hero>\\n Shows most popular skillbuild\\n[p]dota items <hero>\\n Shows most popular items\\n[p]dota online\\n Shows amount of players online\\n[p]dota recent <steamID>\\n Shows info about the latest dota match\",\n                  \"short\": null,\n                  \"updated_at\": \"Fri Jan 27 2017 00:10:15 GMT+0300\",\n                  \"author\": {\n                      \"url\": \"https://github.com/orels1\",\n                      \"name\": \"orels\"\n                  },\n                  \"repo\": {\n                      \"type\": \"unapproved\",\n                      \"name\": \"ORELS-Cogs\"\n                  },\n                  \"name\": \"dota\",\n                  \"voted\": false,\n                  \"votes\": 0\n             }\n         ]\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/cogs.js",
    "groupTitle": "cogs",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/cogs/"
      }
    ],
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/cogs/",
    "title": "List all cogs",
    "version": "0.1.1",
    "name": "getCogList",
    "group": "cogs",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "results.list",
            "description": "<p>List of entries</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n         \"list\": [\n             {\n                 \"links\": {\n                     \"github\": {\n                         \"_update\": \"https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master\",\n                         \"repo\": \"https://github.com/orels1/ORELS-Cogs\",\n                         \"self\": \"https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py\"\n                     },\n                     \"repo\": \"cogs/repo/ORELS-Cogs/\",\n                     \"self\": \"/cogs/cog/ORELS-Cogs/dota/\",\n                     \"_update\": \"/api/v1/cogs/cog/ORELS-Cogs/dota/fetch\",\n                     \"_repo\": \"/api/v1/repo/ORELS-Cogs\",\n                     \"_self\": \"/api/v1/cogs/cog/ORELS-Cogs/dota\"\n                  },\n                  \"description\": \"Requires tabulate, dota2py and beautfulSoup\\nInstall with:\\npip3 install bs4\\npip3 install dota2py\\npip3 install tabulate\\n\\nAlso requires dota 2 api key, which you can get here: http://steamcommunity.com/dev/apikey\\nYou will need to set your key with [p]dota setkey command in PM\\n\\nUsage:\\n[p]dota hero <hero>\\n Shows info about hero\\n[p]dota build <hero>\\n Shows most popular skillbuild\\n[p]dota items <hero>\\n Shows most popular items\\n[p]dota online\\n Shows amount of players online\\n[p]dota recent <steamID>\\n Shows info about the latest dota match\",\n                  \"short\": null,\n                  \"author\": {\n                      \"url\": \"https://github.com/orels1\",\n                      \"name\": \"orels\"\n                  },\n                  \"repo\": {\n                      \"type\": \"unapproved\",\n                      \"name\": \"ORELS-Cogs\"\n                  },\n                  \"name\": \"dota\",\n                  \"voted\": false\n             }\n         ]\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/_apihistory.js",
    "groupTitle": "cogs",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/cogs/"
      }
    ],
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/cogs/",
    "title": "List all cogs",
    "version": "0.1.0",
    "name": "getCogList",
    "group": "cogs",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "results.list",
            "description": "<p>List of entries</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n         \"list\": [\n             {\n                 \"links\": {\n                     \"github\": {\n                         \"_update\": \"https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master\",\n                         \"repo\": \"https://github.com/orels1/ORELS-Cogs\",\n                         \"self\": \"https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py\"\n                     },\n                     \"repo\": \"cogs/repo/ORELS-Cogs/\",\n                     \"self\": \"/cogs/cog/ORELS-Cogs/dota/\",\n                     \"_update\": \"/api/v1/cogs/cog/ORELS-Cogs/dota/fetch\",\n                     \"_repo\": \"/api/v1/repo/ORELS-Cogs\",\n                     \"_self\": \"/api/v1/cogs/cog/ORELS-Cogs/dota\"\n                  },\n                  \"description\": \"Requires tabulate, dota2py and beautfulSoup\\nInstall with:\\npip3 install bs4\\npip3 install dota2py\\npip3 install tabulate\\n\\nAlso requires dota 2 api key, which you can get here: http://steamcommunity.com/dev/apikey\\nYou will need to set your key with [p]dota setkey command in PM\\n\\nUsage:\\n[p]dota hero <hero>\\n Shows info about hero\\n[p]dota build <hero>\\n Shows most popular skillbuild\\n[p]dota items <hero>\\n Shows most popular items\\n[p]dota online\\n Shows amount of players online\\n[p]dota recent <steamID>\\n Shows info about the latest dota match\",\n                  \"short\": null,\n                  \"author\": {\n                      \"url\": \"https://github.com/orels1\",\n                      \"name\": \"orels\"\n                  },\n                  \"repo\": {\n                      \"type\": \"unapproved\",\n                      \"name\": \"ORELS-Cogs\"\n                  },\n                  \"name\": \"dota\"\n             }\n         ]\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/_apihistory.js",
    "groupTitle": "cogs",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/cogs/"
      }
    ],
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/cogs/",
    "title": "List all cogs",
    "version": "0.0.1",
    "name": "getCogList",
    "group": "cogs",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "results.list",
            "description": "<p>List of entries</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n         \"list\":\n             {\n                 \"dota\": {\n                      \"author\": \"orels1\",\n                      \"short\": \"Gets you item builds, hero info and more\",\n                      \"description\": \"Dota 2 cog will get you the top item and skill-builds for any hero in game, as well as stats for your latest match + a dotabuff link. Enjoy\"\n                      \"install_msg\": \"(orels1): Have fun!\"\n                  }\n             }\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/_apihistory.js",
    "groupTitle": "cogs",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/cogs/"
      }
    ],
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/cogs/:author/:repoName/fetch",
    "title": "Parse new cogs",
    "version": "0.2.0",
    "name": "parseCogs",
    "group": "cogs",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Service-Token",
            "description": "<p>Admin-oriented service token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Cog author github username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "repoName",
            "description": "<p>Name of the repo containing the cog</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": 'Parsing started',\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/cogs.js",
    "groupTitle": "cogs",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/cogs/:author/:repoName/fetch"
      }
    ],
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/cogs/search/:term",
    "title": "Search for a cog",
    "version": "0.1.0",
    "name": "searchCog",
    "group": "cogs",
    "description": "<p>Supports offset and limit query params, by default set to offset=0 and limit=20</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "term",
            "description": "<p>Term to search for</p>"
          }
        ]
      }
    },
    "filename": "backend/api/v1/_apihistory.js",
    "groupTitle": "cogs",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/cogs/search/:term"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.name",
            "description": "<p>Name of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author",
            "description": "<p>Author of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.name",
            "description": "<p>Author's name according to info.json</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.url",
            "description": "<p>Author's github url</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.short",
            "description": "<p>Short description of the cog</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.description",
            "description": "<p>Full description of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links",
            "description": "<p>Contains relevant links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._self",
            "description": "<p>Link to cogs's API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._repo",
            "description": "<p>Link to cog's repo API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._update",
            "description": "<p>Link to cogs's update API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.self",
            "description": "<p>Link to cog's webpage</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.repo",
            "description": "<p>Link to cog's repo webpage</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links.github",
            "description": "<p>Contains relevant github links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github.self",
            "description": "<p>Link to the cog on github</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github.repo",
            "description": "<p>Link to the repo on github</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github._update",
            "description": "<p>Link to info.json github's api endpoint</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.repo",
            "description": "<p>Contains info about cog's repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.repo.type",
            "description": "<p>Cog's repo type</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.repo.name",
            "description": "<p>Cog's repo name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n        \"links\": {\n            \"github\": {\n                \"_update\": \"https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master\",\n                \"repo\": \"https://github.com/orels1/ORELS-Cogs\",\n                \"self\": \"https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py\"\n            },\n            \"repo\": \"cogs/repo/ORELS-Cogs/\",\n            \"self\": \"/cogs/cog/ORELS-Cogs/dota/\",\n            \"_update\": \"/api/v1/cogs/cog/ORELS-Cogs/dota/fetch\",\n            \"_repo\": \"/api/v1/repo/ORELS-Cogs\",\n            \"_self\": \"/api/v1/cogs/cog/ORELS-Cogs/dota\"\n        },\n        \"description\": \"Requires tabulate, dota2py and beautfulSoup\\nInstall with:\\npip3 install bs4\\npip3 install dota2py\\npip3 install tabulate\\n\\nAlso requires dota 2 api key, which you can get here: http://steamcommunity.com/dev/apikey\\nYou will need to set your key with [p]dota setkey command in PM\\n\\nUsage:\\n[p]dota hero <hero>\\n Shows info about hero\\n[p]dota build <hero>\\n Shows most popular skillbuild\\n[p]dota items <hero>\\n Shows most popular items\\n[p]dota online\\n Shows amount of players online\\n[p]dota recent <steamID>\\n Shows info about the latest dota match\",\n        \"short\": null,\n        \"author\": {\n            \"url\": \"https://github.com/orels1\",\n            \"name\": \"orels\"\n        },\n        \"repo\": {\n            \"type\": \"unapproved\",\n            \"name\": \"ORELS-Cogs\"\n        },\n        \"name\": \"dota\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/cogs/search/:term",
    "title": "Search for a cog",
    "version": "0.0.1",
    "name": "searchCog",
    "group": "cogs",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "term",
            "description": "<p>Term to search for</p>"
          }
        ]
      }
    },
    "filename": "backend/api/v1/_apihistory.js",
    "groupTitle": "cogs",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/cogs/search/:term"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.id",
            "description": "<p>Id of the repo in DB</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.name",
            "description": "<p>Name of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.author",
            "description": "<p>Author of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.short",
            "description": "<p>Short description of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.description",
            "description": "<p>Full description of the repo</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.cogs",
            "description": "<p>List of cogs in a JS object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n         \"dota\": {\n              \"author\": \"orels1\",\n              \"short\": \"Gets you item builds, hero info and more\",\n              \"description\": \"Dota 2 cog will get you the top item and skill-builds for any hero in game, as well as stats for your latest match + a dotabuff link. Enjoy\",\n             \"install_msg\": \"(orels1): Have fun!\"\n          }\n     }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/cogs/:author/:repoName/:cogName/vote",
    "title": "Vote for cog with ?choice=[0|1]",
    "version": "0.2.0",
    "name": "voteCog",
    "group": "cogs",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Cog author github username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "repoName",
            "description": "<p>Name of the repo containing the cog</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cogName",
            "description": "<p>Name of the cog to get</p>"
          }
        ]
      }
    },
    "filename": "backend/api/v1/cogs.js",
    "groupTitle": "cogs",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/cogs/:author/:repoName/:cogName/vote"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.name",
            "description": "<p>Name of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author",
            "description": "<p>Author of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.name",
            "description": "<p>Author's name according to info.json</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.url",
            "description": "<p>Author's github url</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.short",
            "description": "<p>Short description of the cog</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.description",
            "description": "<p>Full description of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links",
            "description": "<p>Contains relevant links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._self",
            "description": "<p>Link to cogs's API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._repo",
            "description": "<p>Link to cog's repo API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._update",
            "description": "<p>Link to cogs's update API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.self",
            "description": "<p>Link to cog's webpage</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.repo",
            "description": "<p>Link to cog's repo webpage</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links.github",
            "description": "<p>Contains relevant github links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github.self",
            "description": "<p>Link to the cog on github</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github.repo",
            "description": "<p>Link to the repo on github</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github._update",
            "description": "<p>Link to info.json github's api endpoint</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.repo",
            "description": "<p>Contains info about cog's repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.repo.type",
            "description": "<p>Cog's repo type</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.repo.name",
            "description": "<p>Cog's repo name</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "results.voted",
            "description": "<p>Cog vote status for request's IP</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n        \"links\": {\n            \"github\": {\n                \"_update\": \"https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master\",\n                \"repo\": \"https://github.com/orels1/ORELS-Cogs\",\n                \"self\": \"https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py\"\n            },\n            \"repo\": \"cogs/orels1/ORELS-Cogs/\",\n            \"self\": \"/cogs/orels1/ORELS-Cogs/dota/\",\n            \"_update\": \"/api/v1/cogs/orels1/ORELS-Cogs/dota/fetch\",\n            \"_repo\": \"/api/v1/repos/orels1/ORELS-Cogs\",\n            \"_self\": \"/api/v1/cogs/orels1/ORELS-Cogs/dota\"\n        },\n        \"description\": \"Requires tabulate, dota2py and beautfulSoup\\nInstall with:\\npip3 install bs4\\npip3 install dota2py\\npip3 install tabulate\\n\\nAlso requires dota 2 api key, which you can get here: http://steamcommunity.com/dev/apikey\\nYou will need to set your key with [p]dota setkey command in PM\\n\\nUsage:\\n[p]dota hero <hero>\\n Shows info about hero\\n[p]dota build <hero>\\n Shows most popular skillbuild\\n[p]dota items <hero>\\n Shows most popular items\\n[p]dota online\\n Shows amount of players online\\n[p]dota recent <steamID>\\n Shows info about the latest dota match\",\n        \"short\": null,\n        \"updated_at\": \"Fri Jan 27 2017 00:10:15 GMT+0300\",\n        \"author\": {\n            \"url\": \"https://github.com/orels1\",\n            \"name\": \"orels\"\n        },\n        \"repo\": {\n            \"type\": \"unapproved\",\n            \"name\": \"ORELS-Cogs\"\n        },\n        \"name\": \"dota\",\n        \"voted\": false,\n        \"votes\": 0,\n        }\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/cogs/cog/:repoName/:cogName/vote",
    "title": "Vote for cog with ?choice=[0|1]",
    "version": "0.1.0",
    "name": "voteCog",
    "group": "cogs",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "repoName",
            "description": "<p>Name of the repo containing the cog</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cogName",
            "description": "<p>Name of the cog to get</p>"
          }
        ]
      }
    },
    "filename": "backend/api/v1/_apihistory.js",
    "groupTitle": "cogs",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/cogs/cog/:repoName/:cogName/vote"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.name",
            "description": "<p>Name of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author",
            "description": "<p>Author of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.name",
            "description": "<p>Author's name according to info.json</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.url",
            "description": "<p>Author's github url</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.short",
            "description": "<p>Short description of the cog</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.description",
            "description": "<p>Full description of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links",
            "description": "<p>Contains relevant links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._self",
            "description": "<p>Link to cogs's API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._repo",
            "description": "<p>Link to cog's repo API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._update",
            "description": "<p>Link to cogs's update API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.self",
            "description": "<p>Link to cog's webpage</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.repo",
            "description": "<p>Link to cog's repo webpage</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links.github",
            "description": "<p>Contains relevant github links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github.self",
            "description": "<p>Link to the cog on github</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github.repo",
            "description": "<p>Link to the repo on github</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github._update",
            "description": "<p>Link to info.json github's api endpoint</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.repo",
            "description": "<p>Contains info about cog's repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.repo.type",
            "description": "<p>Cog's repo type</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.repo.name",
            "description": "<p>Cog's repo name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n        \"links\": {\n            \"github\": {\n                \"_update\": \"https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master\",\n                \"repo\": \"https://github.com/orels1/ORELS-Cogs\",\n                \"self\": \"https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py\"\n            },\n            \"repo\": \"cogs/repo/ORELS-Cogs/\",\n            \"self\": \"/cogs/cog/ORELS-Cogs/dota/\",\n            \"_update\": \"/api/v1/cogs/cog/ORELS-Cogs/dota/fetch\",\n            \"_repo\": \"/api/v1/repo/ORELS-Cogs\",\n            \"_self\": \"/api/v1/cogs/cog/ORELS-Cogs/dota\"\n        },\n        \"description\": \"Requires tabulate, dota2py and beautfulSoup\\nInstall with:\\npip3 install bs4\\npip3 install dota2py\\npip3 install tabulate\\n\\nAlso requires dota 2 api key, which you can get here: http://steamcommunity.com/dev/apikey\\nYou will need to set your key with [p]dota setkey command in PM\\n\\nUsage:\\n[p]dota hero <hero>\\n Shows info about hero\\n[p]dota build <hero>\\n Shows most popular skillbuild\\n[p]dota items <hero>\\n Shows most popular items\\n[p]dota online\\n Shows amount of players online\\n[p]dota recent <steamID>\\n Shows info about the latest dota match\",\n        \"short\": null,\n        \"author\": {\n            \"url\": \"https://github.com/orels1\",\n            \"name\": \"orels\"\n        },\n        \"repo\": {\n            \"type\": \"unapproved\",\n            \"name\": \"ORELS-Cogs\"\n        },\n        \"name\": \"dota\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/config/:id",
    "title": "Delete config entry by id",
    "version": "0.0.1",
    "name": "deleteConfig",
    "group": "config",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Service-Token",
            "description": "<p>Admin-oriented service token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Config entry id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/config.js",
    "groupTitle": "config",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/config/:id"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/config/:optionName",
    "title": "Get config entry value",
    "version": "0.0.1",
    "name": "getConfig",
    "group": "config",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Service-Token",
            "description": "<p>Admin-oriented service token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "optionName",
            "description": "<p>Config entry name to return</p>"
          }
        ]
      }
    },
    "filename": "backend/api/v1/config.js",
    "groupTitle": "config",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/config/:optionName"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.id",
            "description": "<p>Id of the config entry in DB</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.name",
            "description": "<p>Name of the setting</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.value",
            "description": "<p>Value of the setting</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n            \"_id\": \"21fsdkg9342ijhgh9sf0234\",\n            \"name\": \"twitter-consumer-key\",\n            \"value\": \"2sad21f2fxzcv23rszdvcs8219vsfd\"\n        }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/config/",
    "title": "List all configs",
    "version": "0.0.1",
    "name": "getConfigList",
    "group": "config",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Service-Token",
            "description": "<p>Admin-oriented service token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "results.list",
            "description": "<p>List of entries</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n            \"list\": [\n                {\n                    \"_id\": \"21fsdkg9342ijhgh9sf0234\",\n                    \"name\": \"twitter-consumer-key\",\n                    \"value\": \"2sad21f2fxzcv23rszdvcs8219vsfd\"\n                }\n            ]\n        }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/config.js",
    "groupTitle": "config",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/config/"
      }
    ],
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/config/",
    "title": "Create config entry",
    "version": "0.0.1",
    "name": "postConfig",
    "group": "config",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Service-Token",
            "description": "<p>Admin-oriented service token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Config entry unique name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>Config entry value</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"name\": \"twitter-consumer-key\",\n    \"value\": \"2sad21f2fxzcv23rszdvcs8219vsfd\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "EntryExists",
            "description": "<p>Config entry with provided name is already in DB, send back entry id for updates</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"error\": \"ExtryExists\",\n    \"error_details\": \"This config entry already exists\",\n    \"results\": {\"id\": \"21dsa2t234tdsfsr141\"}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/config.js",
    "groupTitle": "config",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/config/"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.id",
            "description": "<p>Id of the config entry in DB</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.name",
            "description": "<p>Name of the setting</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.value",
            "description": "<p>Value of the setting</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n            \"_id\": \"21fsdkg9342ijhgh9sf0234\",\n            \"name\": \"twitter-consumer-key\",\n            \"value\": \"2sad21f2fxzcv23rszdvcs8219vsfd\"\n        }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/config/",
    "title": "Update config entry value",
    "version": "0.0.1",
    "name": "putConfig",
    "group": "config",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Service-Token",
            "description": "<p>Admin-oriented service token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "optionName",
            "description": "<p>Config entry unique name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>Config entry value</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"optionName\": \"twitter-consumer-key\",\n    \"value\": \"2sad21f2fxzcv23rszdvcs8219vsfd\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/config.js",
    "groupTitle": "config",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/config/"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.id",
            "description": "<p>Id of the config entry in DB</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.name",
            "description": "<p>Name of the setting</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.value",
            "description": "<p>Value of the setting</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n            \"_id\": \"21fsdkg9342ijhgh9sf0234\",\n            \"name\": \"twitter-consumer-key\",\n            \"value\": \"2sad21f2fxzcv23rszdvcs8219vsfd\"\n        }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/count/cogs",
    "title": "Count cogs in DB",
    "version": "0.2.0",
    "name": "getCogsCount",
    "group": "misc",
    "filename": "backend/api/v1/misc/count.js",
    "groupTitle": "misc",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/count/cogs"
      }
    ],
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "results.count",
            "description": "<p>The amount of requested items in the DB</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n        \"count\": 10\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/count/repos",
    "title": "Count repos in DB",
    "version": "0.2.0",
    "name": "getReposCount",
    "group": "misc",
    "filename": "backend/api/v1/misc/count.js",
    "groupTitle": "misc",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/count/repos"
      }
    ],
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "results.count",
            "description": "<p>The amount of requested items in the DB</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n        \"count\": 10\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/count/",
    "title": "Count cogs in DB",
    "version": "0.2.0",
    "name": "getTotalCount",
    "group": "misc",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.count",
            "description": "<p>The amount of requested items in the DB</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "results.count.repos",
            "description": "<p>The amount of repos in DB</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "results.count.cogs",
            "description": "<p>The amount of cogs in DB</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n        \"count\": {\n            \"repos\": 2,\n            \"cogs\": 16\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/misc/count.js",
    "groupTitle": "misc",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/count/"
      }
    ],
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/repo/:id",
    "title": "Delete repo by id",
    "version": "0.0.1",
    "name": "deleteRepo",
    "group": "repo",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Service-Token",
            "description": "<p>Admin-oriented service token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Repo id in DB</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/_apihistory.js",
    "groupTitle": "repo",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/repo/:id"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/repo/:repoName",
    "title": "Get repo",
    "version": "0.1.0",
    "name": "getRepo",
    "group": "repo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "repoName",
            "description": "<p>name of the repo to get</p>"
          }
        ]
      }
    },
    "filename": "backend/api/v1/_apihistory.js",
    "groupTitle": "repo",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/repo/:repoName"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.id",
            "description": "<p>Id of the repo in DB</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.name",
            "description": "<p>Name of the repo</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author",
            "description": "<p>Author of the repo</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.name",
            "description": "<p>Author's name according to info.json</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.url",
            "description": "<p>Author's github url</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.short",
            "description": "<p>Short description of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.description",
            "description": "<p>Full description of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.type",
            "description": "<p>Repo's type</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.parsed",
            "description": "<p>Repo's parsing status</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.cogs",
            "description": "<p>List of cogs in a JS object</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links",
            "description": "<p>Contains relevant links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._self",
            "description": "<p>Link to repo's API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._update",
            "description": "<p>Link to repo's update API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.self",
            "description": "<p>Link to repo's webpage</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links.github",
            "description": "<p>Contains relevant github links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github.self",
            "description": "<p>Link to the repo on github</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github._update",
            "description": "<p>Link to info.json github's api endpoint</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n        \"_id\": \"587d62b4c54cad51845ae101\",\n        \"name\": \"ORELS-Cogs\",\n        \"__v\": 4,\n        \"description\": \"Repository of mainly gaming/data based cogs, with a bit of some fun stuff. Use as you like.\",\n        \"short\": \"Data scraping cogs with a bit of extra\",\n        \"links\": {\n            \"_self\": \"/api/v1/repo/ORELS-Cogs\",\n            \"_update\": \"/api/v1/repo/ORELS-Cogs/fetch\",\n            \"self\": \"cogs/repo/ORELS-Cogs/\",\n            \"github\": {\n                \"self\": \"https://github.com/orels1/ORELS-Cogs\",\n                \"_update\": \"https://api.github.com/repos/orels1/ORELS-Cogs/contents/info.json?ref=master\"\n            }\n        },\n        \"type\": \"unapproved\",\n        \"parsed\": false,\n        \"cogs\": [],\n        \"author\": {\n            \"name\": \"orels\",\n            \"url\": \"https://github.com/orels1\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/repo/:repoName",
    "title": "Get repo",
    "version": "0.0.1",
    "name": "getRepo",
    "group": "repo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "repoName",
            "description": "<p>name of the repo to get</p>"
          }
        ]
      }
    },
    "filename": "backend/api/v1/_apihistory.js",
    "groupTitle": "repo",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/repo/:repoName"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.id",
            "description": "<p>Id of the repo in DB</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.name",
            "description": "<p>Name of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.author",
            "description": "<p>Author of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.short",
            "description": "<p>Short description of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.description",
            "description": "<p>Full description of the repo</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.cogs",
            "description": "<p>List of cogs in a JS object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n         \"_id\": \"21fsdkg9342ijhgh9sf0234\",\n         \"name\": \"ORELS-Cogs\",\n         \"author\": \"orels1\",\n         \"short\": \"Mainly gaming/data oriented cogs\",\n         \"description\": \"(orels1): Thanks for using my repo, hope you have fun!\",\n         \"cogs\": {\n             \"dota\": {\n                  \"author\": \"orels1\",\n                  \"short\": \"Gets you item builds, hero info and more\",\n                  \"description\": \"Dota 2 cog will get you the top item and skill-builds for any hero in game, as well as stats for your latest match + a dotabuff link. Enjoy\",\n                  \"install_msg\": \"(orels1): Have fun!\"\n              }\n         },\n         \"parsed\": true,\n         \"url\": \"https://github.com/orels1/ORELS-Cogs\",\n         \"type\": \"approved\"\n     }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/repo/",
    "title": "List all repos",
    "version": "0.1.0",
    "name": "getRepoList",
    "group": "repo",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "results.list",
            "description": "<p>List of entries</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n         \"list\": [\n             {\n                 \"_id\": \"587d62b4c54cad51845ae101\",\n                 \"name\": \"ORELS-Cogs\",\n                 \"__v\": 4,\n                 \"description\": \"Repository of mainly gaming/data based cogs, with a bit of some fun stuff. Use as you like.\",\n                 \"short\": \"Data scraping cogs with a bit of extra\",\n                 \"links\": {\n                     \"_self\": \"/api/v1/repo/ORELS-Cogs\",\n                     \"_update\": \"/api/v1/repo/ORELS-Cogs/fetch\",\n                     \"self\": \"cogs/repo/ORELS-Cogs/\",\n                     \"github\": {\n                         \"self\": \"https://github.com/orels1/ORELS-Cogs\",\n                         \"_update\": \"https://api.github.com/repos/orels1/ORELS-Cogs/contents/info.json?ref=master\"\n                     }\n                 },\n                 \"type\": \"unapproved\",\n                 \"parsed\": false,\n                 \"cogs\": [],\n                 \"author\": {\n                     \"name\": \"orels\",\n                     \"url\": \"https://github.com/orels1\"\n                 }\n             }\n         ]\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/_apihistory.js",
    "groupTitle": "repo",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/repo/"
      }
    ],
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/repo/",
    "title": "List all repos",
    "version": "0.0.1",
    "name": "getRepoList",
    "group": "repo",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "results.list",
            "description": "<p>List of entries</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n         \"list\": [\n             {\n                 \"_id\": \"21fsdkg9342ijhgh9sf0234\",\n                 \"name\": \"ORELS-Cogs\",\n                 \"author\": \"orels1\",\n                 \"short\": \"Mainly gaming/data oriented cogs\",\n                 \"description\": \"(orels1): Thanks for using my repo, hope you have fun!\",\n                 \"cogs\": {\n                     \"dota\": {\n                          \"author\": \"orels1\",\n                          \"short\": \"Gets you item builds, hero info and more\",\n                          \"description\": \"Dota 2 cog will get you the top item and skill-builds for any hero in game, as well as stats for your latest match + a dotabuff link. Enjoy\"\n                          \"disabled\": false,\n                          \"install_msg\": \"(orels1): Have fun!\"\n                      }\n                 },\n                 \"parsed\": true,\n                 \"url\": \"https://github.com/orels1/ORELS-Cogs\",\n                 \"type\": \"approved\"\n             }\n         ]\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/_apihistory.js",
    "groupTitle": "repo",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/repo/"
      }
    ],
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/repo/admin/parse",
    "title": "Parse new repos",
    "version": "0.0.1",
    "name": "parseRepos",
    "group": "repo",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Service-Token",
            "description": "<p>Admin-oriented service token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": 'Parsing started',\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/_apihistory.js",
    "groupTitle": "repo",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/repo/admin/parse"
      }
    ],
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/repo/",
    "title": "Add new repo to DB",
    "version": "0.1.0",
    "name": "postRepo",
    "group": "repo",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Service-Token",
            "description": "<p>Admin-oriented service token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>Repo github URL</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Repo type, either approved or beta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"url\": \"https://github.com/orels1/ORELS-Cogs\",\n    \"type\": \"approved\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n        \"__v\": 0,\n        \"name\": \"ORELS-Cogs\",\n        \"_id\": \"587d7a9d13893158907d1729\",\n        \"links\": {\n            \"github\": {\n                \"self\": \"https://github.com/orels1/ORELS-Cogs\"\n            }\n        },\n        \"type\": \"unapproved\",\n        \"parsed\": false,\n        \"cogs\": [],\n        \"author\": {\n            \"url\": \"https://github.com/orels1\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/_apihistory.js",
    "groupTitle": "repo",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/repo/"
      }
    ],
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "EntryExists",
            "description": "<p>entry is already in DB</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"error\": \"ExtryExists\",\n    \"error_details\": \"This db entry already exists\",\n    \"results\": {\"id\": \"21dsa2t234tdsfsr141\"}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/repo/",
    "title": "Add new repo to DB",
    "version": "0.0.1",
    "name": "postRepo",
    "group": "repo",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Service-Token",
            "description": "<p>Admin-oriented service token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>Repo github URL</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Repo type, either approved or beta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"url\": \"https://github.com/orels1/ORELS-Cogs\",\n    \"type\": \"approved\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n        \"id\": \"21fsdkg9342ijhgh9sf0234\",\n        \"parsed\": false,\n        \"url\": \"https://github.com/orels1/ORELS-Cogs\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/_apihistory.js",
    "groupTitle": "repo",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/repo/"
      }
    ],
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "EntryExists",
            "description": "<p>entry is already in DB</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"error\": \"ExtryExists\",\n    \"error_details\": \"This db entry already exists\",\n    \"results\": {\"id\": \"21dsa2t234tdsfsr141\"}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/repo/:id",
    "title": "Update repo",
    "version": "0.1.0",
    "name": "putRepo",
    "group": "repo",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Service-Token",
            "description": "<p>Admin-oriented service token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Repo id in DB</p>"
          },
          {
            "group": "Parameter",
            "type": "JSON",
            "optional": false,
            "field": "payload",
            "description": "<p>Object containing the new repo data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"payload\": {\n        \"parsed\": false\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/_apihistory.js",
    "groupTitle": "repo",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/repo/:id"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.id",
            "description": "<p>Id of the repo in DB</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.name",
            "description": "<p>Name of the repo</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author",
            "description": "<p>Author of the repo</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.name",
            "description": "<p>Author's name according to info.json</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.url",
            "description": "<p>Author's github url</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.short",
            "description": "<p>Short description of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.description",
            "description": "<p>Full description of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.type",
            "description": "<p>Repo's type</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.parsed",
            "description": "<p>Repo's parsing status</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.cogs",
            "description": "<p>List of cogs in a JS object</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links",
            "description": "<p>Contains relevant links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._self",
            "description": "<p>Link to repo's API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._update",
            "description": "<p>Link to repo's update API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.self",
            "description": "<p>Link to repo's webpage</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links.github",
            "description": "<p>Contains relevant github links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github.self",
            "description": "<p>Link to the repo on github</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github._update",
            "description": "<p>Link to info.json github's api endpoint</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n        \"_id\": \"587d62b4c54cad51845ae101\",\n        \"name\": \"ORELS-Cogs\",\n        \"__v\": 4,\n        \"description\": \"Repository of mainly gaming/data based cogs, with a bit of some fun stuff. Use as you like.\",\n        \"short\": \"Data scraping cogs with a bit of extra\",\n        \"links\": {\n            \"_self\": \"/api/v1/repo/ORELS-Cogs\",\n            \"_update\": \"/api/v1/repo/ORELS-Cogs/fetch\",\n            \"self\": \"cogs/repo/ORELS-Cogs/\",\n            \"github\": {\n                \"self\": \"https://github.com/orels1/ORELS-Cogs\",\n                \"_update\": \"https://api.github.com/repos/orels1/ORELS-Cogs/contents/info.json?ref=master\"\n            }\n        },\n        \"type\": \"unapproved\",\n        \"parsed\": false,\n        \"cogs\": [],\n        \"author\": {\n            \"name\": \"orels\",\n            \"url\": \"https://github.com/orels1\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/repo/:id",
    "title": "Update repo",
    "version": "0.0.1",
    "name": "putRepo",
    "group": "repo",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Service-Token",
            "description": "<p>Admin-oriented service token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Repo id in DB</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>New repo url</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"url\": \"https://github.com/orels1/ORELS-C\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/_apihistory.js",
    "groupTitle": "repo",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/repo/:id"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.id",
            "description": "<p>Id of the repo in DB</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.name",
            "description": "<p>Name of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.author",
            "description": "<p>Author of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.short",
            "description": "<p>Short description of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.description",
            "description": "<p>Full description of the repo</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.cogs",
            "description": "<p>List of cogs in a JS object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n         \"_id\": \"21fsdkg9342ijhgh9sf0234\",\n         \"name\": \"ORELS-Cogs\",\n         \"author\": \"orels1\",\n         \"short\": \"Mainly gaming/data oriented cogs\",\n         \"description\": \"(orels1): Thanks for using my repo, hope you have fun!\",\n         \"cogs\": {\n             \"dota\": {\n                  \"author\": \"orels1\",\n                  \"short\": \"Gets you item builds, hero info and more\",\n                  \"description\": \"Dota 2 cog will get you the top item and skill-builds for any hero in game, as well as stats for your latest match + a dotabuff link. Enjoy\",\n                  \"install_msg\": \"(orels1): Have fun!\"\n              }\n         },\n         \"parsed\": true,\n         \"url\": \"https://github.com/orels1/ORELS-Cogs\",\n         \"type\": \"approved\"\n     }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/repos/:id",
    "title": "Delete repo by id",
    "version": "0.2.0",
    "name": "deleteRepo",
    "group": "repos",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Service-Token",
            "description": "<p>Admin-oriented service token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Repo id in DB</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/repos.js",
    "groupTitle": "repos",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/repos/:id"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/repo/:author/:repoName",
    "title": "Get repo",
    "version": "0.2.0",
    "name": "getRepo",
    "group": "repos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Author's username on github</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "repoName",
            "description": "<p>name of the repo to get</p>"
          }
        ]
      }
    },
    "filename": "backend/api/v1/repos.js",
    "groupTitle": "repos",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/repo/:author/:repoName"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.id",
            "description": "<p>Id of the repo in DB</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.name",
            "description": "<p>Name of the repo</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author",
            "description": "<p>Author of the repo</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.name",
            "description": "<p>Author's name according to info.json</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.url",
            "description": "<p>Author's github url</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.short",
            "description": "<p>Short description of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.description",
            "description": "<p>Full description of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.type",
            "description": "<p>Repo's type</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.parsed",
            "description": "<p>Repo's parsing status</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.cogs",
            "description": "<p>List of cogs in a JS object</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links",
            "description": "<p>Contains relevant links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._self",
            "description": "<p>Link to repo's API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._update",
            "description": "<p>Link to repo's update API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.self",
            "description": "<p>Link to repo's webpage</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links.github",
            "description": "<p>Contains relevant github links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github.self",
            "description": "<p>Link to the repo on github</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github._update",
            "description": "<p>Link to info.json github's api endpoint</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n        \"_id\": \"587d62b4c54cad51845ae101\",\n        \"name\": \"ORELS-Cogs\",\n        \"__v\": 4,\n        \"description\": \"Repository of mainly gaming/data based cogs, with a bit of some fun stuff. Use as you like.\",\n        \"short\": \"Data scraping cogs with a bit of extra\",\n        \"links\": {\n            \"_self\": \"/api/v1/repos/orels1/ORELS-Cogs\",\n            \"_update\": \"/api/v1/repos/orels1/ORELS-Cogs/fetch\",\n            \"_cogs\": \"/api/v1/cogs/orels1/ORELS-Cogs\n            \"self\": \"/cogs/orels1/ORELS-Cogs/\",\n            \"github\": {\n                \"self\": \"https://github.com/orels1/ORELS-Cogs\",\n                \"_update\": \"https://api.github.com/repos/orels1/ORELS-Cogs/contents/info.json?ref=master\"\n            }\n        },\n        \"type\": \"unapproved\",\n        \"parsed\": false,\n        \"cogs\": [],\n        \"author\": {\n            \"name\": \"orels\",\n            \"url\": \"https://github.com/orels1\"\n        },\n        \"tags\": [\n            \"api\",\n            \"tools\",\n            \"fun\",\n            \"gaming\"\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/repos/",
    "title": "List all repos",
    "version": "0.2.0",
    "name": "getRepoList",
    "group": "repos",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "results.list",
            "description": "<p>List of entries</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n         \"list\": [\n             {\n                 \"_id\": \"587d62b4c54cad51845ae101\",\n                 \"name\": \"ORELS-Cogs\",\n                 \"__v\": 4,\n                 \"description\": \"Repository of mainly gaming/data based cogs, with a bit of some fun stuff. Use as you like.\",\n                 \"short\": \"Data scraping cogs with a bit of extra\",\n                 \"links\": {\n                     \"_self\": \"/api/v1/repos/orels1/ORELS-Cogs\",\n                     \"_update\": \"/api/v1/repos/orels1/ORELS-Cogs/fetch\",\n                     \"_cogs\": \"/api/v1/cogs/orels1/ORELS-Cogs\n                     \"self\": \"/cogs/orels1/ORELS-Cogs/\",\n                     \"github\": {\n                         \"self\": \"https://github.com/orels1/ORELS-Cogs\",\n                         \"_update\": \"https://api.github.com/repos/orels1/ORELS-Cogs/contents/info.json?ref=master\"\n                     }\n                 },\n                 \"type\": \"unapproved\",\n                 \"parsed\": false,\n                 \"cogs\": [],\n                 \"author\": {\n                     \"name\": \"orels\",\n                     \"url\": \"https://github.com/orels1\"\n                 },\n                 \"tags\": [\n                    \"api\",\n                    \"tools\",\n                    \"fun\",\n                    \"gaming\"\n                 ]\n             }\n         ]\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/repos.js",
    "groupTitle": "repos",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/repos/"
      }
    ],
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/repos/:author/:repoName/parse",
    "title": "Parse repo",
    "version": "0.2.0",
    "name": "parseRepos",
    "group": "repos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Author's username on github</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "repoName",
            "description": "<p>name of the repo to get</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Service-Token",
            "description": "<p>Admin-oriented service token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": 'Parsing started',\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/repos.js",
    "groupTitle": "repos",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/repos/:author/:repoName/parse"
      }
    ],
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/repos/",
    "title": "Add new repo to DB",
    "version": "0.2.0",
    "name": "postRepo",
    "group": "repos",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Service-Token",
            "description": "<p>Admin-oriented service token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>Repo github URL</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Repo type, either approved or beta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"url\": \"https://github.com/orels1/ORELS-Cogs\",\n    \"type\": \"approved\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n        \"__v\": 0,\n        \"name\": \"ORELS-Cogs\",\n        \"_id\": \"587d7a9d13893158907d1729\",\n        \"links\": {\n            \"github\": {\n                \"self\": \"https://github.com/orels1/ORELS-Cogs\"\n            }\n        },\n        \"type\": \"unapproved\",\n        \"parsed\": false,\n        \"cogs\": [],\n        \"author\": {\n            \"url\": \"https://github.com/orels1\",\n            \"username\": \"orels1\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/repos.js",
    "groupTitle": "repos",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/repos/"
      }
    ],
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "EntryExists",
            "description": "<p>entry is already in DB</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"error\": \"ExtryExists\",\n    \"error_details\": \"This db entry already exists\",\n    \"results\": {\"id\": \"21dsa2t234tdsfsr141\"}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/repos/:id",
    "title": "Update repo",
    "version": "0.2.0",
    "name": "putRepo",
    "group": "repos",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Service-Token",
            "description": "<p>Admin-oriented service token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Repo id in DB</p>"
          },
          {
            "group": "Parameter",
            "type": "JSON",
            "optional": false,
            "field": "payload",
            "description": "<p>Object containing the new repo data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"payload\": {\n        \"parsed\": false\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/repos.js",
    "groupTitle": "repos",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/repos/:id"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.id",
            "description": "<p>Id of the repo in DB</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.name",
            "description": "<p>Name of the repo</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author",
            "description": "<p>Author of the repo</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.name",
            "description": "<p>Author's name according to info.json</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.url",
            "description": "<p>Author's github url</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.short",
            "description": "<p>Short description of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.description",
            "description": "<p>Full description of the repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.type",
            "description": "<p>Repo's type</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.parsed",
            "description": "<p>Repo's parsing status</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.cogs",
            "description": "<p>List of cogs in a JS object</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links",
            "description": "<p>Contains relevant links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._self",
            "description": "<p>Link to repo's API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._update",
            "description": "<p>Link to repo's update API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.self",
            "description": "<p>Link to repo's webpage</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links.github",
            "description": "<p>Contains relevant github links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github.self",
            "description": "<p>Link to the repo on github</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github._update",
            "description": "<p>Link to info.json github's api endpoint</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n        \"_id\": \"587d62b4c54cad51845ae101\",\n        \"name\": \"ORELS-Cogs\",\n        \"__v\": 4,\n        \"description\": \"Repository of mainly gaming/data based cogs, with a bit of some fun stuff. Use as you like.\",\n        \"short\": \"Data scraping cogs with a bit of extra\",\n        \"links\": {\n            \"_self\": \"/api/v1/repos/orels1/ORELS-Cogs\",\n            \"_update\": \"/api/v1/repos/orels1/ORELS-Cogs/fetch\",\n            \"_cogs\": \"/api/v1/cogs/orels1/ORELS-Cogs\n            \"self\": \"/cogs/orels1/ORELS-Cogs/\",\n            \"github\": {\n                \"self\": \"https://github.com/orels1/ORELS-Cogs\",\n                \"_update\": \"https://api.github.com/repos/orels1/ORELS-Cogs/contents/info.json?ref=master\"\n            }\n        },\n        \"type\": \"unapproved\",\n        \"parsed\": false,\n        \"cogs\": [],\n        \"author\": {\n            \"name\": \"orels\",\n            \"url\": \"https://github.com/orels1\"\n        },\n        \"tags\": [\n            \"api\",\n            \"tools\",\n            \"fun\",\n            \"gaming\"\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/search/cogs/:term",
    "title": "Search for a cog",
    "version": "0.2.0",
    "name": "searchCog",
    "group": "search",
    "description": "<p>Supports offset and limit query params, by default set to offset=0 and limit=20</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "term",
            "description": "<p>Term to search for</p>"
          }
        ]
      }
    },
    "filename": "backend/api/v1/search.js",
    "groupTitle": "search",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/search/cogs/:term"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "EntryNotFound",
            "description": ""
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n    \"error\": \"DBError\",\n    \"error_details\": \"some DBError description\",\n    \"results\": {}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"error\": \"EntryNotFound\",\n    \"error_details\": \"Requested entry is not found\",\n    \"results\": {}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Should always be false</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results",
            "description": "<p>Contains the results of Request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.name",
            "description": "<p>Name of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author",
            "description": "<p>Author of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.name",
            "description": "<p>Author's name according to info.json</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.author.url",
            "description": "<p>Author's github url</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.short",
            "description": "<p>Short description of the cog</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.description",
            "description": "<p>Full description of the cog</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links",
            "description": "<p>Contains relevant links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._self",
            "description": "<p>Link to cogs's API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._repo",
            "description": "<p>Link to cog's repo API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links._update",
            "description": "<p>Link to cogs's update API endpoint</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.self",
            "description": "<p>Link to cog's webpage</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.repo",
            "description": "<p>Link to cog's repo webpage</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.links.github",
            "description": "<p>Contains relevant github links</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github.self",
            "description": "<p>Link to the cog on github</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github.repo",
            "description": "<p>Link to the repo on github</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.links.github._update",
            "description": "<p>Link to info.json github's api endpoint</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "results.repo",
            "description": "<p>Contains info about cog's repo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.repo.type",
            "description": "<p>Cog's repo type</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "results.repo.name",
            "description": "<p>Cog's repo name</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "results.voted",
            "description": "<p>Cog vote status for request's IP</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": {\n        \"links\": {\n            \"github\": {\n                \"_update\": \"https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master\",\n                \"repo\": \"https://github.com/orels1/ORELS-Cogs\",\n                \"self\": \"https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py\"\n            },\n            \"repo\": \"cogs/orels1/ORELS-Cogs/\",\n            \"self\": \"/cogs/orels1/ORELS-Cogs/dota/\",\n            \"_update\": \"/api/v1/cogs/orels1/ORELS-Cogs/dota/fetch\",\n            \"_repo\": \"/api/v1/repos/orels1/ORELS-Cogs\",\n            \"_self\": \"/api/v1/cogs/orels1/ORELS-Cogs/dota\"\n        },\n        \"description\": \"Requires tabulate, dota2py and beautfulSoup\\nInstall with:\\npip3 install bs4\\npip3 install dota2py\\npip3 install tabulate\\n\\nAlso requires dota 2 api key, which you can get here: http://steamcommunity.com/dev/apikey\\nYou will need to set your key with [p]dota setkey command in PM\\n\\nUsage:\\n[p]dota hero <hero>\\n Shows info about hero\\n[p]dota build <hero>\\n Shows most popular skillbuild\\n[p]dota items <hero>\\n Shows most popular items\\n[p]dota online\\n Shows amount of players online\\n[p]dota recent <steamID>\\n Shows info about the latest dota match\",\n        \"short\": null,\n        \"updated_at\": \"Fri Jan 27 2017 00:10:15 GMT+0300\",\n        \"author\": {\n            \"url\": \"https://github.com/orels1\",\n            \"name\": \"orels\"\n        },\n        \"repo\": {\n            \"type\": \"unapproved\",\n            \"name\": \"ORELS-Cogs\"\n        },\n        \"name\": \"dota\",\n        \"voted\": false,\n        \"votes\": 0,\n        }\n    }\n}",
          "type": "json"
        }
      ]
    }
  }
] });
