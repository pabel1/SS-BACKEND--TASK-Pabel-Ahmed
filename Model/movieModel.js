const mongoose = require("mongoose");
const validator = require("validator");
const movieModel = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    actor: {
      type: String,
      required: true,
      trim: true,
    },
    actress: {
      type: String,
      required: true,
      trim: true,
    },
    director: {
      type: String,
      required: true,
      trim: true,
    },
    producer: {
      type: String,
      required: true,
      trim: true,
    },
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
    poster: {
      type: String,
    },
  },
  { timestamps: true }
);

const MovieModel = mongoose.model("Movie", movieModel);

module.exports = MovieModel;
