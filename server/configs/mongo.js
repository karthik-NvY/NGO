/*
    File contains configuration for mongoose.
*/
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/../server.env'})

// Function for connection to database.
const connect = async ()=>{
    try{
        console.log("Attempting to connect to Database...")
        const dbconnection = await mongoose.connect(process.env.DB_URL);
        console.log("DB Connected Successfully"); // Connection successful
    }
    catch(error){
        console.log('ERROR connecting to database'); // Error in connecting.
        console.log(error);
        process.exit(1);
    }
}

module.exports = connect; // Export connect.