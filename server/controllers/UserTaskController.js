/*
  File contains controller for handling users availability for tasks.  
*/

//correct details required for userTaskModel and { task_id, user_id} in it.

const {VolunteerChoiceModel , AssignedModel} = require('../models/taskInfoModel');

class UserTaskhandler{

    //method to fetch the users requested (available) for the given task
    static FetchTaskusers = async(req, res) => {
		try {
			const { task_id } = req.body;
			// Fetch all Tasks of given Ngo from the database
			const users = await VolunteerChoiceModel.find( { task_id : task_id});
	
			// If no users requested for a task found.......
			if (!users || users.length === 0) {
	            return res.status(201).json({
	                success: false,
	                message: "No users requested for the task"
	            });
	        }

			if (users) {
				// If users requested for a task found, send the data in the response
				res.status(200).json({
					success: true,
					users,
				}
				);
			}
		}
		catch (error) {
	        console.error("Error:", error.message);
	        return res.status(500).json({
	            success: false,
	            message: "Internal server error while fetching users Task",
	        });
	    }
	}
    
    //method to add new request(user availability) for the task.
	static addTaskusers = async(req, res) => {
		try {
			const { task_id } = req.body;
			const user_id = req.user_id;

			const existingrequest = await VolunteerChoiceModel.find( { task_id : task_id, user_id : user_id});
	
			// If user already requested for a task.......
			if (existingrequest) {
	            return res.status(404).json({
	                success: false,
	                message: "user already requested for the task"
	            });
	        }

			// Creates new entry by user for the task .
	        const newrequest = await VolunteerChoiceModel.create({
            	user_id:user_id, task_id:task_id
        	})
	        return res.status(201).json({	             
		            success: true,
		            newrequest,
		            message:"User availability successfully added"
	            });
		}
		catch (error) {
	        console.error("Error:", error.message);
	        return res.status(500).json({
	            success: false,
	            message: "Internal server error while adding user for task",
	        });
	    }
	}

	static IfUserRequested = async(req, res) => {
		try {
			const { task_id } = req.body;
			const user_id = req.user_id;

			const existingrequest = await VolunteerChoiceModel.find( { task_id : task_id, user_id : user_id});
	
			// If user already requested for a task.......
			if (existingrequest.length) {
	            return res.status(200).json({
	                success: true,
	                requested:true,
	                message: "User requested fetched"
	            });
	        }
	        return res.status(200).json({	             
		            success: true,
		            requested:false,
		            message:"User not requested"
	            });
		}
		catch (error) {
	        console.error("Error:", error.message);
	        return res.status(500).json({
	            success: false,
	            message: "Internal server error while fetching user for task",
	        });
	    }
	}

	static deleteTaskusers = async (req, res) => {
        const { task_id } = req.body;
		const user_id = req.user_id;

        try {
            const deletedTask = await VolunteerChoiceModel.findOneAndDelete({ user_id: user_id, task_id: task_id });

            if (!deletedTask) {
                return res.status(404).json({
                    success: false,
                    message: "No task found with the provided ID"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Task user deleted successfully",
                deletedTask
            });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Internal server error while deleting task user"
            });
        }
    }


	static assignUser = async(req, res) => {
		try {
			const { task_id } = req.body;
			const user_id = req.user_id;

			const existingrequest = await AssignedModel.find( { task_id : task_id, user_id : user_id});
	
			// If user already requested for a task.......
			if (existingrequest) {
	            return res.status(404).json({
	                success: false,
	                message: "user already assigned for the task"
	            });
	        }

			// Creates new entry by user for the task .
	        const newrequest = await AssignedModel.create({
            	user_id:user_id, task_id:task_id
        	})
	        return res.status(201).json({	             
		            success: true,
		            newrequest,
		            message:"User assignment successfully added"
	            });
		}
		catch (error) {
	        console.error("Error:", error.message);
	        return res.status(500).json({
	            success: false,
	            message: "Internal server error while adding user for task",
	        });
	    }
	}
}

module.exports = UserTaskhandler