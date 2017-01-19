/**
 * Created by orel- on 19/Jan/17.
 */
const mongoose = require('mongoose');

let HookSchema = new mongoose.Schema({
    'name': String,
    'type': {type: String, default: 'repo-update'},
    'links': {
        '_self': String
    },
    'created': {type: Date, default: new Date()},
    'last_used': {type: Date, default: new Date()},
    'times_used': {type: Number, default: 0},
    'repo': {
        'name': String,
        '_id': String,
        'links': {
            '_self': String,
            'self': String,
            'github': {
                '_self': String
            }
        }
    }
});

module.exports = mongoose.model('Hook', HookSchema);