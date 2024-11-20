"use strict";
//Imports
const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const connectFlash = require("connect-flash");
const methodOverride = require("method-override");
const passport = require("passport");
const expressSession = require("express-session");
const layouts = require("express-ejs-layouts");
const User = require("./models/user");

//Controllers
const usersController = require("./controllers/usersController");
const homeController = require("./controllers/homeController");
const tasksController = require("./controllers/tasksController");

//Constants
const port = 3000;

//Configuration
const app = express();
const router = express.Router();
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

//Router

router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

router.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

router.use(connectFlash());
router.use(passport.initialize());
router.use(passport.session());

router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
