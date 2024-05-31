const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    PaymentMethod: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
    
