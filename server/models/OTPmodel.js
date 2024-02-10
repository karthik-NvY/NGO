// models/otpModel.js
const mongoose = require('mongoose');
const mailSender = require('../helpers/senderHelper');

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

// async function sendVerificationEmail(email, otp) {
//   try {
//     const mailResponse = await mailSender(
//       email,
//       "Verification Email",
//       `<h1>Please confirm your OTP</h1>
//        <p>Here is your OTP code: ${otp}</p>`
//     );
//     console.log("Email sent successfully");
//   } 
//   catch (error) {
//     console.log("Error occurred while sending email: ", error);
//     throw error;
//   }
// }
// otpSchema.pre("save", async function (next) {
//   console.log("New document saved to the database");
//   if (this.isNew) {
//     await sendVerificationEmail(this.email, this.otp);
//   }
//   next();
// });

module.exports = mongoose.model("OTP", otpSchema);