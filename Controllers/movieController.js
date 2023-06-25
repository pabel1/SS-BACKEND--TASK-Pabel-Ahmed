const catchAsyncError = require("../Middleware/catchAsyncError");
const { createMovie } = require("../Services/movieServices");
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

//
