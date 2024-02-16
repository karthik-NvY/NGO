const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({

    feature_id: {
        type: Number,
        required : true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required : true,
        trim: true
    }
})

module.exports = mongoose.model('Features', featureSchema)