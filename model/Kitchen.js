const mongoose = require('mongoose');

const kitchenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    workersList: {
        type: [String]
    }
});

module.exports = mongoose.model('Kitchen', kitchenSchema);