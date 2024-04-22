const GlobalStatus = require("../models/globalAvailModel");

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
			if (Alreadyavailable.length != 0) {
				return res.status(404).json({
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
                error: error.message
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
			if (!available||available.length == 0) {
				return res.status(404).json({
					success: false,
					message: "User already marked as not available"});
			}

            
            //deletes user entry, representing globally available
            const deleteUserStatus = await GlobalStatus.deleteOne({user_id:user_id, ngo_id:ngo_id});

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
	static GlobalFetch = async(req, res) => {
        try {
            const { ngo_id } = req.body;
            // Fetch all Tasks of given Ngo from the database
            if(!ngo_id){
                return res.status(400).json({
                  success:false,
                  message:'Missing NGO ID'
                })
              }
            const Globals = await GlobalStatus.find({ ngo_id: ngo_id }).populate('user_id', 'name');                            
        
            if (!Globals || Globals.length === 0) {
                return res.status(200).json({
                    success: false,
                    message: "No Global Status found in given NGO"
                });
            }
            const globalStatusData = Globals.map(globalStatus => ({
                _id: globalStatus.user_id._id,
                name: globalStatus.user_id.name
            }));
            return res.status(200).json({
                success: true,
                data: globalStatusData,
                ngo_id:ngo_id,
                message: "Users with global status successfully fetched"
            });
            
        }
        catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Internal server error while fetching Global status in NGO",
            });
        }
    }
}

module.exports = GlobalStatushandler