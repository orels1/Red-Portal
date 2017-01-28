const mongoose = require('mongoose');

let RepoSchema = new mongoose.Schema({
    'name': String,
    'author': {
        'name': String,
        'url': String,
        'username': String,
    },
    'short': String,
    'description': String,
    'cogs': {default: [], type: Array},
    'parsed': {default: false, type: Boolean},
    'type': {default: 'approved', type: String},
    'links': { // All the API endpoints have _ in the name
        '_self': String, // This object api endpoint
        '_update': String, // This object's update api handler (uses PUT, requires access-token)
        '_cogs': String, // This repo cogs api endpoint
        'self': String, // This object's website url
        'github': {
            'self': String, // This object's github url
            '_update': String, // This object's github api update link
        },
    },
    'tags': {default: [], type: [String]},
});

module.exports = mongoose.model('Repo', RepoSchema);
