const mongoose = require('mongoose');


const ProfitBookSchema = new mongoose.Schema({
    profitamount: {
        type: Number,
        required: true
    },
    profitpercent: {
        type: Number,
        required: true
    },
    investmentid: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    profitdate: {
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
    coinpriceaftersell:{
        type:Number,
        required:true
    },
    coinpricebeforesell:{
        type:Number,
        required:true
    },
    coinquantity:{
        type:Number,
        required:true
    }

});

module.exports = mongoose.model('ProfitBook', ProfitBookSchema);