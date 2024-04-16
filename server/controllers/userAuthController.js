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
const Roles = require('../models/roleModel'); // User roles database model.
const waitlist= require('../models/signUpExecModel')
const VolunteerChoiceModel= require('../models/taskInfoModel')
const AssignedModel= require('../models/taskInfoModel')

const generateToken = require('../utils/generateToken');

// Class contains methods for authentication.
class userAuth{

	// Method that runs when signup is requested.
	static userSignup = async(req, res) => {
		const {name,email,password,phone} = req.body; // Extract data from req.

		// If empty values are submitted.
	    if (!name || !email || !password){
            return res.status(400).json({
                success: false,
                error: "Missing credentials",
            });
        }
	    try {
	    	const existingEmail = await Users.findOne({email_id:email})

	    	// If user already exists, no signup required.
	        if(existingEmail){
	            return res.status(409).json({
	                success: false,
	                message: "User already exists"
	            })
	        }

	        const packet = {
	        	name:name,
	        	email_id:email,
	        	password:password,
	        	phn_number:phone
	        }
	        // Creates new user.
	        const newUser = await Users.create(packet);
	        
	        return res.status(201).json({	             
	            success: true,
	            newUser,
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

	        const user = await Users.findOne({ email_id: email });

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
	        const token_payload = {
	        	name:user.name, 
	        	email:user.email_id,
	        	id:user._id
	        };
			const token = await generateToken(token_payload);
	        return res.status(200).cookie("token", token).json({
	            success: true,
	            email: user.email_id,
				token: token,
	            message: 'User login successful'
	        });
	    } 
	    catch (error) {
	        console.error("Error:", error);
	        return res.status(500).json({
	            success: false,
	            message: "Internal server error"
	        });
	    }
	}

	//Method runs when user profile info is requested.
	static fetchUserProfile = async(req, res) => {
		try {
			const email = req.email;
			const userData = await Users.findOne({ email_id:email });

	        // Checks if user is not present in the database.
	        if (!userData) {
	            return res.status(404).json({
	                success: false,
	                message: "User not found"
	            });
	        }

			const userRoles = await Roles.find({ user_id: userData.user_id }).populate('ngo_id');
			/* 
			Records which were fetched from Roles database have 'ngo_id' which is a referenced objectId of NGO database.
			now we need to use this to fetch the record corresponding to that Id from the NGO database to extract Ngo_name from it for each record.
			.populate() method makes it easy for us. it replaces the 'ngo_id' field in the records fetched from Roles database with the
			corresponding NGO record.

			Now we can extract the info we need from userRoles to make new set of records (properly formatted) 'userNGOs' and directly send it to frontend.
			*/

			// Prepare user's NGO info
			// creates new array of records with proper structure
			const userNGOs = userRoles.map(userRole => ({
				ngo_id: userRole.ngo_id.ngo_id,
				ngo_name: userRole.ngo_id.name,
				role: userRole.role
			}));

			// returns data with user_name , email and NGOs data.
			const data = { name:userData.name, email:userData.email_id, ngos: userNGOs }
			res.status(200).json({
				success:true,
				data:data,
				message:"User profile found"
			});
		}
		catch (error) {
	        console.error("Error:", error.message);
	        return res.status(500).json({
	            success: false,
	            message: "Internal server error while fetching user profile data",
	        });
	    }
	}

	static logOut = async(req, res)=>{
		return res.status(200).json({
			success:true,
			message:"Logout successful"
		})
	}



	// Method that runs when signup is requested.
	static updateUserData = async(req, res) => {
		try{
			const {newData} = req.body; // Extract data from req.
	        // new data is a set with attribute mentioned as per model
	        const id = req.user_id
	        if (!newData){
	        	return res.status(404).json({
					success: false,
					error:"No data being updated"
				});
	        }
			const updatedUser = await Users.findOneAndUpdate(
				{ _id: id },
				{ $set: newData },
				{ new: true }
			);
			// user has been updated
			return res.status(200).json({
				success: true,
				message: "User updated successfully",
				updatedUser
			});
		}
 		catch (error) {
			return res.status(500).json({
				success: false,
				message: "Internal server error while updating user profile data",
			});
		}
	};

	static deleteUserData = async(req, res) => {
		try{
			const user_id = req.user_id;
			console.log(user_id)  
			await Promise.all([
				Roles.deleteMany({ user_id:user_id }),
				waitlist.deleteMany({user_id: user_id }),
				VolunteerChoiceModel.deleteMany({ user_id: user_id }),
				AssignedModel.deleteMany({ user_id :user_id }),
			]);

			const deletedUser = await Users.findOneAndDelete({ _id: id });
			// if the provided ID is not there in the schema
			// user has been deleted
			return res.status(200).json({
				success: true,
				message: "User deleted successfully",
			});
		}
		catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error while updating user profile data",
		});
		}
	}

}
module.exports = userAuth // Export classmodule.exports = userAuth // Export class