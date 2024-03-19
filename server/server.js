// All requirements
const express = require('express');
const otpRoute = require('./routes/otpRoute');
const userRoute = require('./routes/userRoute');
const apiRoutes = require('./routes/apiRoutes');
const taskuserRoutes = require('./routes/taskuserRoute');

const taskRoutes = require('./routes/taskRoutes');
const cookieParser = require('cookie-parser');

const cors = require('cors');
const DbConnect = require('./configs/mongo');
require('dotenv').config();

const app = express();

app.use(cors()); // For cors
app.use(express.json()); // For json parsing
app.use(express.urlencoded({ extended:false }));
app.use(express.static("./static"));
app.use(cookieParser());

async function main(){
  Dbconnection = await DbConnect(); // Connection to Database.
  
  // listen on port.
  app.listen(process.env.PORT, ()=>{
    console.log(`Server listening on ${process.env.PORT}....`)
  })

  // Route deals with otps.
  app.use('/otp', otpRoute);

  // Route deals with user authentication.
  app.use('/user', userRoute);

app.use('/taskuser', taskuserRoutes);
  app.use('/task',taskRoutes);

  // Route deals with various api services.
  app.use('/api', apiRoutes);

  // Route used for simple testing in postman.
  app.get('/testpoint', async (req,res)=>{
    try{
      // const usersToReplace = await Users.find().sort({ _id: -1 }).limit(5);
      // console.log(usersToReplace);
      
      // await Promise.all(usersToReplace.map(async (user) => {
      //   const salt = await bcrypt.genSalt(10);
      //   newPassword = await bcrypt.hash(user.name,salt);
      //   console.log(newPassword);
      //   user.password = newPassword;
      //   await user.save();
      // }));
      // return res.status(200).json({
      //   success:true,
      //   message:"Done"
      // });
    }
    catch(err)
    {
      // console.log("error in op");
      // console.log(err);
      // return res.status(500).json({
      //   success:false,
      //   message:"error occured"
      // })
    }
  });

}

main();
