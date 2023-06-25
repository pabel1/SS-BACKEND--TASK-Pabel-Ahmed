const MovieModel = require("../Model/movieModel");
const Errorhandeler = require("../Utility/ErrorHandler");

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

// get all movie
exports.getMovie = async (req, model) => {
  try {
    let pageno = Number(req.query.page) || 1;
    let perpage = Number(req.query.limit) || 10;
    let skipRow = (pageno - 1) * perpage;
    let sort = { $sort: { createdAt: -1 } };
    let pipeline = [sort];
    let TotalPipeline = [{ $count: "count" }];

    if (req.query.page || req.query.limit) {
      pipeline.push({ $skip: skipRow }, { $limit: perpage });
    }

    let movie = await model.aggregate(pipeline);
    let total = await model.aggregate(TotalPipeline);
    return { status: true, movie, total };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};
// get all movie
exports.SingleMovie = async (req, model) => {
  try {
    let single = await model.findById(req.params.id);

    return { status: true, single };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};
