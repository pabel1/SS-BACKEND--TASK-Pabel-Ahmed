const express = require("express");
const { SignUpUser, loginUser } = require("../Controllers/userController");
const router = express.Router();

// sign up user
router.route("/signup").post(SignUpUser);
router.route("/login").post(loginUser);
module.exports = router;
