/*
     File contains schema for features
*/
const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
   // id of the feature
    feature_id: {
        type: Number,
        required : true,
        unique: true,
        trim: true,
    },
    // name of the feature
    name: {
        type: String,
        required : true,
        trim: true
    }
})

const ngo_featureSchema = new mongoose.Schema({
    // identifying feature of the ngo
    feature_id: {
        type: String,
        required: true,
        trim: true,
    },
    // id of the ngo
    ngo_id: {
        type: String,
        required : true,
        trim: true
    }

});

module.exports = mongoose.model('Features', featureSchema)