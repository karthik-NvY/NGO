/*
    File contains schema for users.
*/
const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({

    user_id: {
        type: Number,
        required : true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required : true,
        trim: true
    },
    email_id:{
        type:String,
        required : true,
        trim: true
    },
    phn_number:{
        type:Number,
        required : true,
        trim: true
    },
    password: {
        type: String,
        required : true
    }

})

module.exports = mongoose.model('Users', userInfoSchema)