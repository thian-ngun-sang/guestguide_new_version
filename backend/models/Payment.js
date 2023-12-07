const mongoose = require("mongoose");

const Payment = mongoose.Schema({
    post_id: {
        type: String,
        required: [true, "Post id cannot be null"]
    },
    price: {
        type: Number,
        required: [true, "Price should not be null"]
    },
    payment_unit: { // MMK, USD, SGD
        type: String,
    },
    payment_period: {   // per hour, per day, per week
        type: String,
        maxlength: [10, "Period cannot be longer than 10 characters"]
    }
})

module.exports = mongoose.model('Payment', Payment);