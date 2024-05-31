const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
    investamount: {
        type: Number,
        required: true
    },
    investtype: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    investdate: {
        type: Date,
        default: Date.now
    },
    coinname:{
        type:String,
        required:true
    },
    coincode:{
        type:String,
        required:true
    },
    coinprice:{
        type:Number,
        required:true
    },
    coinquantity:{
        type:Number,
        required:true
    }

});

module.exports = mongoose.model('Investment', InvestmentSchema);

