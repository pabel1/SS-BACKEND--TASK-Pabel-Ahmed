const posterupload = require("../Utility/fileUploader");
const upload = posterupload.single("movieposter");

const fileUpload = async (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        errors: ["Attachment must be less than 200kb"],
      });
    } else {
      next();
    }
  });
};

module.exports = fileUpload;
