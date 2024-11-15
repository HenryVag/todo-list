const mongoose = require("mongoose"),
  { Schema } = mongoose,
  userSchema = new Schema(
    {
      userName: {
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

module.exports = mongoose.model("User", userSchema);
