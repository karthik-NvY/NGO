/*
    Schema for Template 1
*/

const mongoose = require('mongoose');

const Template1Schema = new mongoose.Schema({
    logo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    heroImages: [{
        id: {
            type: Number
        },
        image: {
            type: String,
            required: true
        }
    }],
    aboutUsText: {
        type: String,
        required: true
    },
    aboutUsImage1: {
        type: String,
        required: true
    },
    aboutUsImage2: {
        type: String,
        required: true
    },
    recentEvents: [{
        id: {
            type: Number
        },
        image: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }],
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    contactImage: {
        type: String,
        required: true
    }
});

// Creating and exporting Template1 model
module.exports = mongoose.model('Template1', Template1Schema);
