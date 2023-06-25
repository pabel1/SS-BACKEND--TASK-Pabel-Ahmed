const catchAsyncError = require("../Middleware/catchAsyncError");
const UserModel = require("../Model/userModel");
const { createUser, login } = require("../Services/userServices");
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

// login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Errorhandeler("Please fill the value properly", 400));
  }

  let login = await login(req);

  if (login.status === false) {
    return next(new Errorhandeler(user?.error, 400));
  }
  res.status(200).json({
    success: true,
    user: login?.user,
    access_token: login?.user,
    message: "Login Successfully!!",
  });
});

// logout
exports.logoutController = (req, res) => {
  res.clearCookie("jwt-token", { httpOnly: true });
  res.status(200).json({
    Message: "Successfully logged out",
    Auhtorization: false,
  });
};

//
// get login user details
exports.loggedInUser = catchAsyncError(async (req, res, next) => {
  const id = req.userId;
  const user = await UserModel.findById(id);
  if (!user) {
    return next(new Errorhandeler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});
