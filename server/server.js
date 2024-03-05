// All requirements
const express = require('express');
const otpRoute = require('./routes/otpRoute');
const userRoute = require('./routes/userRoute');
const apiRoutes = require('./routes/apiRoutes');
const cors = require('cors');
const dbConnection = require('./configs/mongo');
require('dotenv').config();

const app = express();

app.use(cors()); // For cors
app.use(express.json()); // For json parsing
app.use(express.urlencoded({ extended:false }));
app.use(express.static("./static"));

dbConnection(); // Connection to Database.
// listen on port.
app.listen(process.env.PORT, ()=>{
	console.log(`Server listening on ${process.env.PORT}....`)
})

// Route deals with otps.
app.use('/otp', otpRoute);

// Route deals with user authentication.
app.use('/user', userRoute);

app.use('/api', apiRoutes);