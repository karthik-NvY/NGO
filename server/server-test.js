// All requirements
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const otpRoute = require('./routes/otpRoute');
const userRoute = require('./routes/userRoute');
const apiRoutes = require('./routes/apiRoutes');
const taskuserRoutes = require('./routes/taskuserRoute');
const taskRoutes = require('./routes/taskRoutes');
const env = require('dotenv').config({ path: '../server.env' });
const app = express();

app.use(cors()); // For cors
app.use(express.json()); // For json parsing
app.use(express.urlencoded({ extended:false }));
app.use(express.static("./static"));
app.use(cookieParser());

// Route deals with otps.
app.use('/otp', otpRoute);

// Route deals with user authentication.
app.use('/user', userRoute);


app.use('/api', apiRoutes);

app.use('/taskuser', taskuserRoutes);
app.use('/task',taskRoutes);

// Route deals with various api services.
app.use('/api', apiRoutes);

module.exports = app;