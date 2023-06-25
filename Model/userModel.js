const mongoose = require("mongoose");
const validator = require("validator");
const userModel = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
    },
    role: {
      type: String,
      required: true,
      enum: ["User", "Admin"],
    },

    __v: false,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userModel);

module.exports = UserModel;
