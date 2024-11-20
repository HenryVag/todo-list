"use strict";

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false
  },
  description: {
    type: String,
    required: false
  },
deadline: {
  type: Date,
  required: false,
},
  completed: {
    type: Boolean,
    default: false,
  }
  
});

module.exports = mongoose.model("Task", taskSchema);