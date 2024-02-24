/*
	File contains controller for user authentication.

TODO
-----
0: Migrating database in 
	userSignup method
	| -- const existingEmail = await Users.findOne({email})
	| -- const newUser = await Users.create({
	userlogin method
	| -- const user = await Users.findOne({ email: email });
*/
const Users = require('../models/userModel'); // User database model.
const generateToken = require('../utils/generateToken');

// Class contains methods for authentication.
class userAuth{

	// Method that runs when signup is requested.
	static userSignup = async(req, res) => {
		const {name,email,password} = req.body; // Extract data from req.

		// If empty values are submitted.
	    if (!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Missing credentials",
            });
        }
	    try {
	    	const existingEmail = await Users.findOne({email})

	    	// If user already exists, no signup required.
	        if(existingEmail){
	            return res.status(409).json({
	                success: false,
	                message: "User already exists"
	            })
	        }

	        // Creates new user.
	        const newUser = await Users.create({
            	name, email, password
        	})
	        return res.status(201).json({	             
		            success: true,
		            newUser,
					userToken: generateToken(newUser._id),
		            message:"User registration successfully done"
	            });
	    } 
	    catch (error) {
	        console.log(error);
	        return res.status(500).json({
	            success: false,
	            message : "User registration failed"
        	})
	    }
	}

	// Method runs when login is requested.
	static userLogin = async (req, res) => {
	    try {
	        const { email, password } = req.body; // Extract data.

	        // Check if email or password are missing.
	        if (!email || !password) {
	            return res.status(400).json({
	                error: "Please provide both email and password"
	            });
	        }

	        const user = await Users.findOne({ email: email });

	        // Checks if user is not present in the database.
	        if (!user) {
	            return res.status(400).json({
	                success: false,
	                message: "User not found"
	            });
	        }

	        
			//Matching the user entered password with his original password stored in the database
	        const passwordMatch = await user.matchPassword(password);

	        // Checks if password is correct
	        if (!passwordMatch) {
	            return res.status(401).json({
	                success: false,
	                message: "Incorrect password"
	            });
	        }
	        return res.status(200).json({
	            success: true,
	            email: user.email,
				userToken: generateToken(user._id),
	            message: 'User login successful'
	        });
	    } 
	    catch (error) {
	        console.error("Error:", error.message);
	        return res.status(500).json({
	            success: false,
	            message: "Internal server error"
	        });
	    }
	};
}

module.exports = userAuth // Export class