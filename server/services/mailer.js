/*
  File sends OTP mail using nodemailer.
*/
const nodemailer = require('nodemailer'); // used to send mail.
const dotenv = require('dotenv'); // load .env


// Function sends mail given email, otp.
async function sendVerificationEmail(email, otp) {
  try {
    // call to mail transporter.
    await mailSender(
      email, // email.
      "Verification Email", // title
      // html body
      `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`
    );
    console.log("Email sent successfully");
    return 'Email sent successfully';
  } 
  catch (error) {
    console.log("Error occurred while sending email: ", error.message);
    throw error;
  }
}

// Helper function sends mail. uses nodemailer transporter.
const mailSender = async (email, title, body) => {
  try {
    // Created a Transporter object to send emails
    let transporter = nodemailer.createTransport({
      service:'gmail',
      auth: {
        user: process.env.MAIL_USER,
      	pass: process.env.MAIL_PASS
      }
    });

    // Sends emails to users.
    let info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: title,
      html: body,
    });
    return info; // Returns promise
  } catch (error) {
  	// Error from transporter object.
    throw error;
  }
};
module.exports = sendVerificationEmail; // export mailing function.