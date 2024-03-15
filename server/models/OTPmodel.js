/*
  File contins schema for OTPs.
*/
const mongoose = require('mongoose');
const sendVerificationEmail = require('../services/mailer'); // Function for sending mail.

// Expire time for OTP.
const minutes = 5

// Schema for OTP.
const otpSchema = new mongoose.Schema({
  // Email. 
  email: {
    type: String,
    required: true,
  },
  // OTP record.
  otp: {
    type: String,
    required: true,
  },
  // OTP creation time.
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * minutes,
  },
});

// After making a new entry or updating old entry, this middleware runs.
otpSchema.pre(["save", "updateOne"], async function (next) {
  if (this.isNew) {
    console.log("New document saved to the database");
  }
  else{
    console.log("Document updated in the database");
  }
  await sendVerificationEmail(this.email, this.otp); // Sends OTP mail.
});

module.exports = mongoose.model("authenticationOTP", otpSchema);