/*
    File contains schema for users.
*/
const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
    // id of the user
    user_id: {
        type: Number,
        required : true,
        unique: true,
        trim: true,
    },
    // name of the user
    name: {
        type: String,
        required : true,
        trim: true
    },
    // email of the user
    email_id:{
        type:String,
        required : true,
        trim: true
    },
    // phone number of the user
    phn_number:{
        type:Number,
        required : true,
        trim: true
    },
    // password of the user
    password: {
        type: String,
        required : true
    }

})

module.exports = mongoose.model('Users', userInfoSchema)