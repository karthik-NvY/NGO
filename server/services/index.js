// Third Party Services goes in here..
const nodemailer = require('nodemailer');

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

    console.log("Email info: ", info); // Logs promise.
    return info; // Returns promise
  } catch (error) {
  	// Error from transporter object.
    console.log(error.message);
  }
};
module.exports = mailSender;