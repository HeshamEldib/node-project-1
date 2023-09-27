require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const coursesRouters = require("./routers/courses.routers");
const usersRouters = require("./routers/users.routers");
const httpStatusText = require("./utils/httpStatusText");

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connecting data");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use("/api/courses", coursesRouters);
app.use("/api/users", usersRouters);

app.all("*", (req, res, next) => {
  return res
    .status(404)
    .json({
      status: httpStatusText.ERROR,
      message: "this resource is not fount",
    });
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 200).json({status: error.statusText, message: error.message, code: error.statusCode || 500, data: null})
});


app.listen(process.env.PORT, () => {
  console.log("localhost:3001");
});
