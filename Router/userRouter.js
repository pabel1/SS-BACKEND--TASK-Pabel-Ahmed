const express = require("express");
const {
  SignUpUser,
  loginUser,
  logoutController,
  loggedInUser,
} = require("../Controllers/userController");
const authVerification = require("../Middleware/authVarification");
const router = express.Router();

// sign up user
router.route("/signup").post(SignUpUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authVerification, logoutController);
router.route("/login-user-details").post(authVerification, loggedInUser);
module.exports = router;
