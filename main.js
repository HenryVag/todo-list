"use strict";
//Imports
const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const methodOverride = require("method-override");

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

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", router);
app.set("view engine", "ejs");

router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

router.get("/", homeController.homePage);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", function (req, res) {
  usersController.create;
  usersController.redirect;
});

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
