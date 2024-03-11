/*
  File contains controller for OTP handling.
*/
const Ngos = require('../models/ngoModel'); 

class Ngohandler{
    //Method runs when Info of NGOs is requested.
	static fetchNgoInfo = async(req, res) => {
		try {
			// Fetch all NGO records from the database
			const allNgos = await Ngos.find();
	
			// If no NGOs found.......
			if (!allNgos || allNgos.length === 0) {
	            return res.status(404).json({
	                success: false,
	                message: "No NGOs found"
	            });
	        }

			if (allNgos) {
				// If NGOs found, send the data in the response
				res.status(200).json(allNgos);
			}
		}
		catch (error) {
	        console.error("Error:", error.message);
	        return res.status(500).json({
	            success: false,
	            message: "Internal server error while fetching Info of NGOs",
	        });
	    }
	}
}

module.exports = Ngohandler