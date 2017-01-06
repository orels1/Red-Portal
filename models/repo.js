const mongoose = require('mongoose');

let RepoSchema = new mongoose.Schema({
    'name': String,
    'author': String,
    'short': String,
    'description': String,
    'cogs': {default: {}, type: Object},
    'parsed': {default: false, type: Boolean},
    'type': {default: 'approved', type: String},
    'url': String,
    'updateUrl': String,
});

module.exports = mongoose.model('Repo', RepoSchema);
