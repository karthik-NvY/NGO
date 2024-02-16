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
    position:{
        type: String,
        required : true,
        trim: true
    }
 

})

const ngo_featureSchema = new mongoose.Schema({

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
module.exports = mongoose.model('role', roleSchema)
module.exports = mongoose.model('ngofeature', ngo_featureSchema)