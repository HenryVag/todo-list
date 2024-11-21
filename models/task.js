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
    required: true,
  },
  Finished: Boolean,
});

module.exports = mongoose.model("Task", taskSchema);
