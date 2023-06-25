const { default: mongoose } = require("mongoose");
const MovieModel = require("../Model/movieModel");
const Errorhandeler = require("../Utility/ErrorHandler");

exports.createMovie = async (req) => {
  try {
    const { title, crewRef, type, releaseDate, duration, detail } = req.body;
    const posterUpload = `./uploads/${req.file.filename}`;
    const newMovie = new MovieModel({
      title,
      crewRef,
      type,
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
    let joinQuery = {
      $lookup: {
        from: "crews",
        localField: "_id",
        foreignField: "crewMember",
        as: "crewDetails",
      },
    };
    let sort = { $sort: { createdAt: -1 } };
    let pipeline = [sort, joinQuery];
    let TotalPipeline = [joinQuery, { $count: "count" }];

    if (req.query.page || req.query.limit) {
      pipeline.push({ $skip: skipRow }, { $limit: perpage });
    }
    if (req.query.type) {
      pipeline.unshift({ $match: { type: req.query.type } });
      TotalPipeline.unshift({ $match: { type: req.query.type } });
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
    const id = new mongoose.Types.ObjectId(req.params.id);
    let joinQuery = {
      $lookup: {
        from: "crews",
        localField: "_id",
        foreignField: "crewMember",
        as: "crewDetails",
      },
    };
    let match = { $match: { _id: id } };
    let pipeline = [match, joinQuery];
    let single = await model.aggregate(pipeline);

    return { status: true, single };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};
