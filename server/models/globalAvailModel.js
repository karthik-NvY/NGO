const mongoose = require("mongoose");

const Users = require('../models/userModel'); // User database model.

const globalAvailSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Users, // Reference to the user model
    required: true,
  },
  ngo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NGO", // Reference to the ngos model
    required: true,
  },
});

module.exports = mongoose.model('GlobalStatus', globalAvailSchema);
