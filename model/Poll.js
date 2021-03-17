const mongoose = require('mongoose');

const resourceVoteSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    resourceID: {
        type: String,
        required: true
    }, 
    votes: {
        type: Number,
        required: true
    }
});

const pollSchema = new mongoose.Schema({
    kitchenID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    resourceList: {
        type: [resourceVoteSchema],
        required: true
    }
});

module.exports = mongoose.model('Poll', pollSchema);