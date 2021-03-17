const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    personalID: {
        type: String,
        required: true,
        min: 7
    }, 
    kitchenID: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true,
        min: 6
    },
    isCook: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);