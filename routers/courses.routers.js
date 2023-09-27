const express = require("express");
const coursesControllers = require("../controllers/courses.controllers");
const { validationCourse } = require("../middleware/validationSchema");

const router = express.Router();

router
  .route("/")
  .get(coursesControllers.getAllCourses)
  .post(validationCourse(), coursesControllers.addCourse);

router
  .route("/:courseId")
  .get(coursesControllers.getCourse)
  .patch(coursesControllers.updateCourse)
  .delete(coursesControllers.deleteCourse);

module.exports = router;
