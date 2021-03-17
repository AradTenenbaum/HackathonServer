const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    kitchenID: {
        type: String,
        required: true 
    },
    price: {
        type: Number,
        required: true
    },
    calories: {
        type: Number
    }
});

module.exports = mongoose.model('Resource', resourceSchema);