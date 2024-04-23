/*
  File contains controller for OTP handling.

TODO
-----
0: Migrating database in 
  sendOTP method
  | -- const userExists = await Users.findOne({email:email});
  | -- const existingEmail = await authenticationOTP.findOne({email:email});
  | -- const updateData = await authenticationOTP.findOneAndUpdate({email:email},
  | -- const stat = await authenticationOTP.create(data);
  validateOTP method
  | -- const entry = await authenticationOTP.find({ email }).sort({ createdAt: -1 }).limit(1);
*/
const otpGenerator = require('otp-generator'); // Generates OTP
const Users = require('../models/userModel'); // User database model
const authenticationOTP = require('../models/OTPmodel'); // OTP database model.

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

// Class contains methods that deal with otps.
class OTPhandler{

  // Method runs when request for an OTP is made.
  static sendOTP = async (req, res) => {
    try {
      const { email } = req.body; // Extracts email from request body.

      // Check if no email is submitted.
      if(!email){
        return res.status(400).json({
          success:false,
          message:'Missing credentials'
        })
      }

      const userExists = await Users.findOne({email_id:email});
      // Checks if user already exists.
        if(userExists){
          return res.status(409).json({
              success: false,
              message: "User already exists"
          })
        }

      // Generates OTP using otpGenerator package.
      let otp = otpGenerator.generate(OTPlength, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      const data = { email, otp }; // Email and OTP.
      const existingEmail = await authenticationOTP.findOne({email:email});

      // If OTP for given mail was alredy generated, update that entry.
      if(existingEmail){
        const updateData = await authenticationOTP.findOneAndUpdate({email:email},
          {otp:otp});
      }
      // else if no otp was present, add a new one.
      else{
        const stat = await authenticationOTP.create(data);
      }
      return res.status(200).json({
        success: true,
        message: 'OTP sent successfully'
      });
    } 
    catch (error) {
      console.log('ERROR in sending OTP')
      console.log(error);

      // Error in OTP sending.
      return res.status(500).json({ 
        success: false,
        message: 'error in sending otp'
      });
    }
  };

  // Method runs when request to validate otp is made.
  static validateOTP = async (req, res)=>{
    const { email, otp } = req.body // Extract data from req.

    // If blank credentials are submitted.
    if(!email || !otp){
      return res.status(400).json({
        success:false,
        message:'Missing credentials'
      })
    }
    // Retrieves otp entry of the mail.
    const entry = await authenticationOTP.find({ email }).sort({ createdAt: -1 }).limit(1);

    // If no otp was sent or otp expired.
    if(entry.length == 0){
      return res.status(400).json({
        success:false,
        message:'Invalid credentials'
      })
    }
    // else if provided otp is wrong.
    else if(entry[0].otp != otp){
      return res.status(401).json({
        success:false,
        message:'Invalid OTP'
      })
    }
    return res.status(200).json({
      status:true,
      email,
      message:'OTP Matched'
    })
  }
}

module.exports = OTPhandler // Export class