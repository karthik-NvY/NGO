const mongoose = require('mongoose')

// Schema for users.
const userSchema = new mongoose.Schema({
    // Username
    name: {
        type: String,
        required : true,
        trim: true
    },
    // User email.
    email: {
        type: String,
        required : true,
        trim: true
    },
    // User password
    password: {
        type: String,
        required : true
    }
})

module.exports = mongoose.model('users', userSchema)