const express = require("express");
const {
  createMovie,
  getAllMovies,
  getSingleMovie,
  getUpdateMovie,
} = require("../Controllers/movieController");
const authVerification = require("../Middleware/authVarification");
const { authorizeRoles } = require("../Middleware/roleMiddleware");

const router = express.Router();

router.route("/create-movie").post(authVerification, createMovie);

router.route("/get-all-movie").get(getAllMovies);
router.route("/get-single-movie/:id").get(getSingleMovie);

router.route("/update-movie/:id").patch(authVerification, getUpdateMovie);

module.exports = router;
