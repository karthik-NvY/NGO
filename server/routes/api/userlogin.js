/*
TODO:
->Endpoints for user login
1.First extract the user details.
2.If user exists in the database then match his hashed password
3.If the password in incorrect error 401
*/

const Users = require('../../models/emailsModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

//TODO-1
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Please provide both email and password"
            });
        }

        const user = await Users.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        //TODO-2
        const passwordMatch = await bcrypt.compare(password, user.password);
        //TODO-3
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }

        // const token = jwt.sign({ email: user.email }, process.env.JWT_KEY, { expiresIn: '30m' });

        // res.cookie("token", token, { httpOnly: true });

        return res.status(200).json({
            success: true,
            // token,
            email: user.email,
            message: 'User login successful'
        });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    userLogin
};
