/*
    File contains schema for Roles of every user in every ngo.
    File contains schema for list of features for every ngo.
*/

const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({

    user_id: {
        type: Number,
        required: true,
        trim: true,
    },
    ngo_id: {
        type: Number,
        required : true,
        trim: true
    },
    // role of the particular user in the particular ngo
    position:{
        type: String,
        required : true,
        trim: true
    }
 

})

const ngo_featureSchema = new mongoose.Schema({
    // identifying feature of the ngo
    feature_id: {
        type: Number,
        required: true,
        trim: true,
    },
    ngo_id: {
        type: Number,
        required : true,
        trim: true
    }

})
module.exports = mongoose.model('Roles', roleSchema)
module.exports = mongoose.model('NgoFeatures', ngo_featureSchema)