const taskAutomation = require("../utils/taskAutomation");

static taskAutomationController = async(req, res) => {
	const { ngoID } = req.body
	try{
		await taskAutomation(ngoID)
	}
	catch(error){
		console.log(error);
		return res.status(400).json{
			success:false,
			message:"Failed to run automation"
		}
	}
};

module.exports = taskAutomationController;