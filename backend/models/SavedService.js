const mongoose = require("mongoose");

const SavedService = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "User cannot be null"]
    },
		service: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Service",
        required: [true, "Service cannot be null"]
		},
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('SavedService', SavedService);
