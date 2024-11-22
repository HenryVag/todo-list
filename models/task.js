"use strict";

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true
  },
  deadline: {
  type: Date,
  required: true,
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
