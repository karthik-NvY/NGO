/*
   File contains schemas for tasks, volunteers, and task assignments
*/

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    // title of the task
    title: {
        type: String,
        required: true,
        trim: true,
    },
    // description of the task
    description: {
        type: String,
        required: true,
        trim: true,
    },
    // date of the task
    date: {
        type: Date,
        required: true,
    },
});

const volunteerChoiceSchema = new mongoose.Schema({
    // username of the volunteer
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    // task chosen by the volunteer
    chosenTask: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task', // Reference to the Task model
    },
});


const assignedSchema = new mongoose.Schema({
    // reference to the Task model
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    // reference to the Volunteer model
    volunteer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Volunteer',
        required: true,
    },
});

const TaskModel = mongoose.model('Task', taskSchema);
const VolunteerChoiceModel = mongoose.model('Volunteer', volunteerChoiceSchema);
const AssignedModel = mongoose.model('Assignment', assignedSchema);

module.exports = {
    TaskModel,
    VolunteerChoiceModel,
    AssignedModel,
};
