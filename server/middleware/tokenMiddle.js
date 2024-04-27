/*
	This file contains the middleware to authenticate users with tokens.
*/
const jwt = require('jsonwebtoken'); // JWT tokens.

const tokenAuth = async (req, res, next)=>{
	//console.log(req.headers.authorization)
	const bearer = req.headers.authorization.split(' ');
    const token = bearer[1];
    
	// If no token was provided.
	if (!token){
		return res.status(401).json({
			success:false,
			error:"Autherization failed due to absence of token"
		})
	}
  	try{
		const user = jwt.verify(token, process.env.JWT_SECRET); // Validate token.
		req.user_id = user.id;
		req.email = user.email;
		req.name = user.name;
		next(); // Call to next middleware.
	}
	catch(err){
		// Authentication failed. Wrong token.
		console.log('ERROR in authentication with token')
		console.log(err)
		res.clearCookie('token')
		res.redirect(401, '/')
		// return res.status(401).json({
		// 	success:true,
		// 	message:'Invalid token'
		// })
	}
};

module.exports = tokenAuth;