/*
TODO:
->Endpoints for user signup
1.First extract the user details.
2.If user already exists in the database then the response is 400
3.Else the OTP will be sent to user's email
4.Signup success when user OTP verification is done.  
*/

const Users = require('../models/userSchema');
const authenticationOTP = require('../../models/authenticationOTP');
const transporter = require('../../services/emailTransporter');
const dotenv = require('dotenv');
const limit = 60; //time limit for valid OTP

dotenv.config();

//function to send OTP during user signup
const sendOTP_userSignup = async (req,res) => {
    //TODO-1
    const {firstName,lastName,email} = req.body;

    if(!firstName || !email){
        res.status(400).json({
            err: "Please provide your firstName/email."
        });
    }

    try {
        const userExists = await Users.findOne({email:email});

        //TODO-2
        if(userExists){
            res.status(400).json({
                err: "User already exists in our database"
            });
        }
        else{
            //TODO-3
            const username = firstName + " " + lastName;
            const OTP = Math.floor(100000+Math.random()*900000);
            const otpCreationTime = new Date();
            
            const existingEmail = await authenticationOTP.findOne({email:email});
            
            if(existingEmail){
                const updateData = await authenticationOTP.findByIdAndUpdate({_id:existingEmail._id},{
                    otp:OTP,
                    otpCreationTime: otpCreationTime
                },{
                    new:true
                });

                await updateData.save();

                const mailOptions = {
                    from:process.env.EMAIL,
                    to:email,
                    subject:"Email Verification OTP",
                    text:`Dear ${username},

                            Thank you for registering with our platform! To complete the email verification process, please use the following One-Time Password (OTP):
                            
                            Your OTP: ${OTP}
                            
                            Please enter this OTP in the verification page to verify your account. If you did not request this OTP, please ignore this email.
                            
                            Thank you for choosing our service!
                    
                    Best regards,
                    NGO SE`
                }

                transporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        res.status(400).json({
                            err:"OTP not sent!"
                        });
                    }
                    else{
                        // console.log("Email sent",info.response);
                        res.status(200).json({
                            message:"OTP sent"
                        });
                    }
                });
            }
            else{
                const newOTPData = new authenticationOTP({
                    email: email,
                    otp:OTP,
                    otpCreationTime: otpCreationTime
                });

                await newOTPData.save();

                const mailOptions = {
                    from:process.env.EMAIL,
                    to:email,
                    subject:"Email Verification OTP",
                    text: `Dear ${username},

                                Thank you for registering with our platform! To complete the email verification process, please use the following One-Time Password (OTP):
                                
                                Your OTP: ${OTP}
                                
                                Please enter this OTP in the verification page to verify your account. If you did not request this OTP, please ignore this email.
                                
                                Thank you for choosing our service!
                        
                        Best regards,
                        NGO SE`
                }

                transporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        res.status(400).json({
                            err:"OTP not sent!"
                        });
                    }
                    else{
                        // console.log("Email sent",info.response);
                        res.status(200).json({
                            message:"OTP sent"
                        });
                    }
                });
            }
        }

    } catch (error) {
        res.status(400).json({
            err: "Invalid Details.",
            error
        });
    }
}

//function to handle registration of user
const userSignup = async (req,res) => {
    //TODO-1
    const {firstName,lastName,email,otp,submitTime} = req.body;

    if(!otp || !email){
        res.status(400).json({
            error: "Enter your OTP"
        });
    }

    //TODO-4
    try {
        const userExists = await authenticationOTP.findOne({email:email});
        const timeDifference = ((submitTime - userExists.otpCreationTime)/1000);
        if(timeDifference<=limit && (userExists.otp === otp)){
            const newUser = new Users({
                firstName: firstName,
                lastName: lastName,
                email: email
            });
            
            //saving the newUser credentials in the database
            const userData = await newUser.save();
            
            //finding the user with the given email id
            const existingUser = await Users.findOne({email:email});

            //token generation
            const token = await existingUser.generateAuthToken();

            res.status(200).json({
                message:"User registration successfully done",
                id: existingUser._id,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: email,
                userToken: token,
            });
        }
        else{
            res.status(400).json({
                err: "Invalid OTP"
            });
        }
    } catch (error) {
        res.status(400).json({
            err:"Invalid OTP",
            error
        });
    }
}

module.exports = {
    sendOTP_userSignup,
    userSignup
}