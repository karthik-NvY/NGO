/*
TODO : Generate authentication token using JsonWebToken(JWT)
*/
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: "1d",
    });
};

module.exports = generateToken;