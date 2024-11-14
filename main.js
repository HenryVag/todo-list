"use strict";
//Imports
const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

//Controllers
const usersController = require("./controllers/usersController");
const homeController = require("./controllers/homeController");

//Configuration
const app = express();
const router = express.Router();

//Constants
const port = 3000;

mongoose
  .connect("mongodb://localhost:27017/todo_list")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

app.use("/", router);
app.set("view engine", "ejs");

router.get("/", homeController.homePage);

router.get("/users", usersController.index, usersController.indexView);

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
