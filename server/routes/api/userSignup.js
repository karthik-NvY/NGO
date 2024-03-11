/*
TODO:
->Endpoints for user signup
1.First extract the user details.
2.If user already exists in the database then the response is 400
3.Else the OTP will be sent to user's email
4.Signup success when user OTP verification is done.  
*/

const Users = require('../../models/emailsModel');
const authenticationOTP = require('../../models/OTPmodel');
const dotenv = require('dotenv');
const limit = 60; //time limit for valid OTP

dotenv.config();

//function to send OTP during user signup
const sendOTP_userSignup = async (req,res) => {
    //TODO-1
    const {name,email} = req.body;
    
    if(!name || !email){
        res.status(400).json({
            err: "Please provide your name/email."
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
            const OTP = Math.floor(100000+Math.random()*900000);
            const otpCreationTime = new Date();
            
            const existingEmail = await authenticationOTP.findOne({email:email});
            
            if(existingEmail){
                const updateData = await authenticationOTP.findByIdAndUpdate({_id:existingEmail._id},{
                    otp:OTP,
                    createdAt: otpCreationTime
                },{
                    new:true
                });

                await updateData.save();

                /* Send the OTP to user */
            }
            else{

       //----- RECHECK THIS PART OF CREATING AND SAVING NEW INSTANCE----

                // const newOTPData = authenticationOTP({
                //     email: email,
                //     otp:OTP,
                //     createdAt: otpCreationTime
                // });

                //await newOTPData.save();

                /* Send the OTP to user */
            }
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({
            err: "Invalid Details.",
            error
        });
    }
}

//function to handle registration of user
const userSignup = async (req,res) => {
    //TODO-1
    const {name,email,password,otp,submitTime} = req.body;

    if(!otp){
        res.status(400).json({
            err: "Enter your OTP"
        });
    }

    //TODO-4
    try {
        const userExists = await authenticationOTP.findOne({email:email});
        const timeDifference = ((submitTime - userExists.otpCreationTime)/1000);
        if(timeDifference<=limit && (userExists.otp === otp)){

        //----- RECHECK THIS PART AFTER CREATING METHOD generateAuthToken----
            /*
            const newUser = new Users({
                name: name,
                email: email,
                password: password
            });
            
            //saving the newUser credentials in the database
            const userData = await newUser.save();
            
            
            //finding the user with the given email id
            const existingUser = await Users.findOne({email:email});

            //token generation
            const token = await existingUser.generateAuthToken();
            */

            res.status(200).json({
                message:"User registration successfully done",
            //  id: existingUser._id,
                name: name,
                email: email,
                password: password,
            //  userToken: token,
            });
        }
        else{
            res.status(400).json({
                err: "Invalid OTP"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            err:"Internal error",
            error
        });
    }
}

module.exports = {
    sendOTP_userSignup,
    userSignup
}