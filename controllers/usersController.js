"use strict";

const User = require("../models/user");

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
    let userParams = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    };
    let newUser = new User(userParams);

    User.register(newUser, req.body.password, (error, user) => {
      if (user) {
        /*
        req.flash(
          "success",
          `${user.first} ${user.last}'s account created succesfully!`
        );*/
        console.log(`succesfully created user ${user.userName} `);
        res.locals.redirect = "/";
        next();
      } else {
        /*
        req.flash(
          "error",
          `Failed to create user account because ${error.message}`
        );*/
        console.log("Failed to create user");
        res.locals.redirect = "/users";
        next();
      }
    });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
};
