"use strict";

const User = require("../models/user");
const passport = require("passport");

module.exports = {
  index: (req, res, next) => {
    User.find()
      .then((users) => {
        res.locals.users = users;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },

  indexView: (req, res) => {
    res.render("users/index");
  },
  new: (req, res) => {
    res.render("users/new");
  },

  create: (req, res, next) => {
    if (req.skip) next();
    console.log(req.body);
    let userParams = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    let newUser = new User(userParams);

    User.register(newUser, req.body.password, (error, user) => {
      console.log(newUser);
      if (user) {
        req.flash("success", `${user.username}'s account created succesfully!`);
        console.log(`succesfully created user ${user.username} `);
        res.locals.redirect = "/";
        next();
      } else {
        req.flash(
          "error",
          `Failed to create user account because ${error.message}`
        );
        console.log(`Failed to create user ${error.message}`);
        res.locals.redirect = "/users";
        next();
      }
    });
  },
  login: (req, res) => {
    res.render("users/login");
  },
  authenticate: passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: "Failed to login",
    successRedirect: "/users",
    successFlash: "Logged in!",
  }),
  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });
    req.flash("success", "You have been logged out!");
    res.locals.redirect = "/";
    next();
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
};
