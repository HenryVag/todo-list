const mongoose = require("mongoose"),
  { Schema } = mongoose,
  userSchema = new Schema(
    {
      name: {
        first: { type: String, trim: true },
        last: { type: String, trim: true },
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
      username: {
        type: String,
        lowercase: true,
        unique: true,
      },
    },
    {
      timestamps: true,
    }
  );

userSchema.pre("save", function (next) {
  if (this.isNew) {
    const firstnameChar = this.name.first.charAt(0).toLowerCase();
    const lastnameChar = this.name.last.slice(0, 6).toLowerCase();

    this.username = `${firstnameChar}${lastnameChar}`;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
