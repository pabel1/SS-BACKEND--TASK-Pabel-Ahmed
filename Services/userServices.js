const UserModel = require("../Model/userModel");
const Errorhandeler = require("../Utility/ErrorHandler");
const bcrypt = require("bcrypt");
const jwtHandle = require("../Utility/createToken");
exports.createUser = async (req, user, newPass) => {
  try {
    const { fullname, email, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return next(new Errorhandeler("User already axist!", 404));
    }
    const newUser = new UserModel({
      fullname,
      email,
      password: hashPassword,
      role,
    });
    let userData = await newUser.save();
    let token;
    if (userData) {
      token = await jwtHandle(userData?.email, userData?._id);
    }

    //   set cookie
    if (token) {
      res.cookie("jwt-token", token, {
        expires: new Date(Date.now() + 48 * 3600000),
        httpOnly: true,
      });
    }

    return { status: true, userData };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};
