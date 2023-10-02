const mongoose = require("mongoose");

const Service = mongoose.Schema({
    type: {
        type: String,
        required: [true, "type cannot be null"],
        trim: true,
    },
    category: {
        type: String,
        required: [true, "category id cannot be null"],
        trim: true,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "Use cannot be null"]
    },
    file: {
        type: String
    },
    description: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    phone: {
        type: String
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

module.exports = mongoose.model('Service', Service);