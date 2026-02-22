const mongoose = require("mongoose");

const Bookmark = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "User cannot be null"]
    },
		entityType: {
				type: String,
				enum: ['transportation', 'education', 'accommodation'],
				required: true
		},
		entityId: {
				type: mongoose.Schema.Types.ObjectId,
				required: true
		},
    created_at: {
        type: Date,
        default: Date.now()
    }
});

Bookmark.index(
	{ user: 1, entityType: 1, entityId: 1 },
	{ unique: true }
);

module.exports = mongoose.model('Bookmark', Bookmark);
