/*
  File contains controller for Task info.
*/
const mongoose = require('mongoose');
const {TaskModel} = require('../models/taskInfoModel'); 
class TaskInfohandler{
    //Method runs when Info of Tasks is requested.
	static fetchTaskInfo = async(req, res) => {
		try {
			// Fetch all Task records from the database
			const {id} = req.body;
			const taskinfo = await TaskModel.findOne({_id:id});
	
			// If no Task Info is found.......
			if (!taskinfo || taskinfo.length === 0) {
	            return res.status(404).json({
	                success: false,
	                message: "No Task Information was found"
	            });
	        }

			if (taskinfo) {
				// If Task Infos found, send the data in the response
				res.status(200).json(taskinfo);
			}
		}
		catch (error) {
	        console.error("Error:", error.message);
	        return res.status(500).json({
	            success: false,
	            message: "Internal server error while fetching Info of Tasks info",
	        });
	    }
	}

	static storeTaskinfo = async(req, res) => {
		const {ngo_id,title,description,date,no_volunteer} = req.body; // Extract data from req.

		// If empty values are submitted.
	    if (!ngo_id||!title||!description||!date||!no_volunteer){
            return res.status(400).json({
                success: false,
                message: "Missing input data",
            });
        }
	    try {
	        // Adding new task.
	        const newTask = await TaskModel.create({
            	ngo_id,title,description,date,no_volunteer
        	})
	        return res.status(201).json({	             
		            success: true,
		            newTask,
		            message:"successfully task added"
	            });
	    } 
	    catch (error) {
	        console.log(error);
	        return res.status(500).json({
	            success: false,
	            message : "Error adding Task info"
        	})
	    }
	}}
module.exports = TaskInfohandler