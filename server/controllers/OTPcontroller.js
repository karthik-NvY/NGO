const otpGenerator = require('otp-generator'); // Generates OTP
const mailSender = require('../services/index'); // sends OTP.

let OTPlength = 6 // Size of OTP.

/*
---------
  TODO
---------
0: In sendOTP, when user gives the email, it should be checked against
    emails in database. If user already exists, response is 400 since this
    is sign-up mechanism.

1: In sendOTP, when new otp is generated, add it to the OTP's database.
---------
*/

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body; // Extracts email from request body.

    // Check if no email is submitted.
    if(!email){
      return res.status(400).json({
        success:false,
        message:'Missing credentials'
      })
    }

    /*
          Check for user in database. TODO-0.
    */

    // Generates OTP using otpGenerator package.
    let otp = otpGenerator.generate(OTPlength, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const data = { email, otp }; // Email and OTP.
    
    /*
          Add the OTP to database. TODO-1.
    */

    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`
    );

    // Success response.
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp,
    });
  } catch (error) {
    console.log('ERROR in sending OTP')
    console.log(error);

    // Error in OTP sending.
    return res.status(500).json({ 
      success: false,
      message: 'error in sending otp'
    });
  }
};

module.exports = sendOTP