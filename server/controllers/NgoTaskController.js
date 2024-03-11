/*
  File contains controller for ngo tasks handling.  
*/

//correct details required for TasksModel and {ngo_id, task_id, task_name} in it.

tasks = require('../models/TasksModel');

class NgoTaskhandler{
    //Method runs when tasks of a NGO is requested.
	static FetchNgoTasks = async(req, res) => {
		try {
			const { ngo_id } = req.body;
			// Fetch all Tasks of given Ngo from the database
			const Ngo_tasks = await tasks.find( { ngo_id : ngo_id} , '_id task_name');
	
			// If no tasks found.......
			if (!Ngo_tasks || Ngo_tasks.length === 0) {
	            return res.status(404).json({
	                success: false,
	                message: "No Tasks found"
	            });
	        }

			if (Ngo_tasks) {
				// If Tasks for a Ngo found, send the data in the response
				res.status(200).json(Ngo_tasks);
			}
		}
		catch (error) {
	        console.error("Error:", error.message);
	        return res.status(500).json({
	            success: false,
	            message: "Internal server error while fetching Tasks of NGOs",
	        });
	    }
	}
}

module.exports = NgoTaskhandler