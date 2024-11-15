const passportLocalMongoose = require("passport-local-mongoose");

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
      },

      password: {
        type: String,
        required: true,
      },
      tasks: [],
    },
    {
      timestamps: true,
    }
  );

userSchema.pre("save", function (next) {
  if (this.isNew) {
    console.log("new user created");
  }
  next();
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
