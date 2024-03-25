const {TaskModel} = require('../models/taskInfoModel');
const {Roles} = require("../models/roleModel");
const {GlobalStatus} = require("../models/globalstatus");
const {AssignedModel} = require("../models/taskInfoModel");
const {VolunteerChoiceModel} = require("../models/taskInfoModel");

const taskAutomation = async (ngo_id) => {

     const Ngo_tasks = await TaskModel.find( {ngo_id : ngo_id} , '_id no_volunteer');
     //const volunteers = await Roles.find({ ngo_id: ngo_id, role: "volunteer"}, 'user_id');
     const users = await GlobalStatus.find({ngo_id: ngo_id},'_id');
     Ngo_tasks.forEach(task => {
          AssignedModel.countDocuments({task_id:task[_id]},(err,count) => {
               if (err) {
               console.error(err);
           } else {
               console.log(`Number of documents with certain value: ${count}`);
               task['no_of_assignments'] = count;
           }
          });
     });

     users.forEach(async user => {
          count = 0;
          const assignments = await AssignedModel.find({user_id: dict[user_id]});
          assignments.forEach(assgn => {
               if(assgn[task_id] in Ngo_tasks){
                    count = count + 1;
               }
          });
          user['no_of_tasks'] = count;
     });
     
     //to do deadline sorting of tasks
     
     //assignment based on particular task requests
     Ngo_tasks.forEach( async task => {
          const usersreq = await VolunteerChoiceModel.find({task_id: task[_id] });
          for(const user in users) {
               if(task[no_of_assignments] != task[no_volunteer]){
                    const add = await AssignedModel.create({user_id: user[_id], task_id: task[_id]});
                    const del = await VolunteerChoiceModel.deleteOne({user_id: user[_id], task_id: task[_id]})
                    user[no_of_tasks] = user[no_of_tasks] + 1;
                    task[no_of_assignments] = task[no_of_assignments] + 1;             
              }
              else{
                 break;
              }
          };
    });
     //assignment based on global status of volunteers
     Ngo_tasks.forEach( async task => {
           users.sort((a,b) => a.no_of_tasks - b.no_of_tasks);
           for(const user in users){
                if(task[no_of_assignments] != task[no_volunteer]){
                  const check = await AssignedModel.find({user_id: user[_id], task_id: task[_id]});
                  if(!check){
                     const add = await AssignedModel.create({user_id: user[_id], task_id: task[_id]});
                     user[no_of_tasks] = user[no_of_tasks] + 1;
                     task[no_of_assignments] = task[no_of_assignments] + 1;                   
                    }   
               }
               else{
                   break; 
               }
           };
     });

} 

module.exports = taskAutomation;