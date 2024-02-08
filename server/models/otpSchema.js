/*
TODO:
1.defining schema for email validation using zod
2.defining schema for authentication OTP

*/

const mongoose = require('mongoose');
const zod = require('zod');
const bcrypt = require('bcryptjs');

//TODO-1
const emailSchema = zod.string().email();

//TODO-2
const authenticationOTPSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        //validating user email using emailSchema
        validate: {
            validator: (value) => {
                try {
                    emailSchema.parse(value);
                    return true;
                } catch (error) {
                    throw new Error("Not a valid email.");
                }
            }
        },
    },
    otp:{
        type: String,
        required: true
    },
    otpCreationTime: {
        type: Date,
        required: true,
    },
});

//user otp model
const authenticationOTP = new mongoose.model("authenticationOTPs",authenticationOTPSchema);

module.exports = authenticationOTP;