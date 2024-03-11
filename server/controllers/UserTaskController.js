/*
  File contains controller for handling users availability for tasks.  
*/

//correct details required for userTaskModel and { task_id, user_id} in it.

data = require('../models/UserTaskModel');

class UserTaskhandler{

    //method to fetch the users requested (available) for the given task
    static FetchTaskusers = async(req, res) => {
		try {
			const { task_id } = req.body;
			// Fetch all Tasks of given Ngo from the database
			const users = await data.find( { _id : task_id});
	
			// If no users requested for a task found.......
			if (!users || users.length === 0) {
	            return res.status(404).json({
	                success: false,
	                message: "No users requested for the task"
	            });
	        }

			if (users) {
				// If users requested for a task found, send the data in the response
				res.status(200).json(users);
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
			const { task_id, user_id } = req.body;

			const existingrequest = await data.find( { task_id : task_id, user_id : user_id});
	
			// If user already requested for a task.......
			if (existingrequest) {
	            return res.status(404).json({
	                success: false,
	                message: "user already requested for the task"
	            });
	        }

			// Creates new entry by user for the task .
	        const newrequest = await Users.create({
            	user_id, task_id
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
}

module.exports = NgoTaskhandler