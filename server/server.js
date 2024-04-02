// All requirements
const express = require("express");
const otpRoute = require("./routes/otpRoute");
const userRoute = require("./routes/userRoute");
const apiRoutes = require("./routes/apiRoutes");
const taskuserRoute = require("./routes/taskuserRoute");

const taskRoutes = require("./routes/taskRoutes");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const DbConnect = require("./configs/mongo");
require("dotenv").config();

const app = express();

app.use(express.json()); // For json parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./static"));
app.use(cookieParser());

// For cors
const allowedOrigins = [`${process.env.CLIENT_URL}`];
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// app.use(cors({
//   origin: '*',
//   credentials: true,
// }));

async function main() {
  Dbconnection = await DbConnect(); // Connection to Database.

  // listen on port.
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on ${process.env.PORT}....`);
  });

  // Route deals with otps.
  app.use("/otp", otpRoute);

  // Route deals with user authentication.
  app.use("/user", userRoute);

  app.use("/taskuser", taskuserRoute);

  app.use("/task", taskRoutes);

  //app.use('/Request',ExecRoutes);

  // Route deals with various api services.
  app.use("/api", apiRoutes);

  // Route used for simple testing in postman.
  app.get("/testpoint", async (req, res) => {
    const Users = require("./models/userModel");
    try {
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
      const data = await Users.findOne({
        email_id: "2021csb1081@iitrpr.ac.in",
      });
      await data.deleteOne();
      return res.status(200).json({
        success: true,
        message: "Done",
        data,
      });
    } catch (err) {
      console.log("error in op");
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "error occured",
      });
    }
  });
}

main();