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
	}
	static deleteTaskInfo = async(req, res) => {
		try {
			// Fetch all Task records from the database
			const {id} = req.body;
			const deletedTask = await TaskModel.findOneAndDelete({_id:id});
	        // if the provided ID is not there in the schema
			if (!deletedTask) {
                return res.status(404).json({
                    success: false,
                    message: "No task found with the provided ID"
                });
            }
            // task has been deleted
            return res.status(200).json({
                success: true,
                message: "Task deleted successfully",
                deletedTask
            });
		}
		catch (error) {
	        console.error("Error:", error.message);
	        return res.status(500).json({
	            success: false,
	            message: "Internal server error while deleting Info of Tasks",
	        });
	    }
	}
	static updateTaskInfo = async(req, res) => {
		try {
			// Fetch all Task records from the database
			const {id, newData} = req.body;
            // newDate is an object with elements as updated fields from front-end
			const updatedTask = await TaskModel.findOneAndUpdate(
                { _id: id },
                { $set: newData },
                { new: true }
            );
	        // if the provided ID is not there in the schema
			if (!updatedTask) {
                return res.status(404).json({
                    success: false,
                    message: "No task found with the provided ID"
                });
            }
            // task has been updated
            return res.status(200).json({
                success: true,
                message: "Task updated successfully",
                updatedTask
            });
		}
		catch (error) {
	        console.error("Error:", error.message);
	        return res.status(500).json({
	            success: false,
	            message: "Internal server error while updating Info of Tasks",
	        });
	    }
	}
}
module.exports = TaskInfohandler