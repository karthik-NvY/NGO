/*
  File contains controller for ngo handling.
*/
tasks = require('../models/TasksModel');

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

	//Method runs when tasks of a NGO is requested.
	static FetchNgoTasks = async(req, res) => {
		try {
			const { ngo_id } = req.body;
			// Fetch all Tasks of given Ngo from the database
			const Ngo_tasks = await tasks.find( { ngo_id : ngo_id} , '_id task_name');
	
			// If no tasks found.......
			if (!Ngo_tasks || Ngo_tasks.length === 0) {
	            return res.status(200).json({
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

module.exports = Ngohandler
