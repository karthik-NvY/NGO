const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/../server.env'})

exports.connect = () => {
    console.log(__dirname+'/../server.env')
    mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology : true
    }).then(()=>console.log("DB Connected Successfully"))
    .catch((error)=>{
        console.log('ERROR connecting to database') 
        console.log(error)
        process.exit(1)
    })
}

//module.exports = connect;