const mongoose = require('mongoose');

let VoteSchema = new mongoose.Schema({
    'username': String,
    'repo': String,
    'cog': String,
    'IPs': Array,
});

module.exports = mongoose.model('Vote', VoteSchema);
