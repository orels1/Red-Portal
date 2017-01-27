const mongoose = require('mongoose');

let CogSchema = new mongoose.Schema({
    'name': String,
    'author': {
        'name': String,
        'url': String,
        'username': String
    },
    'repo': Object,
    'short': String,
    'description': String,
    'updated_at': {type: Date, default: new Date()},
    'links': { // All the API endpoints have _ in the name
        '_self': String, // This cog api endpoint
        '_update': String, // This cog update api handler (uses PUT, requires access-token)
        '_repo': String, // This cog repo api endpoint
        'repo': String, // This cog repo website page
        'self': String, // This cog website url
        'github': {
            'self': String, // This cog github url
            'repo': String, // This cog repo github url
            '_update': String, // This cog github api update link
        },
    },
    'votes': {type: Number, default: 0},
    'voted': {type: Boolean, default: false}, // This is constructed for the individual user
    'tags': {default: [], type: [String]}
});

module.exports = mongoose.model('Cog', CogSchema);
