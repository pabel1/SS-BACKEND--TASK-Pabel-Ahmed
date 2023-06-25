const express = require("express");
const { SignUpUser } = require("../Controllers/userController");
const router = express.Router();

// sign up user
router.route("/signup").post(SignUpUser);
module.exports = router;
