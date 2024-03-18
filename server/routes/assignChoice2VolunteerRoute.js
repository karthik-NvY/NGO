const express = require('express');
const router = express.Router();
const { AssignedModel, VolunteerChoiceModel } = require('./taskInfoModel');

// Endpoint to assign volunteers to tasks based on their choices
router.post('/assign/:choiceId', async (req, res) => {
    try {
        const choiceId = req.params.choiceId;

        // Find the volunteer choice by its ID
        const volunteerChoice = await VolunteerChoiceModel.findById(choiceId);

        if (!volunteerChoice) {
            return res.status(404).json({ message: "Volunteer choice not found" });
        }

        // Create an assignment entry for the chosen task
        const assignment = new AssignedModel({
            task_id: volunteerChoice.chosenTask, // Assign to the chosen task
            user_id: volunteerChoice.user_id // Assign the volunteer to the task
        });

        // Save the assignment to the database
        await assignment.save();

        // Optionally, you can remove the volunteer choice after assigning
        // await volunteerChoice.remove();

        res.status(201).json({ message: "Volunteer successfully assigned to task" });
    } catch (error) {
        console.error("Error assigning volunteer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
