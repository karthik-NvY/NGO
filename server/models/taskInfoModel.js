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
    // number of volunteer required for this task
    no_volunteer: {
        type: Number,
        required: true,
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
    // ngo from which task belongs to
    ngo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NGO', // Reference to the ngos model
        required: true,
    }
});

const volunteerChoiceSchema = new mongoose.Schema({
    // user_id of the volunteer
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
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
    task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    // reference to the array of volunteer assigned for particular task
    user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }],
});

const TaskModel = mongoose.model('Task', taskSchema);
const VolunteerChoiceModel = mongoose.model('Volunteer', volunteerChoiceSchema);
const AssignedModel = mongoose.model('Assignment', assignedSchema);

module.exports = {
    TaskModel,
    VolunteerChoiceModel,
    AssignedModel,
};
