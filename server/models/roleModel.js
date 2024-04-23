/*
    File contains schema for Roles of every user in every ngo.
    File contains schema for list of features for every ngo.
*/

const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    //id of the user
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true,
    },
    // id of the ngo
    ngo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ngos',
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