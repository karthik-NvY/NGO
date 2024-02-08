/*
TODO:
1.defining email schema using zod for email validation
2.defining schema for Users using mongoose
3.function for jwt token generation
*/

const mongoose = require('mongoose');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

//TODO-1
//email schema using zod
const emailSchema = zod.string().email();

//TODO-2
//defining user schema
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        //validating email using zod before saving to database
        validate: {
            validator: (value) => {
                try {
                    emailSchema.parse(value);
                    return true;
                } catch (error) {
                    throw new Error("Not a valid email.");
                }
            }
        },
    },
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
});

//TODO-3
//token generation
userSchema.methods.generateAuthToken = async function(req,res){
    try{
        let newToken = jwt.sign({email:this.email},process.env.JWT_SECRET,{
            expiresIn:"1d"
        });

        this.tokens = this.tokens.concat({token:newToken});
        await this.save();

        return newToken;
    }
    catch(error){
        res.status(400).json({
            error
        })
    }
}

//creating model
const Users = new mongoose.model("users",userSchema);

module.exports = Users;