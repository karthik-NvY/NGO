/*
    Schema for Template 1
*/

const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
    template_id : {
        type: Number,
        default : 1
    },
    name: {
        type: String,
        required: true
    },
    visionText: {
        type: String,
        required: true
    },
    aboutUsText: {
        type: String,
        required: true
    },
    eventBottomText:{
        type: String,
        required: true
    },
    eventDescriptions:{
        type:[String],
        required:true
    },
    logo: {
        type: String,
        required: true
    },
    main:{
        type:String,
        required:true
    },
    aboutUsImage:{
        type:String,
        required:true
    },
    aboutUsImage2:{
        type:String,
        required:true
    },
    contactImage:{
        type:String,
        required:true
    },
    eventImages:{
        type:[String],
        required:true
    },
    ngo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ngos', // Referencing the Ngos model
        required:true
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    xhandle: {
        type: String,
    },
    instahandle: {
        type: String,
    }
});

// Creating and exporting Template1 model
module.exports = mongoose.model('Template', TemplateSchema);
