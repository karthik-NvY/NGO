/*
  File contains controller for executive selection
*/
const {waitlist,requestwindow} = require('../models/signUpExecModel'); 
const Roles = require('../models/roleModel'); 
class waitlisthandler{
    static fetchRequests = async(req, res) => {
		const {ngo_id} = req.body;
	      if (!ngo_id){
				return res.status(400).json({
					success: false,
					message: "Missing input data",
				});
			}
		try {
			// Fetch all Task records from the database
			const fetchrequests = await waitlist.find({ngo_id:ngo_id});
	        // if the provided ID is not there in the schema
			if (fetchrequests.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: "No user requested from this ngo"
                });
            }
            // task has been deleted
            return res.status(200).json({
                success: true,
                message: "Requests fetched successfully",
                fetchrequests
            });
		}
		catch (error) {
	        console.error("Error:", error.message);
	        return res.status(500).json({
	            success: false,
	            message: "Internal server error while fetching requests",
	        });
	    }
	}
	static storeRequest = async(req, res) => {
		const {ngo_id} = req.body; // Extract data from req.
		const user_id = req.user_id;

		// If empty values are submitted.
	    if (!user_id || !ngo_id){
            return res.status(400).json({
                success: false,
                message: "Missing input data",
            });
        }
	    try {
			// Check if the request already exists.
			const existingRequest = await waitlist.findOne({ user_id, ngo_id });
	
			if (existingRequest) {
				return res.status(210).json({
					success: false,
					message: "Request already exists",
					existingRequest,
				});
			}
	
			// Adding new request.
			const newRequest = await waitlist.create({ user_id, ngo_id });
	
			return res.status(201).json({
				success: true,
				newRequest,
				message: "Successfully request added",
			});
		} 
	    catch (error) {
	        console.log(error);
	        return res.status(500).json({
	            success: false,
	            message : "Error adding request"
        	})
	    }
	}
	static deleteRequest = async(req, res) => {
		const user_id = req.user_id;
		const {ngo_id} = req.body;
	      if (!user_id){
				return res.status(400).json({
					success: false,
					message: "Missing input data",
				});
			}
		try {
			// Fetch all Task records from the database
			const deletedrequest = await waitlist.findOneAndDelete({user_id:user_id, ngo_id: ngo_id});
	        // if the provided ID is not there in the schema
			if (!deletedrequest) {
                return res.status(404).json({
                    success: false,
                    message: "No Request found with the provided ID"
                });
            }
            // task has been deleted
            return res.status(200).json({
                success: true,
                message: "Request deleted successfully",
                deletedrequest
            });
		}
		catch (error) {
	        console.error("Error:", error.message);
	        return res.status(500).json({
	            success: false,
	            message: "Internal server error while deleting request",
	        });
	    }
	}

	static admindeleteRequest = async(req, res) => {
		const { user_id } = req.body;
		const {ngo_id} = req.body;
	      if (!user_id){
				return res.status(400).json({
					success: false,
					message: "Missing input data",
				});
			}
		try {
			// Fetch all Task records from the database
			const deletedrequest = await waitlist.findOneAndDelete({user_id:user_id, ngo_id: ngo_id});
	        // if the provided ID is not there in the schema
			if (!deletedrequest) {
                return res.status(404).json({
                    success: false,
                    message: "No Request found with the provided ID"
                });
            }
            // task has been deleted
            return res.status(200).json({
                success: true,
                message: "Request deleted successfully",
                deletedrequest
            });
		}
		catch (error) {
	        console.error("Error:", error.message);
	        return res.status(500).json({
	            success: false,
	            message: "Internal server error while deleting request",
	        });
	    }
	}
	static updateRole = async(req, res) => {
		const { ngo_id } = req.body;
		const { user_id } = req.body;
		if (!user_id || !ngo_id){
			return res.status(400).json({
				success: false,
				message: "Missing input data",
			})};
		try {
			// Fetch all Task records from the database
			
			const updatedRole = await Roles.findOneAndUpdate(
                { user_id: user_id, ngo_id: ngo_id  },
                {  $set: { role: "Executive" } },
                { new: true }
            );
            console.log(updatedRole);
	        // if the provided ID is not there in the schema
			if (!updatedRole) {
                return res.status(404).json({
                    success: false,
                    message: "No user found with that id"
                });
            }
            // task has been updated
            return res.status(200).json({
                success: true,
                message: "role updated successfully",
                updatedRole
            });
		}
		catch (error) {
	        console.error("Error:", error.message);
	        return res.status(500).json({
	            success: false,
	            message: "Internal server error while updating Info about roles",
	        });
	    }
	}
}

class requestwindowHandler{
	static fetchReqOpening = async(req, res) => {
		const {ngo_id} = req.body;
	      if (!ngo_id){
				return res.status(400).json({
					success: false,
					message: "Missing input data",
				});
			}
		try {
			// Fetch all Task records from the database
			const fetchrequests = await requestwindow.findOne({ngo_id:ngo_id});
	        // if the provided ID is not there in the schema
			if (fetchrequests) {
                return res.status(200).json({
                    success: true,
                    message: "Requests fetched successfully"
                });
            }
            // task has been deleted
            return res.status(201).json({
                success: true,
                message: "No openings requested from this ngo",
            });
		}
		catch (error) {
	        console.error("Error:", error.message);
	        return res.status(500).json({
	            success: false,
	            message: "Internal server error while fetching openings",
	        });
	    }
	}
	static openRequest = async(req, res) => {
		const {ngo_id} = req.body; // Extract data from req.

		// If empty values are submitted.
	    if (!ngo_id){
            return res.status(400).json({
                success: false,
                message: "Missing input data",
            });
        }
	    try {
	        // Adding new task.
	        const newRequest = await requestwindow.create({
            	ngo_id
        	})
	        return res.status(200).json({	             
		            success: true,
		            newRequest,
		            message:"successfully opened for executive role requests "
	            });
	    } 
	    catch (error) {
	        console.log(error);
	        return res.status(500).json({
	            success: false,
	            message : "Error opening executives role requests"
        	})
	    }
	}
	static closeRequest = async(req, res) => {
		const {ngo_id} = req.body;
	      if (!ngo_id){
				return res.status(400).json({
					success: false,
					message: "Missing input data",
				});
			}
		try {
			// Fetch all Task records from the database
			const deletedrequest = await requestwindow.findOneAndDelete({ ngo_id: ngo_id});
	        // if the provided ID is not there in the schema
			if (!deletedrequest) {
                return res.status(404).json({
                    success: false,
                    message: "No opening for Request found with the provided ID"
                });
            }
            // task has been deleted
            return res.status(200).json({
                success: true,
                message: "Requests accepting closed successfully",
                deletedrequest
            });
		}
		catch (error) {
	        console.error("Error:", error.message);
	        return res.status(500).json({
	            success: false,
	            message: "Internal server error while deleting request",
	        });
	    }
	}
		
}
module.exports = {waitlisthandler, requestwindowHandler};