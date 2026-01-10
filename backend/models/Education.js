const mongoose = require("mongoose");

const Education = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "Use cannot be null"]
    },
		serviceType: {
        type: String 
		},
    description: {
        type: String
    },
    price: {
        type: Number 
    },
    files: {
        type: [String]
    },
    phone: {
        type: String,
        trim: true
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

module.exports = mongoose.model('Education', Education);
