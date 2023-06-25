const mongoose = require("mongoose");

const crewModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    biography: {
      type: String,
      required: false,
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    nationality: {
      type: String,
      required: false,
    },
    movieShowID: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const CrewModel = mongoose.model("crew", crewModel);

module.exports = CrewModel;
