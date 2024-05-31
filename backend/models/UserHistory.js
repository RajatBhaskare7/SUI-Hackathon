const mongoose = require('mongoose');

const DeletedUserSchema = new mongoose.Schema({
   //i will keep the deleted user history in this model
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dateofdeletion:{
        type:Date,
        default:Date.now
    },
    JoinDate: {
        type: Date,
        default: Date.now,
    },
    role:{
        type:String,
        default:"user" 
    },
    name:{
        type:String,
        default:""
    },
    address:{
        type:String,
        default:""
    },
    phone:{
        type:String,
        default:""
    },
    dob:{
        type:Date,
        default:Date.now
    },
    balance:{
        type:Number,
        default:0
    },
    aadharcardfront:{
        type:String,
        default:""
    },
    pancard:{
        type:String,
        default:""
    },
    aadharcardback:{
        type:String,
        default:""
    },
    photo:{
        type:String,
        default:""
    },
    withdrawal:{
        type:String,
        default:""
    },
    investmentdata:{
        type:Array,
        default:[]
    },
    transactiondata:{
        type:Array,
        default:[]
    }

});


module.exports = mongoose.model('DeletedUser', DeletedUserSchema);