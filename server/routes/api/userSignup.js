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
// const transporter = require('../../services/emailTransporter');
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

                /* Send the OTP to user */
            }
            else{
                const newOTPData = new authenticationOTP({
                    email: email,
                    otp:OTP,
                    otpCreationTime: otpCreationTime
                });

                await newOTPData.save();

                /* Send the OTP to user */
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