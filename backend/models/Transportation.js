const mongoose = require("mongoose");

const Transportation = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "Use cannot be null"]
    },
		serviceType: {
        type: String 
		},
    files: {
        type: [String]
    },
    phone: {
        type: String
    },
    address: {
        type: String,
        trim: true
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

module.exports = mongoose.model('Transportation', Transportation);
