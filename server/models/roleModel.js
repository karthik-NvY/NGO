/*
    File contains schema for Roles of every user in every ngo.
    File contains schema for list of features for every ngo.
*/
const Users=require('./userModel');
const mongoose = require('mongoose');
const Ngos = require('./ngoModel'); 

const roleSchema = new mongoose.Schema({
    //id of the user
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Users,
        required: true,
        trim: true,
    },
    // id of the ngo
    ngo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Ngos,
        required: true,
        trim: true,
    },
    // role of the particular user in the particular ngo
    role:{
        type: String,
        required : true,
        trim: true
    }
})
module.exports = mongoose.model('Roles', roleSchema)