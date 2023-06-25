const MovieModel = require("../Model/movieModel");

exports.createMovie = async (req) => {
  try {
    const {
      title,
      actor,
      actress,
      director,
      producer,
      releaseDate,
      duration,
      detail,
    } = req.body;
    const posterUpload = `./uploads/${req.file.filename}`;
    const newMovie = new MovieModel({
      title,
      actor,
      actress,
      director,
      producer,
      releaseDate,
      duration,
      detail,
      poster: posterUpload,
    });
    let movie = await newMovie.save();

    return { status: true, movie };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};
