define({ "api": [
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
    "filename": "backend/api/v1/cogs.js",
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
    "filename": "backend/api/v1/cogs.js",
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
    "filename": "backend/api/v1/cogs.js",
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
    "filename": "backend/api/v1/repo.js",
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
    "type": "put",
    "url": "/repo/admin/fetch",
    "title": "Parse again",
    "version": "0.0.1",
    "name": "fetchRepos",
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
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": 'Successfully parsed and saved 8 repos',\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/repo.js",
    "groupTitle": "repo",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/repo/admin/fetch"
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
    "filename": "backend/api/v1/repo.js",
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
    "filename": "backend/api/v1/repo.js",
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
          "content": "HTTP/1.1 200 OK\n{\n    \"error\": false,\n    \"results\": 'Successfully parsed and saved 8 repos',\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/api/v1/repo.js",
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
    "filename": "backend/api/v1/repo.js",
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
    "filename": "backend/api/v1/repo.js",
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
  }
] });
