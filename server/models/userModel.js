/*
    File contains schema for users.
*/
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

// Schema for users.
const userSchema = new mongoose.Schema({
    // Username
    user_id: {
        type: String,
        required : true,
        unique: true,
        trim: true,
    },
    // name of the user
    name: {
        type: String,
        required : true,
        trim: true
    },
    // email of the user
    email_id:{
        type:String,
        required : true,
        trim: true
    },
    // phone number of the user
    phn_number:{
        type:Number,
        required : true,
        trim: true
    },
    // password of the user
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

//function for password decryption
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

module.exports = mongoose.model('Users', userSchema) // Export user schema