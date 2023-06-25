const mongoose = require("mongoose");
const validator = require("validator");
const CrewModel = require("./crewModel");
const movieModel = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    crewRef: [
      {
        crewMember: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
      },
    ],
    releaseDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: true,
      set: (value) => {
        const hours = Math.floor(value / 60);
        const minutes = value % 60;

        return `${hours}h ${minutes}m`;
      },
    },
    detail: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["movie", "tv_show"],
      required: true,
    },
    poster: {
      type: String,
    },
  },
  { timestamps: true }
);

const MovieModel = mongoose.model("Movie", movieModel);

module.exports = MovieModel;
