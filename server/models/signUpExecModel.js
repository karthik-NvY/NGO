/*
     File contains schema for 
*/

const mongoose = require('mongoose');

const RequestForExec = new mongoose.Schema({
    
    // id of the user who requested
    user_id: {
        type: String,
        required : true,
        trim: true
    },
    ngo_id: {
        type: String,
        required : true,
        trim: true
    },
})

module.exports = mongoose.model('waitlist', RequestForExec)