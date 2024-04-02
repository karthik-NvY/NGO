const taskAutomation = require("../utils/taskAutomation");

class automation{
static taskAutomationController = async(req, res) => {
	const { ngoID } = req.body
	try{
		await taskAutomation(ngoID)
	}
	catch(error){
		console.log(error);
		return res.status(500).json({
			success:false,
			message:"Failed to run automation"
		})
	}
	
}
}

module.exports = automation.taskAutomationController;