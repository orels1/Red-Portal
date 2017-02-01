const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    'id': String,
    'displayName': String,
    'username': String,
    'profileUrl': String,
    'emails': Array,
    '_json': Object,
    'tokens': {
        'access_token': String,
        'jwt': String,
    },
    'repos': {type: Array, default: []},
    'roles': {type: [String], default: ['member']},
});

module.exports = mongoose.model('User', UserSchema);
