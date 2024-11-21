"use strict";

const Task = require("../models/task");
const User = require("../models/user");

module.exports = {
  index: (req, res, next) => {
    Task.find({})
      .then((tasks) => {
        res.locals.tasks = tasks;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching tasks: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("tasks/index");
  },
  new: (req, res) => {
    res.render("tasks/new");
  },

  create: (req, res, next) => {
    let taskParams = {
      title: req.body.title,
      description: req.body.description,
    };

    Task.create(taskParams)
      .then((task) => {
        res.locals.task = task;
        res.locals.redirect = "/tasks";

        User.findByIdAndUpdate(
          req.user._id,
          { $push: { tasks: task._id } },
          { new: true, useFindAndModify: false }
        ).then(() => {
          req.flash("success", `Succesfully saved task: ${taskParams.title}`);
          console.log(`Succesfully saved task: ${taskParams.title}`);
          next();
        });
      })
      .catch((error) => {
        console.log(`Error saving task: ${error.message}`);
        next(error);
      });
  },

  show: (req, res, next) => {
    let taskId = req.params.id;
    Task.findById(taskId)
      .then((task) => {
        res.locals.task = task;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching task by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("tasks/show");
  },

  edit: (req, res, next) => {
    let taskId = req.params.id;
    Task.findById(taskId)
      .then((task) => {
        res.render("tasks/edit", {
          task: task,
        });
      })
      .catch((error) => {
        console.log(`Error fetching task by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let taskId = req.params.id,
      taskParams = {
        title: req.body.title,
        description: req.body.description,
      };

    Task.findByIdAndUpdate(taskId, {
      $set: taskParams,
    })
      .then((task) => {
        res.locals.redirect = `/tasks/${taskId}`;
        res.locals.task = task;
        next();
      })
      .catch((error) => {
        console.log(`Error updating task by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let taskId = req.params.id;

    Task.findByIdAndDelete(taskId)
      .then(() => {
        res.locals.redirect = "/tasks";
        return User.findByIdAndUpdate(
          req.user._id,
          { $pull: { tasks: taskId } },
          { new: true, useFindAndModify: false }
        );
      })
      .then(() => {
        next();
      })

      .catch((error) => {
        console.log(`Error deleting task by ID: ${error.message}`);
        next();
      });
  },
  usertasks: (req, res, next) => {
    User.findById(req.user._id)
      .populate("tasks")
      .then((user) => {
        res.locals.tasks = user.tasks;
        console.log(req.user._id);
        next();
      })
      .catch((error) => {
        console.log(`Error retrieving tasks: ${error.message}`);
        next(error);
      });
  },
  usertaskView: (req, res) => {
    res.render("tasks/usertasks");
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },
};
