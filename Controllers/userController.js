const catchAsyncError = require("../Middleware/catchAsyncError");
const UserModel = require("../Model/userModel");
const { createUser } = require("../Services/userServices");
const Errorhandeler = require("../Utility/ErrorHandler");
const bcrypt = require("bcrypt");
// create user
exports.SignUpUser = catchAsyncError(async (req, res, next) => {
  try {
    const {
      fullname,
      email,
      password,

      role,
    } = req.body;

    if (!email || !password || !fullname) {
      return next(new Errorhandeler("Please fill the value properly", 400));
    }

    let user = await createUser(req);

    if (user.status === false) {
      return next(new Errorhandeler(user?.error, 400));
    }

    res.status(201).json({
      success: true,
      userData: user.userData,
      message: "User Create Successfully!!",
    });
  } catch (error) {
    res.status(500).json({
      succss: false,
      message: error.toString(),
    });
  }
});
