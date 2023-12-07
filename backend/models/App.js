const mongoose = require("mongoose");

const App = mongoose.Schema({
    name: {
        type: String,
        required: [true, "App name cannot be null"],
        trim: true,
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('App', App);