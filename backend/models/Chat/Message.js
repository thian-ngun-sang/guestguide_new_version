const mongoose = require("mongoose");

const Message = mongoose.Schema({
    chat_id: {
        type: String,
        required: [true, "Chat id cannot be null"],
        trim: true
    },
    user_id: {
        type: String,
        required: [true, "User id cannot be null"],
        trim: true
    },
    body: {
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

module.exports = mongoose.model('Message', Message);