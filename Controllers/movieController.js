const catchAsyncError = require("../Middleware/catchAsyncError");
const MovieModel = require("../Model/movieModel");
const { createMovie, getMovie } = require("../Services/movieServices");
const Errorhandeler = require("../Utility/ErrorHandler");

// create movie
exports.createMovie = catchAsyncError(async (req, res, next) => {
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

  if (
    !title ||
    !actor ||
    !actress ||
    !director ||
    !producer ||
    !releaseDate ||
    !duration ||
    !detail
  ) {
    return next(new Errorhandeler("Please fill the value properly", 400));
  }

  if (!req.file) {
    return next(new Errorhandeler("Please fill the value properly", 400));
  }

  let movie = await createMovie(req);
  if (movie.status === false) {
    return next(new Errorhandeler(movie?.error, 400));
  }

  res.status(201).json({
    success: true,
    movie: movie?.movie,
    message: "Movie  Create Successfully!!",
  });
});

// get all movie
exports.getAllMovies = catchAsyncError(async (req, res, next) => {
  let movie = await getMovie(req, MovieModel);

  if (movie.status === false) {
    return next(new Errorhandeler(movie?.error, 400));
  }

  res.status(201).json({
    success: true,
    movie: movie?.movie,
    total: movie?.total,
    message: "Get all Movie Successfully!!",
  });
});

//
// get single  movie
exports.getSingleMovie = catchAsyncError(async (req, res, next) => {
  let movie = await getMovie(req, MovieModel);

  if (movie?.status === false) {
    return next(new Errorhandeler(movie?.error, 400));
  }

  if (movie?.status === true && !movie?.single) {
    return next(new Errorhandeler("Not Found!!!", 404));
  }
  res.status(201).json({
    success: true,
    movie: movie?.single,

    message: "Get Single Movie Successfully!!",
  });
});
