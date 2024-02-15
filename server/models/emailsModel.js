const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

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
});

//function for hashing password 
userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

module.exports = mongoose.model('users', userSchema)