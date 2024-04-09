/*
     File contains schema for ngo 
*/

const mongoose = require('mongoose');

const ngoInfoSchema = new mongoose.Schema({
    // id of the ngo
    ngo_id: {
        type: String,
        //required : true,
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

ngoInfoSchema.pre('save', async function (next){
    this.ngo_id=this._id.toString();
    next();
});

module.exports = mongoose.model('Ngos', ngoInfoSchema)