const nodemailer = require('nodemailer');

//email configuration
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
});

module.exports = {transporter}