"use strict";
//Use session and cookies to respond with name if
//session has not expired and if user is logged in???

exports.homePage = (req, res) => {
  let paramsName = req.params.name;
  res.render("homepage", { name: paramsName });
};
