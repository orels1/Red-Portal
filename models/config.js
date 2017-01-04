const mongoose = require('mongoose');

let ConfigSchema = new mongoose.Schema({
    'name': String,
    'value': mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model('Config', ConfigSchema);
