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

const ExecReq = new mongoose.Schema({
    ngo_id: {
        type: String,
        required : true,
        ref : 'ngos'
    },
})

const waitlist = mongoose.model('waitlist', RequestForExec);
const requestwindow = mongoose.model('openExecRequests', ExecReq); 

module.exports = {waitlist , requestwindow};