/*
  File contains controller for ngo handling.
*/

const {TaskModel} = require('../models/taskInfoModel');
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

				res.status(200).json({
					success: true,
					allNgos,
					message: "NGOs found"});
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
			if(!ngo_id){
				return res.status(400).json({
				  success:false,
				  message:'Missing NGO ID'
				})
			  }
			  const Ngo_tasks = await TaskModel.find( {ngo_id : ngo_id} , '_id title');
			// If no tasks found.......
			if (!Ngo_tasks || Ngo_tasks.length === 0) {
	            return res.status(200).json({
	                success: false,
	                message: "No Tasks found"
	            });
	        }

			if (Ngo_tasks) {
				// If Tasks for a Ngo found, send the data in the response
				return res.status(200).json({
					success: true,
					Ngo_tasks,
					message:"Tasks found"
				});
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
