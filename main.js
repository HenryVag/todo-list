"use strict";
//Imports
const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const passport = require("passport");
const layouts = require("express-ejs-layouts");
const User = require("./models/user");

//Constants
const port = 3000;

//Configuration
const app = express();
const routes = require("./routes/routes");

mongoose
  .connect("mongodb://localhost:27017/todo_list")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

app.use(layouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", routes);
app.set("view engine", "ejs");

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
