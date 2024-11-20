"use strict";

//Imports
const express = require("express");

//Controllers
const usersController = require("../controllers/usersController");
const homeController = require("../controllers/homeController");
const tasksController = require("../controllers/tasksController");

//Config
const router = express.Router();

//Check if user has logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/pleaselogin");
  }
}

//Task routes

router.get("/tasks", tasksController.index, tasksController.indexView);
router.get("/tasks/new", tasksController.new);
router.post(
  "/tasks/create",
  tasksController.create,
  tasksController.redirectView
);
router.get("/tasks/:id/edit", tasksController.edit);
router.put(
  "/tasks/:id/update",
  tasksController.update,
  tasksController.redirectView
);
router.delete(
  "/tasks/:id/delete",
  tasksController.delete,
  tasksController.redirectView
);
router.get("/tasks/:id", tasksController.show, tasksController.showView);

//Home route

router.get("/", homeController.homePage);

//User routes

router.get(
  "/users",
  isLoggedIn,
  usersController.index,
  usersController.indexView
);
router.get("/users/new", usersController.new);
router.post(
  "/users/create",
  usersController.create,
  usersController.redirectView
);

router.post(
  "/users/login",
  usersController.authenticate,
  usersController.redirectView
);

router.get(
  "/users/logout",
  usersController.logout,
  usersController.redirectView
);

//Not logged in route
router.get("/pleaselogin", (req, res) => {
  res.render("pleaselogin");
});

module.exports = router;
