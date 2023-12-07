const mongoose = require("mongoose");

const Category = mongoose.Schema({
    app_id: {
        type: String,
        required: [true, "App id cannot be null"],
    },
    name: {
        type: String,
        required: [true, "Category name cannot be null"],
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

module.exports = mongoose.model('Category', Category);