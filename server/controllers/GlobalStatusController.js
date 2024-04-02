const {GlobalStatus} = require("../models/globalAvailModel");

class GlobalStatushandler{

    static GlobalAvailable = async(req, res) => {
		try {
			
			const {user_id, ngo_id} = req.body;
			//returns error if user id not given
			if(!user_id ){
                return res.status(400).json({
                    success:false,
                    message:'Missing USER ID'
                  })
            }
			if(!ngo_id ){
                return res.status(400).json({
                    success:false,
                    message:'Missing NGO Id'
                  })
            }

			const Alreadyavailable = await GlobalStatus.find({user_id: user_id, ngo_id: ngo_id});
            //returns if user status already marked as available
			if (Alreadyavailable) {
				res.status(404).json({
					success: false,
					message: "User already marked as available "});
			}
            
            //creates or add user entry, representing globally available
            const addUserStatus = await GlobalStatus.create({user_id:user_id, ngo_id:ngo_id});

            
            return res.status(200).json({	             
                success: true,
                addUserStatus,
                message:"User Global status marked to available"
            });
		}
		catch (error) {
	        console.error("Error:", error.message);
	        return res.status(500).json({
	            success: false,
	            message: "Internal server error while updating status",
	        });
	    }
	}

    static GlobalNotAvailable = async(req, res) => {
		try {
			
			const {user_id, ngo_id} = req.body;
            
			//returns error if user id not given
			
			if(!user_id){
                return res.status(400).json({
                    success:false,
                    message:'Missing USER ID'
                  })
            }
			if(!ngo_id){
                return res.status(400).json({
                    success:false,
                    message:'Missing NGO id'
                  })
            }
			const available = await GlobalStatus.find({user_id: user_id, ngo_id: ngo_id});

            //returns if user status already marked as not available i.e there is no entry
			if (!available) {
				res.status(404).json({
					success: false,
					message: "User already marked as not available"});
			}

            
            //deletes user entry, representing globally available
            const deleteUserStatus = await GlobalStatus.delete({user_id:user_id, ngo_id:ngo_id});

            return res.status(200).json({	             
                success: true,
                deleteUserStatus,
                message:"User Global status marked to not available"
            });
		}
		catch (error) {
	        console.error("Error:", error.message);
	        return res.status(500).json({
	            success: false,
	            message: "Internal server error while updating status",
	        });
	    }
	}
}

module.exports = GlobalStatushandler