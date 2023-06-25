const express = require("express");
const { createMovie } = require("../Controllers/movieController");
const authVerification = require("../Middleware/authVarification");
const { authorizeRoles } = require("../Middleware/roleMiddleware");

const router = express.Router();

router
  .route("/create-movie")
  .post(authVerification, authorizeRoles("Admin"), createMovie);

module.exports = router;
