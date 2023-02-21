const { diskStorage } = require("multer");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    (acceptedFile = ["jpg", "jpeg", "png"]),
      cb(
        null,
        path.join(__dirname, "../Public")
      );
  },

  filename: (req, file, cb) => {
    cb(
      null,
      "PIMG" +
        "-" +
        Date.now() +
        Math.round(Math.random() * 100000) +
        "." +
        file.mimetype.split("/")[1]
    );
  },

  fileFilter: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];

    if (acceptedFile.includes(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
    return multer({
      storage: diskStorage,
      limits: { fileSize: 1024 * 1024 },
      fileFilter,
    });
  },
});

exports.multerUpload = multer({ storage });
