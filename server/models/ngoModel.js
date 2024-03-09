/*
     File contains schema for ngo 
*/

const mongoose = require('mongoose');

const ngoInfoSchema = new mongoose.Schema({
    // id of the ngo
    ngo_id: {
        type: Number,
        required : true,
        unique: true,
        trim: true,
    },
    // name of the ngo
    name: {
        type: String,
        required : true,
        trim: true
    },
    // admin of the ngo
    admin: {
        type: String,
        required : true,
        trim: true
    }

})

module.exports = mongoose.model('Ngos', ngoInfoSchema)