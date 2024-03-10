/*
TODO : Generate authentication token using JsonWebToken(JWT)
*/
const jwt = require('jsonwebtoken');

const generateToken = async (user) => {
    return jwt.sign(user,process.env.JWT_SECRET,{
        expiresIn: "1d",
    });
};

module.exports = generateToken;