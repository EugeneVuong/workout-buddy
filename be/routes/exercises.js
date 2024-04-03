const express = require("express");
const router = express.Router();
const exercisesController = require("../controllers/exercisesController");

router
  .get("/", exercisesController.getAllExercises)
  .get("/:id", exercisesController.getExercise)
  .post("/", exercisesController.createExercise);

module.exports = router;
