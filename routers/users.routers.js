const express = require("express");
const usersControllers = require("../controllers/users.controllers");
const verifyToken = require("../middleware/verifyToken");
const allowedTo = require("../middleware/allowedTo");
const userRoles = require("../utils/userRoles");
const multer = require("multer");
const appError = require("../utils/appError");

const router = express.Router();

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const exd = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + exd);
  },
});

const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType === "image") {
    cb(null, true);
  } else {
    cb(appError.create("file must be an image", 400), false);
  }
};
const upload = multer({
  storage: diskStorage,
  fileFilter,
});

router.get(
  "/",
  verifyToken,
  allowedTo(userRoles.ADMIN, userRoles.MANGER),
  usersControllers.getAllUsers
);

router.post("/register", upload.single("avatar"), usersControllers.register);

router.post("/login", usersControllers.login);

module.exports = router;
