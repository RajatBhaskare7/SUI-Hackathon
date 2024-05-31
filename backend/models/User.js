const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
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
        type:Number,
        default:0
    },
    });

const User = mongoose.model("User", UserSchema);
module.exports = User;