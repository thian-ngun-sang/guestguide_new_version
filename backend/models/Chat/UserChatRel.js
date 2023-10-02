const mongoose = require("mongoose");

const UserChatRel = mongoose.Schema({
    chat_id: {
        type: String,
        required: [true, "Chat id cannot be null"],
        trim: true
    },
    user_id: {
        type: String,
        required: [true, "User id cannot be null"],
        trim: true
    }
});

module.exports = mongoose.model('UserChatRel', UserChatRel);