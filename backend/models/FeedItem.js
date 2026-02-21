const mongoose = require("mongoose");

const FeedItem = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "Use cannot be null"]
    },
		entityId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true
		},
		entityType: {
			type: String,
			enum: ['transportation', 'education', 'accommodation'],
			required: true
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

module.exports = mongoose.model('FeedItem', FeedItem);
